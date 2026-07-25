import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const otpRecord = await prisma.otpToken.findUnique({
      where: { email },
    });

    if (!otpRecord) {
      return NextResponse.json({ error: "No OTP found for this email" }, { status: 404 });
    }

    if (otpRecord.expiresAt < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    if (otpRecord.token !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // OTP is valid. Ensure user exists.
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email, role: "CUSTOMER", name: email.split("@")[0] }, // default to customer on auto-signup
      });
    }

    // Delete used OTP
    await prisma.otpToken.delete({ where: { email } });

    // Note: Actual login session establishment is done via NextAuth Credentials provider.
    // This endpoint validates the OTP directly if needed, but NextAuth authorize() also handles it.
    // Actually, it's better to let NextAuth's `signIn("credentials", { email, otp })` hit the authorize block directly.
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
