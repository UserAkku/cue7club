import { Button } from "@/components/ui/Button";

export function StepDateTime({ date, timeSlot, onSelect, onNext, onBack }: any) {
  // Mock dates for next 3 days
  const dates = [
    { id: "today", label: "Today", date: "Oct 25" },
    { id: "tomorrow", label: "Tomorrow", date: "Oct 26" },
    { id: "day3", label: "Saturday", date: "Oct 27" },
  ];

  const slots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"];

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-6">Select Date & Time</h2>
      
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Date</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {dates.map((d) => (
            <button
              key={d.id}
              onClick={() => onSelect(d.id, timeSlot)}
              className={`flex min-w-[100px] flex-col items-center rounded-xl border p-3 transition-all \${date === d.id ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 hover:border-white/30'}`}
            >
              <span className="text-sm font-semibold">{d.label}</span>
              <span className="text-xs">{d.date}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Time</h3>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {slots.map((t) => (
            <button
              key={t}
              onClick={() => onSelect(date, t)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all \${timeSlot === t ? 'border-primary bg-primary text-primary-foreground' : 'border-white/10 hover:border-white/30'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!date || !timeSlot} className="flex-1">Continue to Address</Button>
      </div>
    </div>
  );
}
