import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, CurrencyInr } from "@phosphor-icons/react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function StepPayment({ bookingData, serviceId, onBack, onSuccess }: any) {
  const t = useTranslations("Booking");
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Hardcoded prices mapping for demo
  const packagePrices: Record<string, number> = {
    basic: 1499,
    standard: 2499,
    premium: 4999,
  };
  const price = packagePrices[bookingData.packageId || "standard"] || 2499;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!scriptLoaded) return;
    setLoading(true);

    try {
      // 1. Create order on backend
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price * 100 }), // In paise
      });
      const order = await res.json();

      if (order.error) throw new Error(order.error);

      // 2. Init Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "dummy", // Should be in env
        amount: order.amount,
        currency: order.currency,
        name: "MadClap",
        description: "Premium Service Booking",
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify on backend (webhook or direct call)
          const verifyRes = await fetch("/api/payments/webhook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              bookingData,
              serviceId
            }),
          });
          if (verifyRes.ok) {
            onSuccess();
          } else {
            alert("Payment verification failed.");
          }
        },
        theme: {
          color: "#00D4AA",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment Failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Failed to initiate payment. Ensure environment variables are set.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-6">Review & Pay</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <Card className="p-6 border-white/5">
            <h3 className="font-semibold text-lg border-b border-white/10 pb-4 mb-4">{t("orderSummary")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Package</span>
                <span className="font-medium uppercase">{bookingData.packageId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{bookingData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{bookingData.timeSlot}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>{t("totalAmount")}</span>
                <span className="flex items-center"><CurrencyInr size={20} />{price}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:w-[320px] shrink-0">
          <Card className="p-6 border-primary bg-primary/5 text-center h-full flex flex-col justify-center">
            <ShieldCheck size={48} className="mx-auto text-primary mb-4" weight="duotone" />
            <h4 className="font-semibold text-lg mb-2">{t("securePayment")}</h4>
            <p className="text-sm text-muted-foreground mb-6">Your payment is processed securely via Razorpay. We do not store card details.</p>
            
            <div className="mt-auto flex flex-col gap-3">
              <Button onClick={handlePayment} disabled={loading || !scriptLoaded} className="w-full h-12 text-base shadow-lg shadow-primary/20">
                {loading ? "Processing..." : "Pay Securely"}
              </Button>
              <Button variant="ghost" onClick={onBack} disabled={loading} className="w-full">
                Go Back
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
