import { terminalScripts } from "./data";
import { useTypedTerminal } from "./useTypedTerminal";

export function TerminalPanel({ enabled }: { enabled: boolean }) {
  const lines = useTypedTerminal(terminalScripts, enabled);

  return (
    <div className="glass relative overflow-hidden rounded-xl p-4">
      <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-violet-300/[.05] to-transparent" />
      <div className="relative mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
        <span className="mono text-[9px] uppercase tracking-[.16em] text-slate-500">ops-shell / live</span>
      </div>
      <div className="relative min-h-[92px] space-y-1 mono text-[11px] leading-5">
        {lines.map((line, i) => {
          const isPrompt = line.startsWith("$");
          const isLast = i === lines.length - 1;
          return (
            <div key={i} className={isPrompt ? "text-violet-300" : "text-slate-400"}>
              {line}
              {isLast && <span className="animate-terminal-cursor" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
