"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SquaresFour, Toolbox, CalendarPlus, CurrencyInr } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export function ProMobileBottomNav() {
  const pathname = usePathname();
  const locale = useLocale();

  const links = [
    { href: `/${locale}/pro/dashboard`, label: "Overview", icon: SquaresFour },
    { href: `/${locale}/pro/jobs`, label: "Jobs", icon: Toolbox },
    { href: `/${locale}/pro/schedule`, label: "Schedule", icon: CalendarPlus },
    { href: `/${locale}/pro/earnings`, label: "Earnings", icon: CurrencyInr },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background/90 backdrop-blur-md md:hidden">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon size={24} weight={isActive ? "fill" : "regular"} />
            <span className="text-[10px] font-medium">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
