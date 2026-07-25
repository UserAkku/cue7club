import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import BookingFlow from "./BookingFlow";
import { getTranslations } from "next-intl/server";

export default async function BookServicePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const resolvedParams = await params;
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user?.id) {
    redirect(`/${resolvedParams.locale}/login?callbackUrl=/${resolvedParams.locale}/book/${resolvedParams.slug}`);
  }

  // Fetch the service details
  const service = await prisma.service.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      packages: true,
      category: true,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 pt-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Book {service.name}
        </h1>
        <p className="text-muted-foreground text-lg">
          Complete a few simple steps to confirm your booking.
        </p>
      </div>

      <BookingFlow 
        serviceId={service.id} 
        serviceName={service.name} 
        packages={service.packages.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          duration: p.duration,
          description: p.description
        }))} 
        basePrice={service.basePrice}
      />
    </div>
  );
}
