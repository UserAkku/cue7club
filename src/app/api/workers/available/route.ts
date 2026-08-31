import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateBookingPrice, getPlatformSettings } from "@/lib/pricing";
import { haversineDistanceKm, geocodePincode } from "@/lib/nominatim";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const serviceId = searchParams.get("serviceId");
    const latStr = searchParams.get("lat");
    const lngStr = searchParams.get("lng");
    const scheduledAtStr = searchParams.get("scheduledAt");

    if (!serviceId || !latStr || !lngStr || !scheduledAtStr) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const customerLat = parseFloat(latStr);
    const customerLng = parseFloat(lngStr);
    const scheduledAt = new Date(scheduledAtStr);
    
    // Get the service details for base price
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const settings = await getPlatformSettings();

    // Find active pros who offer this service
    const availablePros = await prisma.professional.findMany({
      where: {
        onboardingStatus: "ACTIVE",
        offeredServices: {
          some: { serviceId }
        }
      },
      include: {
        user: true,
        serviceAreas: true,
        jobs: {
          where: {
            scheduledAt: {
              // rough check to avoid double booking in same time window (e.g., +/- 2 hours)
              gte: new Date(scheduledAt.getTime() - 2 * 60 * 60 * 1000),
              lte: new Date(scheduledAt.getTime() + 2 * 60 * 60 * 1000)
            },
            status: { notIn: ["CANCELLED", "REFUNDED", "COMPLETED"] }
          }
        }
      }
    });

    const results = [];

    for (const pro of availablePros) {
      // If already booked, skip
      if (pro.jobs.length > 0) continue;

      let proLat = pro.lastLat;
      let proLng = pro.lastLng;

      // Fallback to geocoding their primary service area pincode if no live location
      if (!proLat || !proLng) {
        if (pro.serviceAreas.length > 0) {
          const geo = await geocodePincode(pro.serviceAreas[0].pincode);
          if (geo) {
            proLat = geo.lat;
            proLng = geo.lng;
          }
        }
      }

      // If still no location, default distance to 5km
      let distanceKm = 5;
      if (proLat && proLng) {
        distanceKm = haversineDistanceKm(customerLat, customerLng, proLat, proLng);
      }

      const pricing = calculateBookingPrice({
        basePrice: service.basePrice,
        distanceKm,
        settings
      });

      results.push({
        worker: {
          id: pro.id,
          name: pro.user.name,
          image: pro.user.image,
          rating: pro.rating,
          totalReviews: pro.totalReviews,
          bio: pro.bio
        },
        distanceKm: Math.round(distanceKm * 10) / 10, // 1 decimal place
        pricing
      });
    }

    // Sort by nearest
    results.sort((a, b) => a.distanceKm - b.distanceKm);

    return NextResponse.json({ workers: results });
  } catch (error) {
    console.error("Error fetching workers:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
