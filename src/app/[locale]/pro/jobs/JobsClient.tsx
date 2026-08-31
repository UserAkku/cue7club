"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";

export default function JobsClient({ jobs }: { jobs: any[] }) {
  const t = useTranslations("ProDashboard");

  return (
    <div className="pb-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-2">{t("myJobs") || "My Jobs"}</h1>
        <p className="text-muted-foreground">{t("manageServiceRequests") || "Manage your service requests"}</p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-20 bg-white border border-black/5 rounded-3xl text-muted-foreground">
          No jobs found.
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job, i) => {
            const isCompleted = job.status === "COMPLETED";
            const isUpcoming = ["CONFIRMED", "IN_PROGRESS", "EN_ROUTE"].includes(job.status);
            const statusType = isCompleted ? "success" : isUpcoming ? "primary" : "secondary";

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className={`p-6 border-black/5 transition-colors flex flex-col md:flex-row justify-between md:items-center gap-4 rounded-3xl ${isCompleted ? 'bg-secondary/30 grayscale-[30%] opacity-80' : 'bg-white hover:bg-secondary/20 shadow-sm'}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge 
                        variant="outline" 
                        className={statusType === "primary" ? "text-primary border-primary/30" : statusType === "success" ? "text-success border-success/30" : "text-muted-foreground border-black/10"}
                      >
                        {job.status}
                      </Badge>
                      <span className="text-sm font-medium text-muted-foreground">
                        {format(new Date(job.scheduledAt), "PPp")}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg">{job.service?.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{job.address?.line1}, {job.address?.city}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3 justify-end md:justify-center mt-2 md:mt-0">
                    <div className={`font-bold text-lg ${isCompleted ? 'text-success' : 'text-foreground'}`}>
                      {isCompleted ? '+' : ''}₹{job.workerAmount?.toLocaleString()}
                    </div>
                    <Link href={`/pro/jobs/${job.id}`}>
                      <Button variant={isUpcoming ? "primary" : "secondary"} className="rounded-2xl px-6">
                        {isUpcoming ? t("startJob") || "Start Job" : "View Details"}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
