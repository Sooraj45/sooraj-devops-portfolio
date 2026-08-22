import { motion } from "framer-motion";
import { infrastructureSteps } from "./data";

export function InfrastructureWorkflow() {
  return (
    <div className="space-y-2">
      {infrastructureSteps.map((step, i) => {
        const amber = i >= 3;
        return (
          <motion.div
            key={step.title}
            className="group flex items-center gap-4"
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: .45, delay: i * .09, ease: [.23, 1, .32, 1] }}
          >
            <span className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 group-hover:scale-125 ${amber ? "bg-amber-300 group-hover:shadow-[0_0_12px_rgba(246,201,106,.8)]" : "bg-cyan-300 group-hover:shadow-[0_0_12px_rgba(93,228,255,.8)]"}`} />
            <span className="mono w-24 shrink-0 text-xs tracking-[.18em] text-slate-300">{step.title}</span>
            <span className="h-px w-8 shrink-0 bg-white/15 transition-all duration-300 group-hover:w-12 group-hover:bg-cyan-300/40" />
            <span className="text-xs text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-300">{step.technology}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
