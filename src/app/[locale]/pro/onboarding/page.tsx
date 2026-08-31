"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLocale } from "next-intl";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const res = await fetch("/api/professional/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "PENDING_APPROVAL" }),
        });
        if (res.ok) {
          router.push(`/${locale}/pro/dashboard`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-sm border border-black/5">
        <h1 className="font-heading text-3xl font-bold mb-2">Professional Onboarding</h1>
        <p className="text-muted-foreground mb-8">Step {step} of 5</p>

        <form onSubmit={handleNext} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="font-heading text-xl font-semibold">Personal Info</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input required placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input required placeholder="+91 9876543210" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea 
                  className="w-full flex min-h-[80px] rounded-2xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                  placeholder="Tell customers about your experience..."
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="font-heading text-xl font-semibold">Services Offered</h2>
              <p className="text-sm text-muted-foreground">Select the services you can provide.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Cleaning', 'Plumbing', 'Electrical', 'Carpentry'].map(service => (
                  <label key={service} className="flex items-center gap-3 p-3 rounded-xl border border-border cursor-pointer hover:bg-secondary">
                    <input type="checkbox" className="w-5 h-5 rounded" />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="font-heading text-xl font-semibold">Service Areas</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Pincode</label>
                <Input required placeholder="e.g. 110001" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input required placeholder="e.g. New Delhi" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="font-heading text-xl font-semibold">ID Verification</h2>
              <p className="text-sm text-muted-foreground">Upload a government-issued ID (Aadhaar, PAN, DL)</p>
              <div className="space-y-2">
                <label className="text-sm font-medium">Document Type</label>
                <select className="w-full h-12 rounded-2xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option>Aadhaar Card</option>
                  <option>PAN Card</option>
                  <option>Driving License</option>
                </select>
              </div>
              <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:bg-secondary transition-colors">
                <p className="text-muted-foreground font-medium">Click to upload image</p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 text-center animate-in fade-in slide-in-from-bottom-4 py-8">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl font-bold">Ready to Submit</h2>
              <p className="text-muted-foreground">
                Your application will be reviewed by our admin team. You'll receive an email once approved.
              </p>
            </div>
          )}

          <div className="flex gap-4 pt-4 border-t border-border">
            {step > 1 && (
              <Button type="button" variant="outline" className="w-full" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : step === 5 ? "Submit Application" : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
