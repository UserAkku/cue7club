"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Toolbox, CurrencyInr, Star } from "@phosphor-icons/react";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import type { Session } from "next-auth";

export default function DashboardClient({ session }: { session: Session }) {
  const stats = [
    { label: "Jobs Today", value: "3", icon: Toolbox, color: "text-primary", bg: "bg-primary/5" },
    { label: "Earnings (Today)", value: "₹4,500", icon: CurrencyInr, color: "text-success", bg: "bg-success/5" },
    { label: "Overall Rating", value: "4.9", icon: Star, color: "text-warning", bg: "bg-warning/5" },
  ];

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-2">
          Hello, {session?.user?.name || session?.user?.email?.split("@")[0] || "Professional"}
        </h1>
        <p className="text-muted-foreground text-lg">Here's your summary for today.</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-3 mb-16">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="flex items-center p-6 border-black/5 bg-white hover:bg-secondary/20 transition-colors shadow-sm rounded-3xl">
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Today's Jobs</h2>
          <Link href="/pro/jobs" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">View All Jobs →</Link>
        </div>
        
        <div className="space-y-4">
          <Card className="p-6 border-black/5 bg-white hover:bg-secondary/20 shadow-sm transition-colors flex flex-col md:flex-row justify-between md:items-center gap-6 rounded-3xl">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Upcoming</span>
                <span className="text-sm font-medium text-muted-foreground">02:00 PM</span>
              </div>
              <h3 className="font-heading font-semibold text-xl tracking-tight mb-1">Full Home Deep Cleaning</h3>
              <p className="text-sm text-muted-foreground">123 Green Park, Block B, New Delhi</p>
            </div>
            <Link href="/pro/jobs/1">
              <Button size="lg" className="w-full md:w-auto font-medium rounded-2xl px-8 shadow-sm hover:shadow-md transition-all">Start Job</Button>
            </Link>
          </Card>
          
          <Card className="p-6 border-black/5 bg-secondary/30 flex flex-col md:flex-row justify-between md:items-center gap-6 rounded-3xl opacity-75 grayscale-[30%]">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-success/10 text-success border border-success/20 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Completed</span>
                <span className="text-sm font-medium text-muted-foreground">10:00 AM</span>
              </div>
              <h3 className="font-heading font-semibold text-xl tracking-tight mb-1">Sofa Cleaning</h3>
              <p className="text-sm text-muted-foreground">45 Lajpat Nagar, New Delhi</p>
            </div>
            <div className="text-right">
              <div className="font-semibold text-success text-xl">+₹1,499</div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
