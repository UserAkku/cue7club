import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect(`/${resolvedParams.locale}/login`);
  }

  const [totalBookings, activePros, pendingPros, revenueData] = await Promise.all([
    prisma.booking.count(),
    prisma.professional.count({ where: { onboardingStatus: "ACTIVE" } }),
    prisma.professional.findMany({
      where: { onboardingStatus: "PENDING_APPROVAL" },
      include: { user: true },
      take: 5
    }),
    prisma.booking.aggregate({
      where: { status: "COMPLETED" },
      _sum: { totalAmount: true }
    })
  ]);

  const statsData = {
    totalRevenue: revenueData._sum.totalAmount || 0,
    totalBookings,
    activePros,
  };

  return <AdminDashboardClient statsData={statsData} recentApprovals={pendingPros} />;
}
