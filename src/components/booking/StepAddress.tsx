import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MapPin, Plus } from "@phosphor-icons/react";
import dynamic from "next/dynamic";

// Dynamic import Leaflet map to avoid SSR window errors
const AddressPinMap = dynamic(() => import("../map/AddressPinMap"), { ssr: false });

export function StepAddress({ addressId, addressDetails, onSelect, onNext, onBack }: any) {
  const [showMap, setShowMap] = useState(false);

  // Mock saved addresses
  const savedAddresses = [
    { id: "a1", label: "Home", text: "123 Green Park, Block B, New Delhi" },
  ];

  const handleMapConfirm = (lat: number, lng: number, address: string) => {
    onSelect("new", { lat, lng, text: address });
    setShowMap(false);
  };

  if (showMap) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-heading text-xl font-bold">Pin your location</h2>
          <Button variant="ghost" size="sm" onClick={() => setShowMap(false)}>Cancel</Button>
        </div>
        <div className="flex-1 min-h-[300px] rounded-xl overflow-hidden border border-white/10">
          <AddressPinMap onConfirm={handleMapConfirm} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-6">Service Address</h2>
      
      <div className="space-y-4 mb-8">
        {savedAddresses.map((addr) => (
          <button key={addr.id} onClick={() => onSelect(addr.id, null)} className="w-full text-left">
            <Card className={`flex items-start p-4 transition-all \${addressId === addr.id ? 'border-primary ring-1 ring-primary' : 'hover:border-white/20'}`}>
              <MapPin size={24} className="mr-4 mt-1 text-primary" weight="duotone" />
              <div>
                <h4 className="font-semibold">{addr.label}</h4>
                <p className="text-sm text-muted-foreground mt-1">{addr.text}</p>
              </div>
            </Card>
          </button>
        ))}

        {addressId === "new" && addressDetails && (
          <Card className="flex items-start p-4 border-primary ring-1 ring-primary">
            <MapPin size={24} className="mr-4 mt-1 text-primary" weight="fill" />
            <div>
              <h4 className="font-semibold">New Location</h4>
              <p className="text-sm text-muted-foreground mt-1">{addressDetails.text}</p>
            </div>
          </Card>
        )}

        <button onClick={() => setShowMap(true)} className="w-full text-left">
          <Card className="flex items-center p-4 hover:border-primary/50 border-dashed transition-all group">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary group-hover:bg-primary/20 transition-colors">
              <Plus size={20} />
            </div>
            <span className="ml-4 font-medium text-foreground">Add new address via Map</span>
          </Card>
        </button>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!addressId} className="flex-1">Continue to Payment</Button>
      </div>
    </div>
  );
}
