import { ChevronDown } from "lucide-react";

export function ScrollIndicator({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Scroll to explore"
      className="group absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 mono text-[9px] uppercase tracking-[.2em] text-slate-500 transition-colors hover:text-violet-300"
    >
      Scroll to explore
      <ChevronDown className="h-3.5 w-3.5 animate-hero-bounce" />
    </button>
  );
}
