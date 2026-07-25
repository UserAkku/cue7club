"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("Index");

  return (
    <section className="relative min-h-[100dvh] w-full bg-background flex items-center">
      <div className="container mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-12 px-4 py-24 md:grid-cols-2 sm:px-6 lg:gap-24 lg:py-32">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start space-y-8"
        >
          <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl lg:leading-[1.1] max-w-[16ch]">
            {t("title")}
          </h1>
          
          <p className="max-w-[32ch] text-lg text-foreground/80 md:text-xl leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/services">
              <Button size="lg" variant="primary" className="h-14 px-8 text-base rounded-full font-medium tracking-wide">
                {t("bookNow")}
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full font-medium tracking-wide">
                {t("exploreServices")}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right: Image / Visual Asset */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          className="relative aspect-square w-full md:aspect-[4/5] lg:aspect-square"
        >
          <div className="absolute inset-0 overflow-hidden bg-secondary">
            {/* Will be replaced by generated image */}
            <img 
              src="/hero_home_service.jpg" 
              alt="Premium Home Services" 
              className="object-cover w-full h-full grayscale opacity-90"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
