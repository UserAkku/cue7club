import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export default function ProfessionalsAdminPage() {
  const t = useTranslations("Admin");
  const pros = [
    { id: "p1", name: "Rahul Sharma", type: "Deep Cleaning", status: "PENDING", joined: "2 days ago" },
    { id: "p2", name: "Amit Kumar", type: "Garden Maintenance", status: "APPROVED", joined: "1 month ago" },
    { id: "p3", name: "Priya Singh", type: "Health & Wellness", status: "SUSPENDED", joined: "3 months ago" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">{t("professionals")}</h1>
          <p className="text-muted-foreground mt-2">{t("managePros")}</p>
        </div>
      </div>

      <Card className="border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 text-muted-foreground border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">{t("name")}</th>
                <th className="px-6 py-4 font-medium">{t("serviceCategory")}</th>
                <th className="px-6 py-4 font-medium">{t("joined")}</th>
                <th className="px-6 py-4 font-medium">{t("status")}</th>
                <th className="px-6 py-4 font-medium text-right">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pros.map((pro) => (
                <tr key={pro.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{pro.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{pro.type}</td>
                  <td className="px-6 py-4 text-muted-foreground">{pro.joined}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      pro.status === "APPROVED" ? "success" : 
                      pro.status === "PENDING" ? "default" : "destructive"
                    }>
                      {pro.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {pro.status === "PENDING" && (
                      <Button size="sm" className="bg-success hover:bg-success/90 text-white">{t("approve")}</Button>
                    )}
                    <Button size="sm" variant="outline">{t("view")}</Button>
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
