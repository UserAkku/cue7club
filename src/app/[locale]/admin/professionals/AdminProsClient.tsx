"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { approveProfessional, rejectProfessional, suspendProfessional, reactivateProfessional } from "@/app/actions/professional";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminProsClient({ pros }: { pros: any[] }) {
  const t = useTranslations("Admin");
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (proId: string, action: string) => {
    setLoadingId(proId);
    try {
      if (action === 'APPROVE') await approveProfessional(proId);
      if (action === 'REJECT') await rejectProfessional(proId, "Rejected by admin");
      if (action === 'SUSPEND') await suspendProfessional(proId);
      if (action === 'REACTIVATE') await reactivateProfessional(proId);
      toast.success(`Action ${action} successful`);
      router.refresh();
    } catch (err) {
      toast.error("Failed to perform action");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">{t("professionals") || "Professionals"}</h1>
          <p className="text-muted-foreground mt-2">{t("managePros") || "Manage professional accounts and approvals"}</p>
        </div>
      </div>

      <Card className="border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 text-muted-foreground border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">{t("name") || "Name"}</th>
                <th className="px-6 py-4 font-medium">{t("email") || "Email"}</th>
                <th className="px-6 py-4 font-medium">{t("joined") || "Joined"}</th>
                <th className="px-6 py-4 font-medium">{t("status") || "Status"}</th>
                <th className="px-6 py-4 font-medium text-right">{t("actions") || "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pros.map((pro) => (
                <tr key={pro.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{pro.user.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{pro.user.email}</td>
                  <td className="px-6 py-4 text-muted-foreground">{new Date(pro.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      pro.onboardingStatus === "ACTIVE" ? "success" : 
                      pro.onboardingStatus === "PENDING_APPROVAL" ? "default" : "destructive"
                    }>
                      {pro.onboardingStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {pro.onboardingStatus === "PENDING_APPROVAL" && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-success hover:bg-success/90 text-white"
                          disabled={loadingId === pro.id}
                          onClick={() => handleAction(pro.id, 'APPROVE')}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          disabled={loadingId === pro.id}
                          onClick={() => handleAction(pro.id, 'REJECT')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {pro.onboardingStatus === "ACTIVE" && (
                      <Button 
                        size="sm" 
                        variant="destructive"
                        disabled={loadingId === pro.id}
                        onClick={() => handleAction(pro.id, 'SUSPEND')}
                      >
                        Suspend
                      </Button>
                    )}
                    {pro.onboardingStatus === "SUSPENDED" && (
                      <Button 
                        size="sm" 
                        className="bg-success hover:bg-success/90 text-white"
                        disabled={loadingId === pro.id}
                        onClick={() => handleAction(pro.id, 'REACTIVATE')}
                      >
                        Reactivate
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
