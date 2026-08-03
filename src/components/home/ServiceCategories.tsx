"use client";

import { motion } from "motion/react";
import { Sparkle, Drop, Plant, Heartbeat } from "@phosphor-icons/react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CATEGORIES = [
  {
    id: "cleaning",
    icon: Sparkle,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
  },
  {
    id: "pool",
    icon: Drop,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    id: "garden",
    icon: Plant,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    id: "health",
    icon: Heartbeat,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  },
];

export function ServiceCategories() {
  const t = useTranslations("Index.ServiceCategories");

  return (
    <section className="relative w-full bg-background py-24 md:py-32">
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            {t("heading")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 lg:gap-6">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${cat.colSpan} ${cat.rowSpan}`}
              >
                <Link href={`/en/services/${cat.id}`} className="block h-full">
                  <Card hoverable className="group flex h-full min-h-[240px] flex-col justify-between p-8 overflow-hidden relative">
                    <div className="absolute -right-12 -top-12 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:opacity-[0.05]">
                       <Icon size={240} weight="fill" />
                    </div>
                    
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-none bg-secondary text-foreground">
                      <Icon size={28} weight="duotone" />
                    </div>
                    
                    <div className="relative z-10 mt-12">
                      <h3 className="font-heading text-2xl font-semibold tracking-tight">
                        {t(cat.id as any)}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground font-medium">
                        {t(`${cat.id}Count` as any)}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
