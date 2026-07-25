import { auth } from "@/lib/auth";
import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";

export default async function ProDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const session = await auth();

  if (!session?.user?.id || !["ADMIN", "PROFESSIONAL"].includes((session.user as any).role)) {
    redirect(`/${resolvedParams.locale}/login`);
  }

  return <DashboardClient session={session} />;
}
