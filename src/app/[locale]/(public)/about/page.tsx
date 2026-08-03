import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations("About");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Hero */}
        <div className="pt-32 pb-24 max-w-4xl mx-auto text-center md:pt-40 md:pb-32">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1]">
            {t("heading")}
          </h1>
        </div>

        {/* Clean Text Block */}
        <div className="max-w-3xl mx-auto space-y-16 pb-32">
          
          <div>
            <h2 className="font-heading text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-8">
              {t("theMission")}
            </h2>
            <p className="text-2xl md:text-4xl leading-snug text-foreground font-medium">
              {t("missionDesc")}
            </p>
          </div>

          <div className="pt-12 border-t border-border">
            <h2 className="font-heading text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-8">
              {t("theStandard")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              {t("standardDesc1")}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t("standardDesc2")}
            </p>
          </div>

          <div className="pt-12 border-t border-border">
            <h2 className="font-heading text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-8">
              {t("corePrinciples")}
            </h2>
            <ul className="space-y-10">
              <li>
                <strong className="block font-heading text-2xl text-foreground mb-3">{t("absoluteTrust")}</strong>
                <span className="text-lg md:text-xl text-muted-foreground leading-relaxed">{t("trustDesc")}</span>
              </li>
              <li>
                <strong className="block font-heading text-2xl text-foreground mb-3">{t("premiumQuality")}</strong>
                <span className="text-lg md:text-xl text-muted-foreground leading-relaxed">{t("qualityDesc")}</span>
              </li>
              <li>
                <strong className="block font-heading text-2xl text-foreground mb-3">{t("frictionlessExperience")}</strong>
                <span className="text-lg md:text-xl text-muted-foreground leading-relaxed">{t("frictionlessDesc")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimal CTA */}
        <div className="max-w-3xl mx-auto pb-40 text-center">
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-10">
            {t("experienceDifference")}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/services`}>
              <Button size="lg" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto">
                {t("exploreServices")}
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
