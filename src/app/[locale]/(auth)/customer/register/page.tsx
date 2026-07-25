"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GoogleLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomerRegisterPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        // Redirect to OTP verification page
        router.push(`/${locale}/verify-otp?email=${encodeURIComponent(email)}&role=CUSTOMER`);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] w-full bg-background">
      {/* Left Panel: Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-12 lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <Link href={`/${locale}`} className="mb-12 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-none bg-primary font-heading font-bold text-primary-foreground text-sm">
              C7
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              Cue7Club
            </span>
          </Link>

          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Create an account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enter your email to book premium home services.
          </p>

          <form onSubmit={handleSendOtp} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <EnvelopeSimple size={20} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending Code..." : "Continue with Email"}
            </Button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-border" />
            <div className="mx-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Or
            </div>
            <div className="flex-1 border-t border-border" />
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: `/${locale}/dashboard` })}
          >
            <GoogleLogo size={20} className="mr-2" />
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href={`/${locale}/login`} className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel: Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-secondary">
        <div className="absolute inset-0 bg-background/10 z-10" />
        <img 
          src="/login_hero.jpg" 
          alt="Premium Architecture" 
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-90"
        />
      </div>
    </div>
  );
}
