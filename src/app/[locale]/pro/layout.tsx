import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfessionalLayout from "./layout-client";

export default async function ProRouteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const session = await auth();

  // Enforce authentication
  if (!session?.user?.id) {
    redirect(`/${resolvedParams.locale}/login?callbackUrl=/${resolvedParams.locale}/pro/dashboard`);
  }

  // Enforce role
  if ((session.user as any).role !== "PROFESSIONAL" && (session.user as any).role !== "ADMIN") {
    redirect(`/${resolvedParams.locale}/dashboard`); // Redirect to customer dashboard
  }

  return <ProfessionalLayout>{children}</ProfessionalLayout>;
}
