import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";
import { Badge } from "@/components/ui/Badge";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch fresh user data from DB
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      role: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="pb-12 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-heading text-4xl font-bold tracking-tight">My Profile</h1>
            <Badge variant="outline" className="text-xs px-3 py-1 uppercase tracking-wider text-primary border-primary/20 bg-primary/5">
              {user.role}
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">Manage your personal information and preferences.</p>
        </div>
      </div>

      <ProfileForm user={{ ...user, name: user.name || "" }} />
    </div>
  );
}
