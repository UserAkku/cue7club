import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Link } from "@/i18n/routing";
import { CheckCircle, ShieldCheck, MapPin, Clock } from "lucide-react"; // Using lucide for server components
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getTranslations("Services");
  const resolvedParams = await params;
  const service = await prisma.service.findUnique({
    where: { slug: resolvedParams.slug },
    include: { category: true }
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/5 bg-secondary/30 pt-28 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop')] opacity-[0.04] mix-blend-multiply object-cover" />
        
        <div className="container relative mx-auto max-w-[1200px] px-4 sm:px-6 z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase text-primary ring-1 ring-primary/20 backdrop-blur-sm">
                Premium {service.category.name} Service
              </div>
              <h1 className="font-heading text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl mb-6 text-foreground">
                {service.name}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-6 mt-10 text-sm font-medium text-foreground/80">
                <div className="flex items-center gap-2"><Clock className="text-primary" size={20} /> Takes ~{service.duration} mins</div>
                <div className="flex items-center gap-2"><ShieldCheck className="text-primary" size={20} /> 30-Day Guarantee</div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 bg-white shadow-lg p-6 rounded-3xl border border-black/5 animate-in fade-in slide-in-from-right-4 duration-700 delay-200 fill-mode-both">
              <div className="text-right">
                <div className="text-4xl font-extrabold tracking-tight text-foreground">₹{service.basePrice}</div>
                <div className="text-sm font-medium text-muted-foreground mt-1">{t("startingPrice")}</div>
              </div>
              <Link href={`/book/${service.slug}`}>
                <Button size="lg" className="h-16 px-10 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="container mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          
          <div className="lg:col-span-2 space-y-20">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="font-heading text-3xl font-bold tracking-tight mb-10">{t("whatsIncluded")}</h2>
              <ul className="grid gap-6 sm:grid-cols-2">
                {[
                  "Complete deep cleaning of all rooms",
                  "Floor scrubbing and polishing",
                  "Bathroom descaling and sanitization",
                  "Kitchen degreasing (including chimney exterior)",
                  "Dusting of all fixtures and fans",
                  "Mirror and glass cleaning"
                ].map((item, i) => (
                  <li 
                    key={i} 
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm border border-black/5 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
                    style={{ animationDelay: `\${i * 100}ms` }}
                  >
                    <div className="mt-0.5 shrink-0 bg-primary/10 text-primary p-1 rounded-full">
                      <CheckCircle size={18} />
                    </div>
                    <span className="text-foreground/90 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="font-heading text-3xl font-bold tracking-tight mb-10">{t("servicePackages")}</h2>
              <div className="grid gap-8 sm:grid-cols-2">
                <Card className="p-8 border-black/5 bg-white shadow-sm hover:shadow-md transition-all rounded-3xl">
                  <h3 className="font-bold text-2xl tracking-tight">{t("standardPkg")}</h3>
                  <div className="my-6 text-4xl font-extrabold tracking-tight">₹{service.basePrice}</div>
                  <p className="text-base text-muted-foreground mb-8 min-h-[48px]">{t("standardDesc")}</p>
                  <Button variant="outline" className="w-full h-14 font-semibold rounded-2xl border-black/10 hover:bg-secondary">{t("select")}</Button>
                </Card>
                <Card className="p-8 border-primary/20 bg-primary/5 ring-1 ring-primary relative overflow-hidden rounded-3xl shadow-lg">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl tracking-wider uppercase">{t("popularBadge")}</div>
                  <h3 className="font-bold text-2xl tracking-tight">{t("premiumPkg")}</h3>
                  <div className="my-6 text-4xl font-extrabold tracking-tight">₹{service.basePrice + 2000}</div>
                  <p className="text-base text-muted-foreground mb-8 min-h-[48px]">{t("premiumDesc")}</p>
                  <Button className="w-full h-14 font-semibold rounded-2xl shadow-md">{t("select")}</Button>
                </Card>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-28 animate-in fade-in slide-in-from-right-4 duration-700 delay-200 fill-mode-both">
              <Card className="p-8 border-black/5 rounded-3xl shadow-xl bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
                <h3 className="font-heading text-xl font-bold tracking-tight mb-6 relative z-10">{t("whyChooseUs")}</h3>
                <ul className="space-y-6 relative z-10">
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ShieldCheck size={14} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">{t("backgroundVerified")}</h5>
                      <p className="text-sm text-muted-foreground mt-1">{t("strictBackground")}</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">{t("transparentPricing")}</h5>
                      <p className="text-sm text-muted-foreground mt-1">{t("noHiddenFees")}</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">{t("realTimeTracking")}</h5>
                      <p className="text-sm text-muted-foreground mt-1">{t("trackLive")}</p>
                    </div>
                  </li>
                </ul>
                
                <hr className="my-8 border-black/5" />
                
                <Link href={`/book/${service.slug}`} className="block relative z-10">
                  <Button className="w-full h-14 font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all group">
                    Continue to Booking <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </Link>
              </Card>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
