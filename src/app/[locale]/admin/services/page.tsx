import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { getTranslations } from "next-intl/server";

export default async function AdminServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect(`/${resolvedParams.locale}/login`);
  }

  const t = await getTranslations("Admin");
  
  const categories = await prisma.category.findMany({
    include: {
      services: true
    }
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Services & Categories</h1>
          <p className="text-muted-foreground mt-2">Manage what services are offered on MadClap.</p>
        </div>
      </div>

      <div className="space-y-8">
        {categories.map(category => (
          <Card key={category.id} className="p-6 border-white/5 bg-white/5">
            <h2 className="font-heading text-xl font-bold mb-4">{category.name}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {category.services.map(service => (
                <div key={service.id} className="p-4 rounded-xl border border-white/10 bg-background flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">{service.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                  </div>
                  <div className="mt-4 font-bold text-primary">₹{service.basePrice}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
