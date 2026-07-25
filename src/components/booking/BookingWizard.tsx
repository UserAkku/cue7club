"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StepPackage } from "./StepPackage";
import { StepDateTime } from "./StepDateTime";
import { StepAddress } from "./StepAddress";
import { StepPayment } from "./StepPayment";
import { BookingConfirmation } from "./BookingConfirmation";

export type BookingState = {
  packageId: string | null;
  date: string | null;
  timeSlot: string | null;
  addressId: string | null;
  addressDetails: any | null; // fallback for new address
};

export function BookingWizard({ serviceId, serviceName }: { serviceId: string; serviceName: string }) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingState>({
    packageId: null,
    date: null,
    timeSlot: null,
    addressId: null,
    addressDetails: null,
  });

  const nextStep = () => setStep((s) => Math.min(5, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const updateData = (data: Partial<BookingState>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const steps = [
    { num: 1, title: "Package" },
    { num: 2, title: "Date & Time" },
    { num: 3, title: "Address" },
    { num: 4, title: "Payment" },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl pt-8 pb-24">
      {/* Progress Indicator */}
      {step < 5 && (
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-white/5" />
            <div 
              className="absolute left-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 bg-primary transition-all duration-500 ease-in-out"
              style={{ width: `\${((step - 1) / 3) * 100}%` }}
            />
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-2">
                <div 
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors \${
                    step >= s.num ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-white/5"
                  }`}
                >
                  {s.num}
                </div>
                <span className="hidden text-xs font-medium text-muted-foreground sm:block">
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Content with AnimatePresence */}
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-card p-6 md:p-10 shadow-xl glass-dark min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <StepPackage 
                serviceName={serviceName}
                selected={bookingData.packageId} 
                onSelect={(id) => { updateData({ packageId: id }); nextStep(); }} 
              />
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <StepDateTime
                date={bookingData.date}
                timeSlot={bookingData.timeSlot}
                onSelect={(date: Date | undefined, time: string) => updateData({ date: date ? date.toISOString() : undefined, timeSlot: time })}
                onNext={nextStep}
                onBack={prevStep}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <StepAddress
                addressId={bookingData.addressId}
                addressDetails={bookingData.addressDetails}
                onSelect={(id: string, details: any) => updateData({ addressId: id, addressDetails: details })}
                onNext={nextStep}
                onBack={prevStep}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <StepPayment
                bookingData={bookingData}
                serviceId={serviceId}
                onBack={prevStep}
                onSuccess={() => setStep(5)}
              />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <BookingConfirmation />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
