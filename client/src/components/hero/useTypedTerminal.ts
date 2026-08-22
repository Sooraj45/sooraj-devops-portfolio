import { useEffect, useRef, useState } from "react";

export function useTypedTerminal(scripts: string[][], enabled: boolean): string[] {
  const [scriptIdx, setScriptIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!enabled) { setVisibleLines(scripts[0]); return; }
    let cancelled = false;
    const script = scripts[scriptIdx % scripts.length];
    let lineI = 0;
    let charI = 0;
    let acc: string[] = [];

    const tick = () => {
      if (cancelled) return;
      const line = script[lineI];
      charI += Math.max(1, Math.round(line.length / 20));
      const shown = line.slice(0, charI);
      setVisibleLines([...acc, shown]);
      if (charI >= line.length) {
        acc = [...acc, line];
        lineI += 1;
        charI = 0;
        if (lineI >= script.length) {
          timer.current = window.setTimeout(() => { if (!cancelled) setScriptIdx(i => i + 1); }, 2200);
          return;
        }
        timer.current = window.setTimeout(tick, 260);
        return;
      }
      timer.current = window.setTimeout(tick, 22);
    };

    setVisibleLines([]);
    timer.current = window.setTimeout(tick, 260);
    return () => { cancelled = true; window.clearTimeout(timer.current); };
  }, [scriptIdx, enabled]);

  return visibleLines;
}
