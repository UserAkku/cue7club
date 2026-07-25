"use client";

import { motion } from "motion/react";
import { HandTap, CalendarPlus, SealCheck } from "@phosphor-icons/react";

const STEPS = [
  {
    icon: HandTap,
    title: "Select a Service",
    description: "Browse our premium services and pick the one that fits your exact needs.",
  },
  {
    icon: CalendarPlus,
    title: "Pick a Time",
    description: "Choose a convenient slot. Our pros work around your schedule, not ours.",
  },
  {
    icon: SealCheck,
    title: "Relax & Done",
    description: "A verified professional arrives and delivers top-tier service. Guaranteed.",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full bg-secondary/30 py-24 md:py-32">
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            Zero friction.<br />Pure service.
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Connector Line (Desktop only) */}
                {i !== STEPS.length - 1 && (
                  <div className="absolute left-[52px] top-6 hidden w-[calc(100%-64px)] border-t-2 border-dashed border-border md:block" />
                )}
                
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background border border-border text-foreground shadow-sm">
                  <Icon size={24} weight="duotone" />
                </div>
                
                <div className="mt-6 pr-8">
                  <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
