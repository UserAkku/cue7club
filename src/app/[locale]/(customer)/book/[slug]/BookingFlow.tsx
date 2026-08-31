"use client";

import { useState, useTransition, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, CalendarBlank, MapPin, CurrencyInr, CaretRight, ArrowLeft, Star, CarProfile } from "@phosphor-icons/react";
import { createBooking } from "@/app/actions/booking";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

type Package = { id: string; name: string; price: number; duration: number; description: string };

type WorkerResult = {
  worker: { id: string; name: string; image: string | null; rating: number; totalReviews: number; bio: string | null };
  distanceKm: number;
  pricing: {
    basePrice: number;
    transportFee: number;
    platformFee: number;
    totalForUser: number;
    workerAmount: number;
    distanceKm: number;
  };
};

export default function BookingFlow({ 
  serviceId, 
  serviceName,
  packages, 
  basePrice 
}: { 
  serviceId: string; 
  serviceName: string;
  packages: Package[]; 
  basePrice: number;
}) {
  const t = useTranslations("Booking");
  const router = useRouter();
  const params = useParams();
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();

  // Booking State
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(packages.length > 0 ? packages[0] : null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [address, setAddress] = useState({ line1: "", city: "", state: "", pincode: "" });
  
  // Worker Selection State
  const [workers, setWorkers] = useState<WorkerResult[]>([]);
  const [isLoadingWorkers, setIsLoadingWorkers] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<WorkerResult | null>(null);

  const totalAmount = selectedPackage ? selectedPackage.price : basePrice;

  const fetchWorkers = async () => {
    if (!date || !time || !address.pincode) return;
    setIsLoadingWorkers(true);
    try {
      const scheduledAt = new Date(`${date}T${time}`).toISOString();
      const res = await fetch(`/api/workers/available?serviceId=${serviceId}&lat=0&lng=0&scheduledAt=${scheduledAt}`);
      const data = await res.json();
      if (data.workers) {
        setWorkers(data.workers);
      }
    } catch (err) {
      toast.error("Failed to load available workers");
    } finally {
      setIsLoadingWorkers(false);
    }
  };

  const handleNext = () => {
    if (step === 3) {
      fetchWorkers();
    }
    setStep(s => s + 1);
  };
  
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!date || !time || !address.line1 || !address.city || !address.pincode || !selectedWorker) return;

    const scheduledAt = new Date(`${date}T${time}`).toISOString();

    startTransition(async () => {
      const res = await createBooking({
        serviceId,
        packageId: selectedPackage?.id || null,
        professionalId: selectedWorker.worker.id,
        scheduledAt,
        totalAmount: selectedWorker.pricing.totalForUser,
        workerAmount: selectedWorker.pricing.workerAmount,
        distanceKm: selectedWorker.pricing.distanceKm,
        transportFee: selectedWorker.pricing.transportFee,
        platformFee: selectedWorker.pricing.platformFee,
        address,
      });

      if (res.success) {
        toast.success("Booking confirmed!");
        router.push(`/${params.locale}/bookings`);
      } else {
        toast.error("Booking failed: " + res.error);
      }
    });
  };

  return (
    <div className="space-y-6 relative">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8 px-2 relative">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-secondary/30 -z-10 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-primary -z-10 -translate-y-1/2 transition-all duration-500" 
          style={{ width: `${((step - 1) / 4) * 100}%` }} 
        />
        
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= i ? "bg-primary text-primary-foreground shadow-md" : "bg-white border-2 border-secondary/50 text-muted-foreground"}`}
          >
            {step > i ? <CheckCircle weight="bold" size={16} /> : i}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Packages */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold mb-4">{t("selectPackage") || "Select a Package"}</h2>
            {packages.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {packages.map(pkg => (
                  <Card 
                    key={pkg.id} 
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-6 cursor-pointer transition-all border-2 rounded-3xl ${selectedPackage?.id === pkg.id ? 'border-primary bg-primary/5 shadow-md' : 'border-black/5 hover:border-primary/30'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{pkg.name}</h3>
                      <div className="flex items-center text-primary font-bold">
                        <CurrencyInr size={16} />
                        {pkg.price}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                    <div className="text-xs font-semibold px-2 py-1 bg-secondary inline-block rounded-md">
                      ⏱ {pkg.duration} mins
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 border-black/5 rounded-3xl">
                <p className="font-medium text-lg">{t("standard") || "Standard Service"}</p>
                <div className="flex items-center text-primary font-bold mt-2">
                  <CurrencyInr size={20} />
                  {basePrice}
                </div>
              </Card>
            )}
            <div className="mt-8 flex justify-end">
              <Button onClick={handleNext} className="h-12 px-8 rounded-2xl">
                Next Step <CaretRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Schedule */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold mb-4">{t("whenDoYouNeedIt") || "When do you need it?"}</h2>
            <Card className="p-6 md:p-8 border-black/5 shadow-sm rounded-3xl space-y-6">
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">{t("date") || "Select Date"}</label>
                <div className="relative">
                  <CalendarBlank className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full h-12 pl-12 pr-4 bg-secondary/50 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">{t("time") || "Select Time"}</label>
                <div className="grid grid-cols-3 gap-3">
                  {["09:00", "11:00", "13:00", "15:00", "17:00"].map(t => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`h-12 rounded-xl font-semibold border-2 transition-colors ${time === t ? 'border-primary bg-primary/10 text-primary' : 'border-black/5 hover:border-black/10'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

            </Card>
            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={handleBack} className="h-12 px-6 rounded-2xl"><ArrowLeft className="mr-2"/> Back</Button>
              <Button onClick={handleNext} disabled={!date || !time} className="h-12 px-8 rounded-2xl">
                Next Step <CaretRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Address */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold mb-4">{t("whereDoWeGo") || "Where do we go?"}</h2>
            <Card className="p-6 md:p-8 border-black/5 shadow-sm rounded-3xl space-y-5">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">{t("houseFlatBlock") || "House / Flat / Block"}</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input 
                    type="text" 
                    value={address.line1}
                    onChange={(e) => setAddress({...address, line1: e.target.value})}
                    placeholder="e.g. 102, ABC Apartments"
                    className="w-full h-12 pl-12 pr-4 bg-secondary/50 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">{t("city") || "City"}</label>
                  <input 
                    type="text" 
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    className="w-full h-12 px-4 bg-secondary/50 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">{t("pincode") || "Pincode"}</label>
                  <input 
                    type="text" 
                    value={address.pincode}
                    onChange={(e) => setAddress({...address, pincode: e.target.value})}
                    className="w-full h-12 px-4 bg-secondary/50 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">{t("state") || "State"}</label>
                <input 
                  type="text" 
                  value={address.state}
                  onChange={(e) => setAddress({...address, state: e.target.value})}
                  className="w-full h-12 px-4 bg-secondary/50 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                />
              </div>

            </Card>
            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={handleBack} className="h-12 px-6 rounded-2xl"><ArrowLeft className="mr-2"/> Back</Button>
              <Button onClick={handleNext} disabled={!address.line1 || !address.city || !address.pincode} className="h-12 px-8 rounded-2xl">
                Find Workers <CaretRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Worker Select */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold mb-4">Select Your Professional</h2>
            
            {isLoadingWorkers ? (
              <div className="py-20 text-center text-muted-foreground">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                Finding the best professionals near you...
              </div>
            ) : workers.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-black/5">
                <h3 className="font-heading text-xl font-bold mb-2">No workers available</h3>
                <p className="text-muted-foreground">Try changing your date, time, or location.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {workers.map(w => (
                  <Card 
                    key={w.worker.id}
                    onClick={() => setSelectedWorker(w)}
                    className={`p-6 cursor-pointer border-2 transition-all rounded-3xl flex flex-col md:flex-row gap-6 ${selectedWorker?.worker.id === w.worker.id ? 'border-primary bg-primary/5 shadow-md' : 'border-black/5 hover:border-primary/30'}`}
                  >
                    <div className="flex-1 flex gap-4">
                      <div className="w-16 h-16 rounded-full bg-secondary overflow-hidden shrink-0">
                        {w.worker.image ? (
                          <img src={w.worker.image} alt={w.worker.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-xl">{w.worker.name.charAt(0)}</div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                          {w.worker.name}
                          <span className="flex items-center text-sm font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            <Star weight="fill" className="mr-1" /> {w.worker.rating}
                          </span>
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{w.worker.bio}</p>
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mt-3 uppercase tracking-wider">
                          <CarProfile size={16} /> {w.distanceKm} KM AWAY
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-black/5 p-4 rounded-2xl md:w-48 shrink-0 flex flex-col justify-center">
                      <div className="flex justify-between text-sm mb-1 text-muted-foreground">
                        <span>Service:</span> <span>₹{w.pricing.basePrice}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2 text-muted-foreground">
                        <span>Transport:</span> <span>₹{w.pricing.transportFee}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t border-black/5 pt-2">
                        <span>Total:</span> <span>₹{w.pricing.totalForUser}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={handleBack} className="h-12 px-6 rounded-2xl"><ArrowLeft className="mr-2"/> Back</Button>
              <Button onClick={handleNext} disabled={!selectedWorker} className="h-12 px-8 rounded-2xl">
                Review & Confirm <CaretRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 5: Confirm */}
        {step === 5 && selectedWorker && (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold mb-4">{t("reviewPay") || "Review your Booking"}</h2>
            
            <Card className="p-6 border-black/5 shadow-md rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <CheckCircle size={100} weight="fill" />
              </div>

              <div className="space-y-6 relative z-10">
                <div>
                  <h3 className="text-lg font-bold">{serviceName}</h3>
                  <p className="text-muted-foreground font-medium">{selectedPackage ? selectedPackage.name : 'Standard Service'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Date & Time</span>
                    <span className="font-medium text-sm">{date} at {time}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Location</span>
                    <span className="font-medium text-sm line-clamp-2">{address.line1}, {address.city} - {address.pincode}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Professional</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{selectedWorker.worker.name}</span>
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{selectedWorker.distanceKm} km away</span>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/30 p-4 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">{t("serviceTotal") || "Service Total"}</span>
                    <span className="font-medium flex items-center"><CurrencyInr size={14}/> {selectedWorker.pricing.basePrice}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Transport Fee</span>
                    <span className="font-medium flex items-center"><CurrencyInr size={14}/> {selectedWorker.pricing.transportFee}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-muted-foreground">{t("platformFee") || "Platform Fee"}</span>
                    <span className="font-medium flex items-center"><CurrencyInr size={14}/> {selectedWorker.pricing.platformFee}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-black/5">
                    <span className="font-bold">{t("amountToPay") || "Amount to Pay"}</span>
                    <span className="font-bold text-lg flex items-center"><CurrencyInr size={18}/> {selectedWorker.pricing.totalForUser}</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={handleBack} disabled={isPending} className="h-12 px-6 rounded-2xl"><ArrowLeft className="mr-2"/> Back</Button>
              <Button onClick={handleSubmit} disabled={isPending} className="h-12 px-8 rounded-2xl shadow-md">
                {isPending ? "Confirming..." : "Confirm Booking"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
