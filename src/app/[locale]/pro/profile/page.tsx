import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const session = await auth();

  if (!session?.user?.id || !["ADMIN", "PROFESSIONAL"].includes((session.user as any).role)) {
    redirect(`/${resolvedParams.locale}/login`);
  }

  const professional = await prisma.professional.findUnique({
    where: { userId: session.user.id },
    include: {
      user: true,
      serviceAreas: true,
      offeredServices: true,
    }
  });

  if (!professional) {
    redirect(`/${resolvedParams.locale}/pro/onboarding`);
  }

  return <ProfileClient professional={professional} />;
}
