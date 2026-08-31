import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import ScheduleClient from "./ScheduleClient";

export default async function SchedulePage({ params }: { params: Promise<{ locale: string }> }) {
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
      status: { notIn: ["CANCELLED", "REFUNDED"] }
    },
    include: {
      service: true,
      address: true,
    },
    orderBy: { scheduledAt: 'asc' }
  });

  const scheduleItems = todaysJobs.map(job => {
    const time = new Date(job.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return {
      time,
      task: `${job.service?.name} - ${job.address?.city}`,
      status: job.status === "COMPLETED" ? "completed" : "booked"
    };
  });

  return <ScheduleClient scheduleItems={scheduleItems} professionalStatus={professional.onboardingStatus} />;
}
