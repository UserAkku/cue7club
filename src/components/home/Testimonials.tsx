"use client";

import { motion } from "motion/react";
import { Avatar } from "@/components/ui/Avatar";
import { Rating } from "@/components/ui/Rating";

const REVIEWS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Homeowner",
    content: "The easiest booking experience I've had. The pro arrived on time, was extremely polite, and the deep clean was spotless.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Desai",
    role: "Verified Customer",
    content: "Used them for my garden makeover. Highly professional and transparent pricing. No hidden fees at all.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anita Verma",
    role: "Homeowner",
    content: "Booked a massage therapist. Fantastic service, very premium feel from the app all the way to the actual service.",
    rating: 4.5,
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-background py-24 md:py-32">
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:pr-8"
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
              Don't just take our word for it.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Over 15,000+ bookings completed with an average rating of 4.8 out of 5 stars.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-2">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-8"
              >
                <div>
                  <Rating rating={review.rating} className="mb-6" />
                  <p className="text-lg leading-relaxed text-card-foreground">
                    "{review.content}"
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <Avatar fallback={review.name} size="md" />
                  <div>
                    <h4 className="font-medium text-card-foreground">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
