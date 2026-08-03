import Link from "next/link";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react/dist/ssr";
import { getLocale, getTranslations } from "next-intl/server";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-none bg-primary font-heading font-bold text-primary-foreground text-sm">
                C7
              </div>
              <span className="font-heading text-lg font-bold tracking-tight">
                Cue7Club
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("description")}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <TwitterLogo size={24} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramLogo size={24} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <FacebookLogo size={24} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-heading font-semibold">{t("services")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={`/${locale}/services/cleaning`} className="hover:text-foreground transition-colors">
                  {t("homeCleaning")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/garden`} className="hover:text-foreground transition-colors">
                  {t("gardenMaintenance")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/pool`} className="hover:text-foreground transition-colors">
                  {t("poolCleaning")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/health`} className="hover:text-foreground transition-colors">
                  {t("healthWellness")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading font-semibold">{t("company")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-foreground transition-colors">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/careers`} className="hover:text-foreground transition-colors">
                  {t("careers")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/pro/register`} className="hover:text-foreground transition-colors">
                  {t("becomePro")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-foreground transition-colors">
                  {t("contactSupport")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading font-semibold">{t("legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-foreground transition-colors">
                  {t("termsOfService")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-foreground transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}

