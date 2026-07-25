import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In a real app, you need to parse the x-www-form-urlencoded body that Pusher sends
    // next/server req.formData() can be used
    const formData = await req.formData();
    const socketId = formData.get("socket_id") as string;
    const channel = formData.get("channel_name") as string;

    if (!socketId || !channel) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Authorize channel based on user role and booking access
    // For now, allow all authenticated users
    const presenceData = {
      user_id: session.user?.id || "anonymous",
      user_info: {
        role: (session.user as any).role,
      },
    };

    const authResponse = pusherServer.authorizeChannel(socketId, channel, presenceData);
    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("Pusher auth error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
