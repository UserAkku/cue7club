import { Skeleton } from "@/components/ui/Skeleton";

export default function ServicesLoading() {
  return (
    <div className="container mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
      <div className="mb-12">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-6 w-96" />
      </div>

      <div className="mb-8 flex gap-4 border-b border-white/5 pb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-8 w-20" />
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-full overflow-hidden flex flex-col rounded-2xl border border-white/5 bg-card">
            <Skeleton className="aspect-[4/3] w-full rounded-none" />
            <div className="p-6">
              <Skeleton className="h-4 w-20 mb-3" />
              <Skeleton className="h-6 w-48 mb-4" />
              <Skeleton className="h-4 w-32" />
              <div className="mt-6 flex justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
