import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export default async function AboutPage() {
  const locale = await getLocale();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Hero */}
        <div className="pt-32 pb-24 max-w-4xl mx-auto text-center md:pt-40 md:pb-32">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1]">
            We are redefining the standard of home services.
          </h1>
        </div>

        {/* Clean Text Block */}
        <div className="max-w-3xl mx-auto space-y-16 pb-32">
          
          <div>
            <h2 className="font-heading text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-8">
              The Mission
            </h2>
            <p className="text-2xl md:text-4xl leading-snug text-foreground font-medium">
              Your home is your sanctuary. Maintaining it shouldn't require managing unreliable contractors or compromising on quality.
            </p>
          </div>

          <div className="pt-12 border-t border-border">
            <h2 className="font-heading text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-8">
              The Standard
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              We don't just fix things; we elevate them. Every service provider on our platform goes through a rigorous background check, skill assessment, and continuous quality monitoring to ensure the standard never drops.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Transparent pricing. No hidden fees. No last-minute negotiations. You know exactly what you're paying for before you book, and you get exactly what you expect.
            </p>
          </div>

          <div className="pt-12 border-t border-border">
            <h2 className="font-heading text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-8">
              Core Principles
            </h2>
            <ul className="space-y-10">
              <li>
                <strong className="block font-heading text-2xl text-foreground mb-3">Absolute Trust</strong>
                <span className="text-lg md:text-xl text-muted-foreground leading-relaxed">Safety and reliability are non-negotiable. We vet every professional so you can invite them into your home with complete peace of mind.</span>
              </li>
              <li>
                <strong className="block font-heading text-2xl text-foreground mb-3">Premium Quality</strong>
                <span className="text-lg md:text-xl text-muted-foreground leading-relaxed">We focus on the details that others miss. Our standard is perfection, ensuring your space feels brand new after every visit.</span>
              </li>
              <li>
                <strong className="block font-heading text-2xl text-foreground mb-3">Frictionless Experience</strong>
                <span className="text-lg md:text-xl text-muted-foreground leading-relaxed">From booking to payment, the entire process is designed to be effortless, giving you back your most valuable asset: time.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimal CTA */}
        <div className="max-w-3xl mx-auto pb-40 text-center">
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-10">
            Experience the difference.
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/services`}>
              <Button size="lg" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
