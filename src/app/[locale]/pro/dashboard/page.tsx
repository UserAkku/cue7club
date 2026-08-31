import { auth } from "@/lib/auth";
import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";

export default async function ProDashboard({ params }: { params: Promise<{ locale: string }> }) {
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

  // Get jobs for today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const todaysJobs = await prisma.booking.findMany({
    where: {
      professionalId: professional.id,
      scheduledAt: { gte: todayStart, lte: todayEnd },
    },
    include: {
      service: true,
      address: true,
    },
    orderBy: { scheduledAt: 'asc' }
  });

  const completedJobsCount = todaysJobs.filter(j => j.status === 'COMPLETED').length;
  const earningsToday = todaysJobs
    .filter(j => j.status === 'COMPLETED')
    .reduce((acc, job) => acc + (job.workerAmount || 0), 0);

  const upcomingJobs = todaysJobs.filter(j => !['COMPLETED', 'CANCELLED', 'REFUNDED'].includes(j.status));
  const completedJobs = todaysJobs.filter(j => j.status === 'COMPLETED');

  return (
    <DashboardClient 
      session={session} 
      stats={{
        jobsToday: todaysJobs.length,
        earningsToday,
        rating: professional.rating
      }}
      upcomingJobs={upcomingJobs}
      completedJobs={completedJobs}
    />
  );
}
