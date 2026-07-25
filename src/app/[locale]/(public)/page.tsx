import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { ServiceCategories } from "@/components/home/ServiceCategories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaSection } from "@/components/home/CtaSection";

type Props = {
  params: { locale: string };
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ServiceCategories />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
    </main>
  );
}
