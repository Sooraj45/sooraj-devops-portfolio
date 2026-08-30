import { motion } from "framer-motion";
import { ArchitectureCard } from "./ArchitectureCard";
import { InfrastructureWorkflow } from "./InfrastructureWorkflow";

const headingLines = ["How I approach", "infrastructure."];

export function InfrastructureSection() {
  return (
    <section id="infrastructure" className="relative overflow-hidden border-y border-white/8 bg-[#050505] py-28">
      <div className="grid-texture absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-[#050505]/70" />

      <div className="container relative grid gap-8 md:grid-cols-[.45fr_.55fr] md:gap-10 lg:grid-cols-[.38fr_.62fr] lg:items-center lg:gap-16">
        <div>
          <motion.div
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: .5, ease: [.23, 1, .32, 1] }}
          >
            04 / Infrastructure
          </motion.div>

          <h2 className="display text-4xl font-semibold tracking-[-.04em] text-white md:text-6xl">
            {headingLines.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: .55, delay: .1 + i * .1, ease: [.23, 1, .32, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h2>

          <motion.p
            className="mt-5 max-w-2xl text-lg leading-8 text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: .5, delay: .32 }}
          >
            Plan, configure, secure, deploy, monitor, backup and maintain—mapped to technologies present in the resume.
          </motion.p>

          <div className="mt-10">
            <InfrastructureWorkflow />
          </div>
        </div>

        <div>
          <ArchitectureCard />
        </div>
      </div>
    </section>
  );
}
