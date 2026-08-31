"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { geocodePincode } from "@/lib/nominatim";

export async function createBooking(data: {
  serviceId: string;
  packageId: string | null;
  professionalId: string;
  scheduledAt: string;
  totalAmount: number;
  workerAmount: number;
  distanceKm: number;
  transportFee: number;
  platformFee: number;
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
    lat?: number;
    lng?: number;
  };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Generate a simple unique booking number
    const bookingNumber = `MC-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    // Geocode if missing
    let lat = data.address.lat;
    let lng = data.address.lng;
    if (!lat || !lng) {
      const geo = await geocodePincode(data.address.pincode);
      if (geo) {
        lat = geo.lat;
        lng = geo.lng;
      }
    }

    // Create address
    const address = await prisma.address.create({
      data: {
        userId: session.user.id,
        label: "Home",
        line1: data.address.line1,
        city: data.address.city,
        state: data.address.state,
        pincode: data.address.pincode,
        lat,
        lng
      },
    });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerId: session.user.id,
        professionalId: data.professionalId,
        serviceId: data.serviceId,
        packageId: data.packageId,
        addressId: address.id,
        status: "CONFIRMED", // Start as CONFIRMED since worker is auto-assigned
        scheduledAt: new Date(data.scheduledAt),
        totalAmount: data.totalAmount,
        platformFee: data.platformFee,
        workerAmount: data.workerAmount,
        distanceKm: data.distanceKm,
        transportFee: data.transportFee,
        otp,
      },
    });

    // Create an initial timeline entry
    await prisma.bookingTimeline.create({
      data: {
        bookingId: booking.id,
        status: "CONFIRMED",
        note: "Booking confirmed and professional assigned",
      }
    });

    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

export async function cancelBooking(bookingId: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) return { success: false, error: "Not found" };
    
    // Admin check for cancellation window
    const settings = await prisma.platformSettings.findUnique({ where: { id: "singleton" } });
    const windowHours = settings?.cancellationWindowHrs || 24;
    
    const diffHours = (booking.scheduledAt.getTime() - new Date().getTime()) / (1000 * 60 * 60);
    if (diffHours < windowHours && session.user.role !== "ADMIN") {
      return { success: false, error: `Can only cancel up to ${windowHours} hours before scheduled time` };
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: { 
        status: "CANCELLED",
        cancelledAt: new Date(),
        cancelReason: "Cancelled by user"
      }
    });

    await prisma.bookingTimeline.create({
      data: {
        bookingId,
        status: "CANCELLED",
        note: "Booking cancelled by customer",
      }
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to cancel" };
  }
}

export async function addReview(bookingId: string, professionalId: string, rating: number, comment: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const review = await prisma.review.create({
      data: {
        bookingId,
        customerId: session.user.id,
        professionalId,
        rating,
        comment,
      }
    });

    // Update professional's rating
    const pro = await prisma.professional.findUnique({
      where: { id: professionalId },
      select: { rating: true, totalReviews: true }
    });

    if (pro) {
      const newTotal = pro.totalReviews + 1;
      const newRating = ((pro.rating * pro.totalReviews) + rating) / newTotal;
      await prisma.professional.update({
        where: { id: professionalId },
        data: { rating: newRating, totalReviews: newTotal }
      });
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to add review" };
  }
}
