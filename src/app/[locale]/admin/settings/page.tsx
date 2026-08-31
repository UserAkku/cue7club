import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function AdminSettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect(`/${resolvedParams.locale}/login`);
  }

  const settings = await prisma.platformSettings.findUnique({
    where: { id: "singleton" }
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-muted-foreground mt-2">Manage global platform configurations.</p>
        </div>
        <Button>Save Settings</Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="p-6 border-white/5 bg-white/5">
          <h2 className="font-heading text-xl font-bold mb-4">Pricing & Fees</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Platform Fee Percentage</label>
              <input type="number" defaultValue={settings?.platformFeePercent} className="w-full bg-background border border-white/10 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Transport Fee Per Km (₹)</label>
              <input type="number" defaultValue={settings?.transportFeePerKm} className="w-full bg-background border border-white/10 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Maximum Transport Fee (₹)</label>
              <input type="number" defaultValue={settings?.maxTransportFee} className="w-full bg-background border border-white/10 rounded-md p-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-white/5 bg-white/5">
          <h2 className="font-heading text-xl font-bold mb-4">Service Rules</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Max Matching Radius (Km)</label>
              <input type="number" defaultValue={settings?.maxRadiusKm} className="w-full bg-background border border-white/10 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Free Cancellation Window (Hours)</label>
              <input type="number" defaultValue={settings?.cancellationWindowHours} className="w-full bg-background border border-white/10 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Minimum Booking Lead Time (Hours)</label>
              <input type="number" defaultValue={settings?.minBookingLeadTimeHours} className="w-full bg-background border border-white/10 rounded-md p-2" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
