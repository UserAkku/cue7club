"use client";

import { Card } from "@/components/ui/Card";
import { Sparkle, CurrencyInr, Star } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { Session } from "next-auth";

export default function DashboardClient({ 
  session, 
  stats, 
  upcomingBookings 
}: { 
  session: Session | null;
  stats: { activeCount: number; totalSpent: number; loyaltyPoints: number };
  upcomingBookings: any[];
}) {
  const displayStats = [
    { label: "Active Bookings", value: stats.activeCount.toString(), icon: Sparkle, color: "text-primary", bg: "bg-primary/5" },
    { label: "Total Spent", value: `₹${stats.totalSpent.toLocaleString()}`, icon: CurrencyInr, color: "text-success", bg: "bg-success/5" },
    { label: "Loyalty Points", value: stats.loyaltyPoints.toString(), icon: Star, color: "text-warning", bg: "bg-warning/5" },
  ];

  return (
    <div className="pb-12 max-w-6xl mx-auto">
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-2">
          Welcome back, {session?.user?.name || session?.user?.email?.split("@")[0] || "Guest"}
        </h1>
        <p className="text-muted-foreground text-lg">Here's what's happening with your home services.</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-3 mb-12">
        {displayStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="flex items-center p-6 border-black/5 bg-white shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bg} ${stat.color}`}>
                  <Icon size={24} weight="duotone" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                  <h3 className="font-heading text-3xl font-semibold tracking-tight">{stat.value}</h3>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">Upcoming Services</h2>
            <Link href="/bookings" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">View All →</Link>
          </div>
          
          <div className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.slice(0, 2).map((booking) => (
                <Card key={booking.id} className="p-7 border-black/5 bg-white shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-6 rounded-3xl">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-primary/5 text-primary border border-primary/20 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">{booking.status}</span>
                      <span className="text-sm font-medium text-muted-foreground">{new Date(booking.scheduledAt).toLocaleString()}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-xl tracking-tight mb-2">{booking.service.name}</h3>
                    {booking.professional && (
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-secondary border border-black/5 flex items-center justify-center text-xs text-foreground font-medium">
                          {booking.professional.user.name.charAt(0)}
                        </span> 
                        Professional: {booking.professional.user.name}
                      </p>
                    )}
                  </div>
                  <Link href={`/bookings/${booking.id}`}>
                    <Button size="lg" className="w-full sm:w-auto font-medium rounded-full shadow-sm">View Details</Button>
                  </Link>
                </Card>
              ))
            ) : (
              <Card className="p-10 border-black/5 bg-white shadow-sm flex flex-col items-center justify-center rounded-3xl text-center">
                <div className="h-16 w-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
                  <Sparkle className="text-muted-foreground" size={32} />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">No upcoming services</h3>
                <p className="text-muted-foreground text-sm max-w-[250px] mb-6">You don't have any active bookings right now.</p>
                <Link href="/services">
                  <Button variant="outline" className="rounded-full">Browse Services</Button>
                </Link>
              </Card>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="font-heading text-2xl font-semibold tracking-tight mb-6">Quick Book</h2>
          <div className="grid gap-4 sm:grid-cols-2 h-[calc(100%-3rem)]">
            {[
              { title: "Sofa Cleaning", slug: "sofa-cleaning" },
              { title: "Garden Setup", slug: "garden-setup" }
            ].map((service) => (
              <motion.div
                key={service.slug}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Link href={`/services/${service.slug}`} className="block h-full min-h-[140px]">
                  <Card className="p-6 border-black/5 bg-white shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex flex-col justify-between h-full rounded-3xl group">
                    <h4 className="font-medium text-lg tracking-tight group-hover:text-primary transition-colors">{service.title}</h4>
                    <span className="text-sm font-medium text-primary mt-4 flex items-center gap-2 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      Book Again <span className="text-lg leading-none">→</span>
                    </span>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
