import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import AdminProsClient from "./AdminProsClient";

export default async function ProfessionalsAdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect(`/${resolvedParams.locale}/login`);
  }

  const pros = await prisma.professional.findMany({
    include: {
      user: true,
      serviceAreas: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return <AdminProsClient pros={pros} />;
}
