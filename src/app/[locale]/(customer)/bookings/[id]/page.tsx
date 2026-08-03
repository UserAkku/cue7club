"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { CheckCircle, PhoneCall, ChatText, Receipt } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const TrackingMap = dynamic(() => import("@/components/map/TrackingMap"), { ssr: false });

export default function BookingDetailPage() {
  const t = useTranslations("Dashboard");
  const params = useParams();
  const bookingId = params.id as string;
  const status: string = "EN_ROUTE";

  const steps = [
    { label: t("booked"), completed: true },
    { label: t("confirmed"), completed: true },
    { label: t("enRoute"), completed: status === "EN_ROUTE" || status === "ARRIVED" || status === "COMPLETED", active: status === "EN_ROUTE" },
    { label: t("arrived"), completed: status === "ARRIVED" || status === "COMPLETED", active: status === "ARRIVED" },
    { label: t("completed"), completed: status === "COMPLETED" },
  ];

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      <motion.div 
        className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-heading text-4xl font-bold tracking-tight">{t("booking")}{bookingId}</h1>
            <Badge variant="outline" className={`text-sm px-3 py-1 uppercase tracking-wider ${
              status === "COMPLETED" ? "text-success border-success/30" : 
              status === "EN_ROUTE" ? "text-warning border-warning/30 bg-warning/10" : 
              "text-primary border-primary/30"
            }`}>
              {status}
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">Full Home Deep Cleaning • Oct 25, 02:00 PM</p>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-8 mb-10 border-black/5 bg-white shadow-sm rounded-3xl overflow-x-auto hide-scrollbar">
          <div className="flex items-center justify-between min-w-[600px] relative px-4">
            <div className="absolute left-8 right-8 top-[1.125rem] -z-10 h-1 -translate-y-1/2 bg-black/5 rounded-full overflow-hidden">
               <div className="h-full bg-primary transition-all duration-1000 ease-in-out w-1/2" />
            </div>
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-3 bg-white px-2">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                    step.completed 
                      ? 'bg-primary text-primary-foreground shadow-[0_0_10px_rgba(var(--primary),0.3)]' 
                      : 'bg-background text-muted-foreground border-2 border-black/10'
                  }`}
                >
                  {step.completed ? <CheckCircle size={20} weight="bold" /> : <span className="font-semibold text-sm">{i + 1}</span>}
                </motion.div>
                <span className={`text-sm font-semibold tracking-wide ${step.active ? 'text-primary' : (step.completed ? 'text-foreground' : 'text-muted-foreground')}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Map & Pro Info */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl overflow-hidden border border-black/5 shadow-md bg-secondary/50 h-[450px] relative"
          >
            {/* The frosted glass gradient over the map edges */}
            <div className="absolute inset-0 z-10 pointer-events-none ring-1 ring-inset ring-black/5 rounded-3xl shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" />
            <TrackingMap bookingId={bookingId} customerLat={28.6139} customerLng={77.2090} />
            
            {status === "EN_ROUTE" && (
               <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-xl border border-black/5 px-5 py-2.5 rounded-full shadow-lg flex items-center gap-3">
                 <div className="h-2.5 w-2.5 rounded-full bg-warning animate-ping relative"><div className="absolute inset-0 bg-warning rounded-full" /></div>
                 <span className="text-sm font-semibold tracking-wide">Professional is arriving soon</span>
               </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-8 border-black/5 bg-white shadow-sm rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Avatar fallback="RS" size="lg" className="h-14 w-14 border border-black/5 shadow-sm bg-primary/10 text-primary font-bold" />
                <div>
                  <h4 className="font-semibold text-lg tracking-tight">Rahul Sharma</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">Professional Cleaner • <span className="text-warning">★ 4.9</span></p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="rounded-full h-12 w-12 hover:bg-secondary transition-colors border-black/10"><ChatText size={22} /></Button>
                <Button size="icon" className="rounded-full h-12 w-12 shadow-sm hover:shadow-md transition-all"><PhoneCall size={22} weight="fill" /></Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Invoice Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-8 border-black/5 bg-white shadow-md rounded-3xl sticky top-24">
            <h3 className="font-heading text-xl font-semibold tracking-tight mb-8">{t("paymentSummary")}</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/50 border border-black/5">
                <span className="text-muted-foreground font-medium">{t("servicePackage")} (Premium)</span>
                <span className="font-medium text-base">₹4,999</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2">
                <span className="text-muted-foreground">{t("taxesFees")}</span>
                <span className="font-medium">₹250</span>
              </div>
              
              <hr className="my-6 border-black/10" />
              
              <div className="flex justify-between items-center px-2">
                <span className="text-muted-foreground font-semibold">{t("totalPaid")}</span>
                <span className="font-bold text-2xl tracking-tight">₹5,249</span>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col gap-4">
              <Button variant="outline" className="w-full h-14 font-semibold rounded-2xl border-black/10 hover:bg-secondary group shadow-sm">
                <Receipt size={20} className="mr-2 group-hover:-translate-y-0.5 transition-transform" /> {t("downloadReceipt")}
              </Button>
              {status !== "COMPLETED" && status !== "EN_ROUTE" && status !== "ARRIVED" && (
                <Button variant="ghost" className="w-full h-12 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-2xl font-medium transition-colors">
                  {t("cancelBooking")}
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
