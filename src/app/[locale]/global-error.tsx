"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  const t = useTranslations("Common");
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
          <h2 className="font-heading text-4xl font-bold tracking-tight mb-4">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground mb-8">
            An unexpected error occurred. We've been notified.
          </p>
          <Button onClick={() => reset()}>{t("retry") || "Try again"}</Button>
        </div>
      </body>
    </html>
  );
}
