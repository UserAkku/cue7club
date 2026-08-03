import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/brevo";
import OtpEmail from "../../../../../emails/OtpEmail";
import * as React from "react";

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email: string };

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Save to DB (UPSERT)
    await prisma.otpToken.upsert({
      where: { email },
      update: { token: otp, expiresAt },
      create: { email, token: otp, expiresAt },
    });

    // Send email via Brevo
    if (process.env.BREVO_API_KEY) {
      const template = React.createElement(OtpEmail, { otp });
      const success = await sendEmail(email, "Your Login Code - MadClap", template);

      if (!success) {
        console.error("Failed to send OTP via Brevo");
      }
    } else {
      // Development fallback
      console.log(`[DEV MODE] OTP for ${email} is ${otp}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
