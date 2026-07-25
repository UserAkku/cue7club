import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    // Only professionals should be able to send location updates
    if (!session?.user || (session.user as any).role !== "PROFESSIONAL") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookingId, lat, lng } = await req.json();

    if (!bookingId || lat === undefined || lng === undefined) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Trigger location update on the booking's private channel
    const channelName = `private-tracking-\${bookingId}`;
    await pusherServer.trigger(channelName, "location-update", {
      lat,
      lng,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Location update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
