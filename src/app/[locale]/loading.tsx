import { Sparkle } from "@phosphor-icons/react/dist/ssr";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] flex-col gap-4">
      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
        <Sparkle className="text-primary animate-spin-slow" size={32} />
      </div>
      <p className="text-muted-foreground font-medium animate-pulse">Loading MadClap...</p>
    </div>
  );
}
