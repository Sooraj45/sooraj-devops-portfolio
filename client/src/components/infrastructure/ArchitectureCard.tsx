import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";
import { useState } from "react";
import { architectureFooter, architectureNodes } from "./data";
import { ConnectionPath } from "./ConnectionPath";
import { InfrastructureNode } from "./InfrastructureNode";

export function ArchitectureCard() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: .97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: .6, ease: [.23, 1, .32, 1] }}
      className="glass relative overflow-hidden rounded-[22px] p-5 md:p-7"
    >
      <div className="pointer-events-none absolute inset-0 grid-texture opacity-25" />
      <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-violet-300/[.06] to-transparent" />

      <div className="relative mb-7 flex items-center justify-between border-b border-white/8 pb-4">
        <div>
          <div className="eyebrow">Cloud architecture / 2026</div>
          <div className="mt-1 text-sm text-slate-300">Production request path</div>
        </div>
        <Globe2 className="h-4 w-4 text-violet-300" />
      </div>

      <div className="relative">
        {architectureNodes.map((node, i) => (
          <div key={node.id}>
            <InfrastructureNode node={node} index={i} hovered={hovered === node.id} onHover={setHovered} />
            {i < architectureNodes.length - 1 && (
              <ConnectionPath active={hovered === node.id || hovered === architectureNodes[i + 1].id} />
            )}
          </div>
        ))}
      </div>

      <div className="relative mt-7 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 mono text-[10px] uppercase tracking-[.12em] text-slate-500">
        {architectureFooter.map(item => <span key={item}>{item}</span>)}
      </div>
    </motion.div>
  );
}
