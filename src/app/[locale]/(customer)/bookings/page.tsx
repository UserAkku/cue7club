import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { Calendar, Clock, MapPin } from "lucide-react";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function BookingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("Dashboard");
  const resolvedParams = await params;
  const session = await auth();
  if (!session?.user?.id) redirect(`/${resolvedParams.locale}/login`);

  const bookings = await prisma.booking.findMany({
    where: { customerId: session.user.id },
    include: {
      service: true,
      professional: { include: { user: true } },
    },
    orderBy: { scheduledAt: 'desc' }
  });

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-2">{t("myBookings")}</h1>
        <p className="text-muted-foreground text-lg">{t("manageBookings")}</p>
      </div>

      <div className="space-y-6">
        {bookings.length > 0 ? bookings.map((booking, i) => (
          <div
            key={booking.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
            style={{ animationDelay: `\${i * 100}ms` }}
          >
            <Card className="p-8 border-black/5 bg-white hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-6 shadow-sm rounded-3xl">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Badge 
                    variant={booking.status === "COMPLETED" ? "outline" : "default"}
                    className={`uppercase tracking-wider text-xs px-3 py-1 ${
                      booking.status === "EN_ROUTE" ? "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20" : ""
                    }`}
                  >
                    {booking.status}
                  </Badge>
                  <span className="font-semibold text-lg tracking-tight">₹{booking.totalAmount + booking.platformFee}</span>
                </div>
                
                <h3 className="font-heading text-2xl font-bold tracking-tight mb-4">{booking.service.name}</h3>
                
                <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary/70" /> 
                    <span className="font-medium">{booking.scheduledAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-primary/70" /> 
                    <span className="font-medium">
                      {booking.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {booking.professional && (
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-primary/70" /> 
                      <span className="font-medium">Pro: {booking.professional.user.name}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col justify-end gap-3 md:w-56 mt-4 md:mt-0">
                {booking.status === "EN_ROUTE" && (
                  <Link href={`/bookings/${booking.id}`}>
                    <Button className="w-full font-semibold rounded-2xl h-12 shadow-sm">{t("trackArrival")}</Button>
                  </Link>
                )}
                {booking.status === "COMPLETED" && (
                  <Button variant="outline" className="w-full font-medium rounded-2xl h-12 border-black/10 hover:bg-secondary">{t("rateService")}</Button>
                )}
                <Link href={`/bookings/${booking.id}`}>
                  <Button variant="ghost" className="w-full font-medium rounded-2xl h-12 hover:bg-secondary">{t("viewDetails")}</Button>
                </Link>
              </div>
            </Card>
          </div>
        )) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-black/5">
            <h3 className="font-heading text-2xl font-bold mb-2">{t("noBookingsFound") || "No bookings found"}</h3>
            <p className="text-muted-foreground mb-6">{t("noBookingsYet")}</p>
            <Link href="/services">
              <Button size="lg" className="rounded-full px-8">{t("browseServices") || "Browse Services"}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
