import Link from "next/link";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "@/components/ui/Button";
import { List } from "@phosphor-icons/react/dist/ssr";
import { getTranslations, getLocale } from "next-intl/server";
import { auth } from "@/lib/auth";

export async function Navbar() {
  const t = await getTranslations("Navigation");
  const locale = await getLocale();
  const session = await auth();
  
  const role = session ? (session.user as any).role : null;
  const dashboardLink = role === "PROFESSIONAL" 
    ? `/${locale}/pro/dashboard` 
    : role === "ADMIN" 
      ? `/${locale}/admin` 
      : `/${locale}/dashboard`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-none bg-primary font-heading font-bold text-primary-foreground text-sm">
            C7
          </div>
          <span className="font-heading text-lg font-bold tracking-tight">
            Cue7Club
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href={`/${locale}/services`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("services")}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("about")}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          
          {session ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href={dashboardLink}>
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link href={`/${locale}/profile`}>
                <Button variant="ghost" size="sm" className="font-medium hover:bg-secondary">
                  Profile
                </Button>
              </Link>
            </div>
          ) : (
            <Link href={`/${locale}/login`} className="hidden md:block">
              <Button variant="primary" size="sm">
                {t("login")}
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="flex h-10 w-10 items-center justify-center rounded-none border border-border md:hidden">
            <List size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

