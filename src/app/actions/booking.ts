"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createBooking(data: {
  serviceId: string;
  packageId: string | null;
  scheduledAt: string;
  totalAmount: number;
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Generate a simple unique booking number
    const bookingNumber = `C7-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    // Create address
    const address = await prisma.address.create({
      data: {
        userId: session.user.id,
        label: "Home",
        line1: data.address.line1,
        city: data.address.city,
        state: data.address.state,
        pincode: data.address.pincode,
      },
    });

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerId: session.user.id,
        serviceId: data.serviceId,
        packageId: data.packageId,
        addressId: address.id,
        status: "PENDING",
        scheduledAt: new Date(data.scheduledAt),
        totalAmount: data.totalAmount,
        platformFee: 250, // Flat fee for now
      },
    });

    // Create an initial timeline entry
    await prisma.bookingTimeline.create({
      data: {
        bookingId: booking.id,
        status: "PENDING",
        note: "Booking created successfully",
      }
    });

    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: "Failed to create booking" };
  }
}
