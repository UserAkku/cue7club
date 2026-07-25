import { auth } from "@/lib/auth";
import DashboardClient from "./DashboardClient";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function DashboardOverview({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/${resolvedParams.locale}/login`);
  }

  // Fetch user bookings
  const bookings = await prisma.booking.findMany({
    where: { customerId: session.user.id },
    include: {
      service: true,
      professional: { include: { user: true } }
    },
    orderBy: { scheduledAt: 'asc' }
  });

  // Calculate stats
  const activeBookings = bookings.filter(b => !["COMPLETED", "CANCELLED", "REFUNDED"].includes(b.status));
  const totalSpent = bookings
    .filter(b => b.status === "COMPLETED")
    .reduce((sum, b) => sum + b.totalAmount + b.platformFee, 0);

  const stats = {
    activeCount: activeBookings.length,
    totalSpent,
    loyaltyPoints: Math.floor(totalSpent * 0.1), // 1 point per ₹10 spent
  };

  return <DashboardClient session={session} stats={stats} upcomingBookings={activeBookings} />;
}
