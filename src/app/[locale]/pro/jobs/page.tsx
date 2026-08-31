import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import JobsClient from "./JobsClient";

export default async function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
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

  const jobs = await prisma.booking.findMany({
    where: { professionalId: professional.id },
    include: {
      service: true,
      address: true,
    },
    orderBy: { scheduledAt: 'desc' }
  });

  return <JobsClient jobs={jobs} />;
}
