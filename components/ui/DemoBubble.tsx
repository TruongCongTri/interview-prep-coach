import { Info } from "lucide-react";

export default function DemoBubble() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 rounded-full border border-amber-500/20 bg-background/90 backdrop-blur-md px-6 py-3 shadow-md pointer-events-none">
      <Info className="h-4 w-4 text-amber-500 stroke-[2]" />
      <span className="font-heading text-[10px] font-medium uppercase tracking-widest text-muted whitespace-nowrap">
        This is a Demo. No AI agent is used.
      </span>
    </div>
  );
}