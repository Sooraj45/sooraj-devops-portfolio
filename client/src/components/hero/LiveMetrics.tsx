import { useEffect, useState } from "react";

export function LiveMetrics({ enabled }: { enabled: boolean }) {
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      setLatency(11 + Math.round(Math.random() * 2));
    }, 2600);
    return () => window.clearInterval(id);
  }, [enabled]);

  return (
    <div className="mono flex flex-col gap-2 text-[9px] uppercase tracking-[.14em] text-slate-400">
      <div className="flex items-center justify-between gap-4">
        <span>Uptime</span>
        <span className="text-cyan-300">99.99%</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>Latency</span>
        <span className="text-cyan-300">{latency}ms</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>Deploy</span>
        <span className="flex items-center gap-1.5 text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />Success</span>
      </div>
    </div>
  );
}
