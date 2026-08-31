"use client";

import { Card } from "@/components/ui/Card";
import { TrendUp, Users, CalendarCheck, CurrencyInr } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const RevenueChart = dynamic(() => import("@/components/admin/RevenueChart"), { ssr: false });

export default function AdminDashboardClient({ statsData, recentApprovals }: { statsData: any, recentApprovals: any[] }) {
  const t = useTranslations("Admin");

  const stats = [
    { label: t("totalRevenue") || "Total Revenue", value: `₹${statsData.totalRevenue.toLocaleString()}`, trend: "+12.5%", icon: CurrencyInr },
    { label: t("totalBookings") || "Total Bookings", value: statsData.totalBookings.toString(), trend: "+8.2%", icon: CalendarCheck },
    { label: t("activePros") || "Active Professionals", value: statsData.activePros.toString(), trend: "+2.4%", icon: Users },
    { label: t("conversionRate") || "Conversion Rate", value: "8.4%", trend: "+1.1%", icon: TrendUp },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight">{t("platformAnalytics") || "Platform Analytics"}</h1>
        <p className="text-muted-foreground mt-2">{t("keyMetrics") || "Key metrics and performance indicators"}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="p-6 border-white/5 relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Icon size={16} />
                </div>
              </div>
              <div className="flex items-end gap-4">
                <h3 className="font-heading text-3xl font-bold">{stat.value}</h3>
                <span className="text-sm font-medium text-success mb-1">{stat.trend}</span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6 border-white/5 h-full">
            <h2 className="font-heading text-lg font-semibold mb-6">{t("revenueOverTime") || "Revenue Over Time"}</h2>
            <div className="h-[300px] w-full">
              <RevenueChart />
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 border-white/5 h-full">
            <h2 className="font-heading text-lg font-semibold mb-6">{t("recentApprovals") || "Pending Approvals"}</h2>
            
            <div className="space-y-4">
              {recentApprovals.length === 0 ? (
                <p className="text-muted-foreground text-sm">No pending approvals.</p>
              ) : (
                recentApprovals.map((pro, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5">
                    <div>
                      <h4 className="font-medium text-sm">{pro.user.name}</h4>
                      <p className="text-xs text-muted-foreground">{pro.user.email}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-warning/20 text-warning">
                      PENDING
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
