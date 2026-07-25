import Link from "next/link";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react/dist/ssr";
import { getLocale } from "next-intl/server";

export async function Footer() {
  const locale = await getLocale();

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
              Premium services for your home and lifestyle. Clean, fast, and
              reliable professionals.
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
            <h4 className="mb-4 font-heading font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={`/${locale}/services/cleaning`} className="hover:text-foreground transition-colors">
                  Home Cleaning
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/garden`} className="hover:text-foreground transition-colors">
                  Garden Maintenance
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/pool`} className="hover:text-foreground transition-colors">
                  Pool Cleaning
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/health`} className="hover:text-foreground transition-colors">
                  Health &amp; Wellness
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/careers`} className="hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/pro/register`} className="hover:text-foreground transition-colors">
                  Become a Professional
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-foreground transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Cue7Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

