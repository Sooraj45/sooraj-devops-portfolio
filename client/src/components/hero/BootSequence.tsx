import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { bootSequence } from "./data";

export function BootSequence({ onDone, skip }: { onDone: () => void; skip: boolean }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (skip) { onDone(); return; }
    if (i >= bootSequence.length - 1) {
      const t = window.setTimeout(onDone, 260);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setI(v => v + 1), 160);
    return () => window.clearTimeout(t);
  }, [i, skip, onDone]);

  if (skip) return null;

  return (
    <div className="pointer-events-none absolute right-5 top-24 z-30 sm:right-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: .18 }}
          className="mono flex items-center gap-2 text-[9px] uppercase tracking-[.16em] text-cyan-300/80"
        >
          <span className="h-1 w-1 rounded-full bg-cyan-300 animate-signal" />
          {bootSequence[i]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
