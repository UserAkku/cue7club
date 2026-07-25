import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Link } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function ServicesPage() {
  const t = await getTranslations("Navigation");
  
  // Fetch services from Database
  const services = await prisma.service.findMany({
    include: { category: true },
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <div className="container mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Premium Services
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse our catalog of verified, top-tier professional services.
        </p>
      </div>

      {/* Basic Filter Bar (UI only) */}
      <div className="mb-8 flex flex-wrap gap-4 border-b border-black/5 pb-4">
        {["All", "Cleaning", "Garden", "Pool", "Health"].map((cat) => (
          <button key={cat} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <Link key={service.id} href={`/services/${service.slug}`}>
            <Card hoverable className="h-full overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] w-full bg-secondary">
                {/* Image placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              </div>
              <CardContent className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    {service.category.name}
                  </div>
                  <h3 className="font-heading text-xl font-semibold leading-tight">
                    {service.name}
                  </h3>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <span className="text-warning">★ 4.9</span>
                    <span className="mx-2">•</span>
                    <span>124 reviews</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="font-medium text-foreground">
                    From ₹{service.basePrice}
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
