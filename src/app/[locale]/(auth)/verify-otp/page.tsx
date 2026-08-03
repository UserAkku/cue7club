"use client";

import { useState, Suspense } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";

function VerifyOtpContent() {
  const t = useTranslations("Auth");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const locale = useLocale();
  const email = searchParams.get("email");
  const role = searchParams.get("role");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || otp.length !== 6) return;

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        otp,
        intendedRole: role || "CUSTOMER",
      });

      if (res?.error) {
        alert("Invalid or expired OTP. Please try again.");
      } else {
        // Redirect on success based on role
        if (role === "PROFESSIONAL") {
          window.location.href = `/${locale}/pro/dashboard`;
        } else {
          window.location.href = `/${locale}/dashboard`;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="text-center">
        <p>Invalid request.</p>
        <Link href={`/${locale}/login`}>
          <Button className="mt-4">{t("goBackToLogin") || "Go back to Login"}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-background px-4">
      <Link href={`/${locale}/login`} className="absolute left-8 top-8 flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">{t("backToLogin") || "Back to login"}</span>
      </Link>

      <div className="w-full max-w-sm">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Check your email
        </h1>
        <p className="mt-2 text-muted-foreground">
          We've sent a 6-digit code to <br />
          <span className="font-medium text-foreground">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm font-medium text-foreground">
              Verification Code
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              className="flex h-14 w-full rounded-lg border border-border bg-input/50 px-4 text-center text-2xl font-semibold tracking-[0.5em] text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              placeholder="••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full h-12" disabled={loading || otp.length !== 6}>
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Didn't receive the code?{" "}
          <button className="font-medium text-primary hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  const t = useTranslations("Auth");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
