import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "hi"],
  defaultLocale: "en",
  localePrefix: "always", // Force /en prefix to prevent NextAuth middleware conflicts
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
