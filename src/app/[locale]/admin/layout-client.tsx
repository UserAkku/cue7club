"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { SignOut, ChartBar, Users, ShieldCheck, GridFour, CalendarCheck } from "@phosphor-icons/react";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations("Admin");
  const tDash = useTranslations("Dashboard");

  const navItems = [
    { href: "/admin", label: t("analytics"), icon: ChartBar },
    { href: "/admin/professionals", label: t("professionals"), icon: ShieldCheck },
    { href: "/admin/bookings", label: t("allBookings"), icon: CalendarCheck },
    { href: "/admin/users", label: t("customers"), icon: Users },
    { href: "/admin/services", label: t("services"), icon: GridFour },
  ];

  return (
    <div className="flex min-h-[100dvh] bg-background">
      <aside className="w-64 flex-col border-r border-white/5 bg-card/50 flex shrink-0">
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger font-heading font-bold text-white">
              A
            </div>
            <span className="font-heading text-lg font-bold tracking-tight">{t("adminConsole")}</span>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-white/10 text-foreground" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <Icon size={20} weight={isActive ? "fill" : "regular"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-danger hover:bg-danger/10 transition-colors"
          >
            <SignOut size={20} />
            {tDash("signOut")}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-background px-8">
          <span className="font-heading text-lg font-bold">{t("dashboardOverview")}</span>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">{t("adminMode")}</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
