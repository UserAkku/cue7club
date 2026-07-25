"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "hi" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLocale}
      className="rounded-full font-medium"
    >
      {locale === "en" ? "हिं" : "EN"}
    </Button>
  );
}
