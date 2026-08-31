import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import CustomerBookingClient from "./CustomerBookingClient";

export default async function BookingDetailPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const resolvedParams = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/${resolvedParams.locale}/login`);
  }

  const booking = await prisma.booking.findUnique({
    where: { id: resolvedParams.id, customerId: session.user.id },
    include: {
      service: true,
      address: true,
      professional: { include: { user: true } },
      review: true,
    }
  });

  if (!booking) {
    return <div className="p-8 text-center">Booking not found.</div>;
  }

  return <CustomerBookingClient booking={booking} />;
}
