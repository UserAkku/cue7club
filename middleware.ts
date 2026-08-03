import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  console.log("MIDDLEWARE HIT:", pathname);

  // Geolocation based default routing for root path
  if (pathname === "/") {
    const country = req.headers.get("x-vercel-ip-country");
    if (country === "VN") {
      return NextResponse.redirect(new URL("/vi", req.nextUrl));
    }
  }

  // Get locale prefix from the path
  const localeMatch = pathname.match(/^\/(en|vi)/);
  
  // If no locale is found and it's not an excluded path (like API), force redirect to /en
  if (!localeMatch && pathname !== "/") {
    return NextResponse.redirect(new URL(`/en${pathname}${req.nextUrl.search}`, req.nextUrl));
  }

  const locale = localeMatch ? localeMatch[1] : "en";

  // Strip locale prefix for route matching (/en/dashboard -> /dashboard)
  const pathnameWithoutLocale = pathname.replace(/^\/(en|vi)/, "") || "/";

  const isAuth = !!req.auth;
  const isAuthPage = /^\/(login|register|pro\/register|customer\/register|verify-otp)/.test(pathnameWithoutLocale);
  const isCustomerRoute = /^\/(dashboard|bookings|profile)/.test(pathnameWithoutLocale);
  const isProRoute = pathnameWithoutLocale.startsWith("/pro") && !isAuthPage;
  const isAdminRoute = pathnameWithoutLocale.startsWith("/admin");

  if (!isAuth && (isCustomerRoute || isProRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.nextUrl));
  }

  const role = (req.auth?.user as any)?.role || "CUSTOMER";

  // Strict RBAC
  if (isAuth) {
    if (isAdminRoute && role !== "ADMIN") {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.nextUrl));
    }
    if (isProRoute && role !== "PROFESSIONAL" && role !== "ADMIN") {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.nextUrl));
    }

    if (isAuthPage) {
      if (role === "ADMIN") return NextResponse.redirect(new URL(`/${locale}/admin`, req.nextUrl));
      if (role === "PROFESSIONAL") return NextResponse.redirect(new URL(`/${locale}/pro/dashboard`, req.nextUrl));
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.nextUrl));
    }
  }

  // Handle i18n routing
  return handleI18nRouting(req as unknown as NextRequest);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
