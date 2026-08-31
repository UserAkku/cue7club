import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import EarningsClient from "./EarningsClient";

export default async function EarningsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const session = await auth();

  if (!session?.user?.id || !["ADMIN", "PROFESSIONAL"].includes((session.user as any).role)) {
    redirect(`/${resolvedParams.locale}/login`);
  }

  const professional = await prisma.professional.findUnique({
    where: { userId: session.user.id },
  });

  if (!professional) {
    redirect(`/${resolvedParams.locale}/pro/onboarding`);
  }

  // Get completed jobs for this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const monthJobs = await prisma.booking.findMany({
    where: {
      professionalId: professional.id,
      status: "COMPLETED",
      scheduledAt: { gte: startOfMonth },
    },
    include: {
      service: true,
    },
    orderBy: { scheduledAt: 'desc' }
  });

  const earningsMonth = monthJobs.reduce((acc, job) => acc + (job.workerAmount || 0), 0);
  
  // Fake available balance (in reality, you'd calculate this based on payouts minus total earnings)
  const availableBalance = earningsMonth * 0.8;

  return <EarningsClient earningsMonth={earningsMonth} availableBalance={availableBalance} recentJobs={monthJobs.slice(0, 5)} />;
}
