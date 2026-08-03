import { CheckCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function BookingConfirmation() {
  const t = useTranslations("Booking");
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-success/20" />
        <CheckCircle size={80} weight="fill" className="text-success relative z-10" />
      </div>
      
      <h2 className="font-heading text-3xl font-bold mb-4">Booking Confirmed!</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        Thank you for choosing MadClap. Your professional has been assigned and will arrive at your scheduled time. 
        You can track their location in your dashboard.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link href="/dashboard" className="w-full sm:w-auto">
          <Button className="w-full h-12 px-8">{t("goToDashboard")}</Button>
        </Link>
        <Link href="/" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full h-12 px-8">{t("returnHome")}</Button>
        </Link>
      </div>
    </div>
  );
}
