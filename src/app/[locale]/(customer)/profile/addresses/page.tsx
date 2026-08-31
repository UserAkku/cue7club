import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { MapPin, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function AddressesPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const t = await getTranslations("Dashboard");

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">{t("savedAddresses") || "Saved Addresses"}</h1>
          <p className="text-muted-foreground mt-2">{t("manageLocations") || "Manage your service locations"}</p>
        </div>
        <Button className="hidden sm:flex items-center gap-2">
          <Plus size={16} /> Add New
        </Button>
      </div>

      <div className="space-y-4">
        {addresses.length === 0 ? (
          <div className="text-center p-8 border border-black/10 rounded-2xl bg-black/5">
            <p className="text-muted-foreground">You have no saved addresses yet.</p>
          </div>
        ) : (
          addresses.map((addr) => (
            <Card key={addr.id} className="p-6 border-black/5 bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-primary">
                  <MapPin size={24} weight="fill" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold">{addr.label || "Home"}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{addr.line1}, {addr.city}, {addr.state} - {addr.pincode}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10"><Trash size={18} /></Button>
              </div>
            </Card>
          ))
        )}

        <Button className="w-full sm:hidden flex items-center justify-center gap-2" variant="outline">
          <Plus size={16} /> Add New Address
        </Button>
      </div>
    </div>
  );
}
