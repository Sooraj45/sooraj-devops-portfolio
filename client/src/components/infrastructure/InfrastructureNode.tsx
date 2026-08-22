import { motion } from "framer-motion";
import type { ArchitectureNode } from "./data";

const toneStyles = {
  cyan: { border: "border-cyan-300/30", bg: "bg-cyan-300/8", text: "text-cyan-200", dot: "bg-cyan-300", glow: "shadow-[0_0_22px_rgba(93,228,255,.22)]", hoverBorder: "hover:border-cyan-300/50" },
  amber: { border: "border-amber-300/30", bg: "bg-amber-300/8", text: "text-amber-200", dot: "bg-amber-300", glow: "shadow-[0_0_22px_rgba(246,201,106,.22)]", hoverBorder: "hover:border-amber-300/50" },
} as const;

export function InfrastructureNode({ node, index, hovered, onHover }: { node: ArchitectureNode; index: number; hovered: boolean; onHover: (id: string | null) => void }) {
  const tone = toneStyles[node.tone];
  return (
    <motion.div
      className="relative z-10 flex cursor-default items-center gap-4"
      initial={{ opacity: 0, scale: .9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: .45, delay: .15 + index * .1, ease: [.23, 1, .32, 1] }}
      onHoverStart={() => onHover(node.id)}
      onHoverEnd={() => onHover(null)}
    >
      <motion.div
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: .25, ease: [.23, 1, .32, 1] }}
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-shadow duration-300 ${tone.border} ${tone.bg} ${hovered ? tone.glow : ""}`}
      >
        <span className={`h-2 w-2 rounded-full ${tone.dot} ${hovered ? "animate-signal" : ""}`} />
      </motion.div>
      <div className={`flex flex-1 items-center justify-between rounded-lg border bg-white/[.03] px-4 py-2.5 transition duration-300 ${hovered ? `${tone.hoverBorder} bg-white/[.05]` : "border-white/8"}`}>
        <span className="mono text-xs tracking-[.2em] text-white">{node.label}</span>
        <span className={`mono flex items-center gap-1.5 text-[9px] uppercase tracking-[.14em] ${tone.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${tone.dot} ${hovered ? "animate-signal" : ""}`} />
          {node.status}
        </span>
      </div>
    </motion.div>
  );
}
