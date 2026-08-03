"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";

import { useTranslations } from "next-intl";

export default function JobsPage() {
  const t = useTranslations("ProDashboard");
  const jobs = [
    {
      id: "1",
      title: "Full Home Deep Cleaning",
      address: "123 Green Park, Block B, New Delhi",
      time: "02:00 PM",
      status: "UPCOMING",
      type: "primary"
    },
    {
      id: "2",
      title: "Sofa Cleaning",
      address: "45 Lajpat Nagar, New Delhi",
      time: "10:00 AM",
      status: "COMPLETED",
      type: "success",
      earnings: "+₹1,499"
    },
    {
      id: "3",
      title: "Bathroom Deep Cleaning",
      address: "DLF Phase 3, Gurugram",
      time: "Yesterday",
      status: "COMPLETED",
      type: "success",
      earnings: "+₹999"
    }
  ];

  return (
    <div className="pb-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-2">{t("myJobs")}</h1>
        <p className="text-muted-foreground">{t("manageServiceRequests")}</p>
      </div>

      <div className="space-y-4">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="p-6 border-white/5 bg-secondary/20 hover:bg-secondary/40 transition-colors flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge 
                    variant="outline" 
                    className={job.type === "primary" ? "text-primary border-primary/30" : "text-success border-success/30"}
                  >
                    {job.status}
                  </Badge>
                  <span className="text-sm font-medium text-muted-foreground">{job.time}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg">{job.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{job.address}</p>
              </div>
              <div className="flex flex-col items-end gap-3 justify-end md:justify-center mt-2 md:mt-0">
                {job.earnings && (
                  <div className="font-bold text-success text-lg">{job.earnings}</div>
                )}
                <Link href={`/pro/jobs/${job.id}`}>
                  <Button variant={job.status === "UPCOMING" ? "primary" : "secondary"}>
                    {job.status === "UPCOMING" ? t("startJob") : "View Details"}
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
