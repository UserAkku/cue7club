import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import JobDetailClient from "./JobDetailClient";

export default async function JobDetailPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const resolvedParams = await params;
  const session = await auth();

  if (!session?.user?.id || !["ADMIN", "PROFESSIONAL"].includes((session.user as any).role)) {
    redirect(`/${resolvedParams.locale}/login`);
  }

  const job = await prisma.booking.findUnique({
    where: { id: resolvedParams.id },
    include: {
      customer: true,
      address: true,
      service: true,
    }
  });

  if (!job) {
    return <div>Job not found</div>;
  }

  return <JobDetailClient job={job} />;
}
