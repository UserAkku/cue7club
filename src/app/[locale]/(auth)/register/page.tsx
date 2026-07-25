"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useLocale } from "next-intl";
import { User, IdentificationCard } from "@phosphor-icons/react";
import { Card } from "@/components/ui/Card";

export default function RegisterRoleSelection() {
  const [role, setRole] = useState<"CUSTOMER" | "PROFESSIONAL" | null>(null);
  const router = useRouter();
  const locale = useLocale();

  const handleContinue = () => {
    if (role === "CUSTOMER") {
      router.push(`/${locale}/customer/register`);
    } else if (role === "PROFESSIONAL") {
      router.push(`/${locale}/pro/register`);
    }
  };

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-background px-4">
      <Link href={`/${locale}`} className="absolute left-8 top-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-none bg-primary font-heading font-bold text-primary-foreground text-sm">
          C7
        </div>
      </Link>

      <div className="w-full max-w-xl text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          How do you want to use Cue7Club?
        </h1>
        <p className="mt-4 text-muted-foreground">
          Choose your account type to get started.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {/* Customer Option */}
          <button
            onClick={() => setRole("CUSTOMER")}
            className="text-left"
          >
            <Card className={`relative flex flex-col items-center justify-center p-8 transition-all rounded-3xl ${
              role === "CUSTOMER" 
                ? "border-primary bg-primary/5 ring-1 ring-primary" 
                : "hover:border-foreground/20"
            }`}>
              <User size={48} weight={role === "CUSTOMER" ? "duotone" : "regular"} className="mb-4 text-primary" />
              <h3 className="font-heading text-xl font-semibold">I need a service</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                Book cleaning, gardening, and wellness professionals.
              </p>
            </Card>
          </button>

          {/* Professional Option */}
          <button
            onClick={() => setRole("PROFESSIONAL")}
            className="text-left"
          >
            <Card className={`relative flex flex-col items-center justify-center p-8 transition-all rounded-3xl ${
              role === "PROFESSIONAL" 
                ? "border-primary bg-primary/5 ring-1 ring-primary" 
                : "hover:border-foreground/20"
            }`}>
              <IdentificationCard size={48} weight={role === "PROFESSIONAL" ? "duotone" : "regular"} className="mb-4 text-primary" />
              <h3 className="font-heading text-xl font-semibold">I'm a professional</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                List your services and get booked by customers.
              </p>
            </Card>
          </button>
        </div>

        <div className="mt-12">
          <Button
            size="lg"
            className="w-full max-w-xs"
            disabled={!role}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href={`/${locale}/login`} className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
