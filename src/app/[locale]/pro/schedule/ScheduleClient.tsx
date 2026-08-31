"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, CheckCircle } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ScheduleClient({ scheduleItems, professionalStatus }: { scheduleItems: any[], professionalStatus: string }) {
  const t = useTranslations("ProDashboard");
  const [isAvailable, setIsAvailable] = useState(professionalStatus === "ACTIVE");

  return (
    <div className="pb-12 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tight mb-2">{t("schedule") || "My Schedule"}</h1>
          <p className="text-muted-foreground">{t("manageAvailability") || "Manage your availability"}</p>
        </div>
        
        <Card className="flex items-center gap-4 p-2 pl-4 border-black/5 bg-white shadow-sm rounded-full">
          <span className="text-sm font-medium">{t("statusLabel") || "Status:"}</span>
          <Badge 
            variant="outline" 
            className={`px-3 py-1 text-sm ${isAvailable ? 'text-success border-success/30 bg-success/5' : 'text-danger border-danger/30 bg-danger/5'}`}
          >
            {isAvailable ? "Accepting Jobs" : "Off Duty"}
          </Badge>
          <Button 
            variant={isAvailable ? "secondary" : "primary"}
            size="sm"
            className="rounded-full"
            onClick={() => setIsAvailable(!isAvailable)}
          >
            {isAvailable ? "Go Offline" : "Go Online"}
          </Button>
        </Card>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">{t("today") || "Today"}</h2>
        <Button variant="ghost" className="text-primary gap-2">
          <Calendar size={18} />
          <span className="hidden sm:inline">{t("selectDate") || "Select Date"}</span>
        </Button>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {scheduleItems.length === 0 ? (
           <div className="text-center py-20 bg-white border border-black/5 rounded-3xl text-muted-foreground">
             No jobs scheduled for today. You are free!
           </div>
        ) : scheduleItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            {/* Timeline dot */}
            <div className={`flex items-center justify-center w-4 h-4 rounded-full border-2 border-background absolute left-6 md:left-1/2 -translate-x-1/2 ${
              item.status === 'booked' ? 'bg-primary' : item.status === 'free' ? 'bg-success' : 'bg-muted-foreground'
            }`}></div>
            
            <Card className={`w-[calc(100%-4rem)] md:w-[calc(50%-2rem)] p-5 border-black/5 shadow-sm rounded-3xl transition-colors ${
              item.status === 'booked' ? 'bg-white hover:bg-secondary/20' : 
              item.status === 'free' ? 'bg-success/5 border-success/10' : 'bg-secondary/30'
            }`}>
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <Clock size={16} />
                <span className="text-sm font-medium">{item.time}</span>
              </div>
              <h3 className={`font-heading font-semibold text-lg ${
                item.status === 'free' ? 'text-success' : ''
              }`}>
                {item.task}
              </h3>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
