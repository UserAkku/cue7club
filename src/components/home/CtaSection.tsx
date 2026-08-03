"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function CtaSection() {
  const t = useTranslations("Index.CtaSection");
  return (
    <section className="w-full bg-background px-4 py-24 sm:px-6 md:py-32">
      <div className="container mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-secondary p-12 md:p-24 text-center border border-border"
        >
          {/* Soft, minimal CTA block */}
          
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:leading-[1.1]">
              {t("heading")}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              {t("subheading")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/en/services">
                <Button size="lg" className="h-14 w-full px-8 sm:w-auto text-base">
                  {t("bookBtn")}
                </Button>
              </Link>
              <Link href="/en/pro/register">
                <Button size="lg" variant="outline" className="h-14 w-full px-8 sm:w-auto text-base bg-transparent hover:bg-background">
                  {t("proBtn")}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
