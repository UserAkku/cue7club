import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "your-super-secret-key-min-32-chars" });
  
  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.match(/\/login|\/register|\/verify-otp/);
  
  // Custom auth logic for protected routes (e.g., /dashboard, /pro, /admin)
  const isCustomerRoute = req.nextUrl.pathname.match(/\/(dashboard|bookings|profile)/);
  const isProRoute = req.nextUrl.pathname.startsWith("/pro");
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (!isAuth && (isCustomerRoute || isProRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const role = (token?.role as string) || "CUSTOMER";

  // Strict RBAC
  if (isAuth) {
    if (isAdminRoute && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    if (isProRoute && role !== "PROFESSIONAL" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  if (isAuth && isAuthPage) {
    if (role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.nextUrl));
    if (role === "PROFESSIONAL") return NextResponse.redirect(new URL("/pro/dashboard", req.nextUrl));
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Handle i18n routing
  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
