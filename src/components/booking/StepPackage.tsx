import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function StepPackage({ serviceName, selected, onSelect }: { serviceName: string, selected: string | null, onSelect: (id: string) => void }) {
  const packages = [
    { id: "basic", title: "Basic", price: 1499, desc: "Standard service for routine maintenance." },
    { id: "standard", title: "Standard", price: 2499, desc: "Deep cleaning and detailed attention.", popular: true },
    { id: "premium", title: "Premium", price: 4999, desc: "All-inclusive, premium grade materials and care." },
  ];

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-6">Select a Package for {serviceName}</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {packages.map((pkg) => (
          <button key={pkg.id} onClick={() => onSelect(pkg.id)} className="text-left h-full">
            <Card className={`relative flex h-full flex-col p-6 transition-all \${selected === pkg.id ? 'border-primary ring-1 ring-primary' : 'hover:border-white/20'}`}>
              {pkg.popular && (
                <div className="absolute top-0 right-4 -translate-y-1/2 rounded bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground uppercase tracking-widest">
                  Popular
                </div>
              )}
              <h3 className="font-heading text-lg font-semibold">{pkg.title}</h3>
              <div className="my-4 text-2xl font-bold">₹{pkg.price}</div>
              <p className="text-sm text-muted-foreground flex-1">{pkg.desc}</p>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
