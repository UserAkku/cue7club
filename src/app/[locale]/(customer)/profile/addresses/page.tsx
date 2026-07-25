import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MapPin, Plus, Trash } from "@phosphor-icons/react/dist/ssr";

const mockAddresses = [
  {
    id: "a1",
    label: "Home",
    text: "123 Green Park, Block B, New Delhi, 110016",
    isDefault: true,
  }
];

export default function AddressesPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Saved Addresses</h1>
          <p className="text-muted-foreground mt-2">Manage locations for your service bookings.</p>
        </div>
        <Button className="hidden sm:flex items-center gap-2">
          <Plus size={16} /> Add New
        </Button>
      </div>

      <div className="space-y-4">
        {mockAddresses.map((addr) => (
          <Card key={addr.id} className="p-6 border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-primary">
                <MapPin size={24} weight={addr.isDefault ? "fill" : "duotone"} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold">{addr.label}</h3>
                  {addr.isDefault && (
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">Default</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{addr.text}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="ghost" size="icon" className="text-danger hover:bg-danger/10"><Trash size={18} /></Button>
            </div>
          </Card>
        ))}

        <Button className="w-full sm:hidden flex items-center justify-center gap-2" variant="outline">
          <Plus size={16} /> Add New Address
        </Button>
      </div>
    </div>
  );
}
