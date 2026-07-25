import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await req.json();

    const options = {
      amount: amount, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_\${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json(order);
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
