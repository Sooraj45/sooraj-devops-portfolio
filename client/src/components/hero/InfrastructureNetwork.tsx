import { motion } from "framer-motion";
import { useState } from "react";
import { backgroundParticles, hudLabels, netEdges, netNodes, secondaryNodes, type NetNode } from "./data";

const toneDot = { cyan: "bg-cyan-300", amber: "bg-amber-300", violet: "bg-violet-300" } as const;
const toneText = { cyan: "text-cyan-200", amber: "text-amber-200", violet: "text-violet-200" } as const;
const toneBorder = { cyan: "border-cyan-300/35 hover:border-cyan-300/60", amber: "border-amber-300/35 hover:border-amber-300/60", violet: "border-violet-300/35" } as const;

function findNode(id: string): NetNode {
  return netNodes.find(n => n.id === id)!;
}

export function InfrastructureNetwork({ animateIn, enabled }: { animateIn: boolean; enabled: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative h-full w-full">
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {secondaryNodes.map(s => {
          const near = findNode(s.near);
          return (
            <line
              key={`sec-${s.id}`}
              x1={s.x} y1={s.y} x2={near.x} y2={near.y}
              stroke="rgba(148,163,184,.22)" strokeWidth={.5} strokeDasharray="1.5 2"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        {netEdges.map((edge, i) => {
          const a = findNode(edge.from);
          const b = findNode(edge.to);
          const active = hovered === edge.from || hovered === edge.to;
          return (
            <motion.line
              key={`${edge.from}-${edge.to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={active ? "#5de4ff" : "rgba(93,228,255,.4)"}
              strokeWidth={.6}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={animateIn ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: .9, delay: .3 + i * .1, ease: "easeInOut" }}
              style={{ transition: "stroke .3s ease" }}
            />
          );
        })}
      </svg>

      {enabled && netEdges.map((edge, i) => {
        const a = findNode(edge.from);
        const b = findNode(edge.to);
        const from = edge.reverse ? b : a;
        const to = edge.reverse ? a : b;
        const dist = Math.hypot(to.x - from.x, to.y - from.y);
        return (
          <motion.span
            key={`packet-${edge.from}-${edge.to}`}
            className="pointer-events-none absolute h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_#5de4ff]"
            initial={{ left: `${from.x}%`, top: `${from.y}%`, opacity: 0 }}
            animate={{ left: [`${from.x}%`, `${to.x}%`], top: [`${from.y}%`, `${to.y}%`], opacity: [0, 1, 1, 0] }}
            transition={{ duration: Math.max(1.4, dist * .045), repeat: Infinity, repeatDelay: .6, delay: 1.1 + i * .3, ease: "linear" }}
          />
        );
      })}

      {backgroundParticles.map((p, i) => (
        <span
          key={i}
          className="pointer-events-none absolute h-[3px] w-[3px] rounded-full bg-cyan-300/50 animate-signal"
          style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.delay}s` }}
        />
      ))}

      {secondaryNodes.map(s => (
        <div
          key={s.id}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 opacity-60"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          <span className="mono whitespace-nowrap text-[8px] uppercase tracking-[.14em] text-slate-500">{s.label}</span>
        </div>
      ))}

      {netNodes.map((node, i) => {
        if (node.id === "user") {
          return (
            <motion.div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ opacity: 0, scale: .8 }}
              animate={animateIn ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: .5, delay: .15 }}
            >
              <span className="mono block text-center text-[8px] uppercase tracking-[.16em] text-violet-200/80">{node.label}</span>
              <span className="mx-auto mt-1 block h-1.5 w-1.5 rounded-full bg-violet-300 animate-signal" />
            </motion.div>
          );
        }
        const isHovered = hovered === node.id;
        return (
          <motion.div
            key={node.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-default"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: .9 }}
            animate={animateIn ? { opacity: 1, scale: isHovered ? 1.06 : 1 } : undefined}
            transition={{ duration: .45, delay: .35 + i * .08, ease: [.23, 1, .32, 1] }}
            onHoverStart={() => setHovered(node.id)}
            onHoverEnd={() => setHovered(null)}
          >
            <div className={`flex items-center gap-2 rounded-lg border bg-[#0b0b0b]/80 px-2.5 py-1.5 backdrop-blur-sm transition-colors duration-300 ${toneBorder[node.tone]} ${isHovered ? "shadow-[0_0_24px_rgba(93,228,255,.2)]" : ""}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${toneDot[node.tone]} ${isHovered ? "animate-signal" : "animate-pulse"}`} />
              <div className="leading-tight">
                <div className="mono text-[10px] tracking-[.14em] text-white">{node.label}</div>
                {node.status && <div className={`mono text-[7px] uppercase tracking-[.1em] ${toneText[node.tone]}`}>{node.status}</div>}
              </div>
            </div>
          </motion.div>
        );
      })}

      {hudLabels.map((h, i) => (
        <span
          key={i}
          className={`mono pointer-events-none absolute text-[7px] uppercase tracking-[.14em] text-slate-600 ${h.align === "right" ? "-translate-x-full" : ""}`}
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
        >
          {h.text}
        </span>
      ))}
    </div>
  );
}
