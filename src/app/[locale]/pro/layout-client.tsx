"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignOut, SquaresFour, CalendarPlus, CurrencyInr, UserCircle, Toolbox, CaretLeft, CaretRight, ArrowLeft } from "@phosphor-icons/react";
import { signOut } from "next-auth/react";
import { ProMobileBottomNav } from "@/components/layout/ProMobileBottomNav";

export default function ProfessionalLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("ProDashboard");
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { href: "/pro/dashboard", label: t("overview"), icon: SquaresFour },
    { href: "/pro/jobs", label: t("myJobs"), icon: Toolbox },
    { href: "/pro/schedule", label: t("schedule"), icon: CalendarPlus },
    { href: "/pro/earnings", label: t("earnings"), icon: CurrencyInr },
    { href: "/pro/profile", label: t("proProfile"), icon: UserCircle },
  ];

  return (
    <div className="flex min-h-[100dvh] bg-background">
      {/* Sidebar */}
      <aside className={`hidden flex-col border-r border-black/5 bg-card/50 md:flex transition-all duration-300 ease-in-out \${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-black/5">
          <Link href="/" className={`flex items-center gap-2 overflow-hidden \${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary font-heading font-bold text-primary-foreground">
              MC
            </div>
            {!isCollapsed && <span className="font-heading text-lg font-bold tracking-tight whitespace-nowrap">{t("proPartner") || "Pro Partner"}</span>}
          </Link>
        </div>
        
        <nav className="flex-1 space-y-2 p-4 overflow-hidden">
          {navItems.map((item) => {
            // Check if pathname starts with item.href for sub-pages, or exactly matches
            const isActive = pathname === item.href || (item.href !== '/pro/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-xl py-3 text-sm font-medium transition-colors \${
                  isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'
                } \${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={24} weight={isActive ? "fill" : "regular"} className="shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5 flex flex-col gap-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex items-center rounded-xl py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/40 hover:text-foreground transition-colors \${
              isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'
            }`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <CaretRight size={20} /> : <><CaretLeft size={20} /> <span className="whitespace-nowrap">Collapse</span></>}
          </button>
          
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className={`flex items-center rounded-xl py-3 text-sm font-medium text-danger hover:bg-danger/10 transition-colors \${
              isCollapsed ? 'justify-center px-0' : 'gap-3 px-4 w-full'
            }`}
            title={isCollapsed ? "Sign Out" : undefined}
          >
            <SignOut size={24} className="shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">{t("signOut")}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/5 bg-background px-4 sm:px-6 md:hidden">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full hover:bg-secondary/40 transition-colors text-muted-foreground"
            >
              <ArrowLeft size={20} />
            </button>
            <span className="font-heading text-lg font-bold">{t("proDashboard") || "Pro Dashboard"}</span>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="mx-auto max-w-5xl">
            {/* Back Button (Desktop) */}
            <div className="mb-6 hidden md:block">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 -ml-3 rounded-full hover:bg-secondary/40"
              >
                <ArrowLeft size={16} /> Back
              </button>
            </div>
            
            {children}
          </div>
        </div>
      </main>

      <ProMobileBottomNav />
    </div>
  );
}
