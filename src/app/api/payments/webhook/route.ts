import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData, serviceId } = await req.json();

    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret')
      .update(text.toString())
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // 1. If it's a new address, save it first
      let finalAddressId = bookingData.addressId;
      if (bookingData.addressId === "new" && bookingData.addressDetails) {
        // Need a real Address schema setup, but for now we'll mock creating it
        // Or if Prisma schema has Address model:
        // const addr = await prisma.address.create({ ... })
        // finalAddressId = addr.id;
        finalAddressId = "mock_address_id"; 
      }

      // 2. Create the booking in DB
      /*
      await prisma.booking.create({
        data: {
          userId: session.user.id,
          serviceId: serviceId,
          packageId: bookingData.packageId,
          date: bookingData.date,
          timeSlot: bookingData.timeSlot,
          addressId: finalAddressId,
          status: "CONFIRMED",
          paymentId: razorpay_payment_id
        }
      });
      */

      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
