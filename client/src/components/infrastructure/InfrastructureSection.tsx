import { motion } from "framer-motion";
import { Activity, DatabaseBackup, ShieldCheck } from "lucide-react";
import { ArchitectureCard } from "./ArchitectureCard";
import { InfrastructureWorkflow } from "./InfrastructureWorkflow";

const headingLines = ["How I approach", "infrastructure."];
const operatingLayers = [
  { title: "Edge & access", copy: "DNS routing, WAF controls, firewall policy and secure VPN connectivity.", tools: "GoDaddy DNS · Instra WAF · SonicWall", icon: ShieldCheck },
  { title: "Runtime & delivery", copy: "Application hosting, inbound rules, object storage and deployment support.", tools: "AWS EC2 · AWS S3 · Oracle Cloud", icon: Activity },
  { title: "Continuity & operations", copy: "Backup protection, infrastructure monitoring, patching and maintenance.", tools: "Veeam · Acronis · Atera · ManageEngine", icon: DatabaseBackup },
] as const;

export function InfrastructureSection() {
  return (
    <section id="infrastructure" className="relative overflow-hidden border-y border-white/8 site-alt-surface py-28">
      <div className="grid-texture absolute inset-0 opacity-30" />
      <div className="site-alt-surface absolute inset-0 opacity-70" />

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

      <div className="container relative mt-16">
        <motion.div className="mb-5 flex flex-col justify-between gap-4 border-y border-white/8 py-4 sm:flex-row sm:items-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.8)]"/><span className="mono text-[10px] uppercase tracking-[.16em] text-slate-300">Infrastructure operating model</span></div>
          <div className="mono text-[9px] uppercase tracking-[.14em] text-slate-600">secure edge · managed runtime · protected recovery</div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {operatingLayers.map(({ title, copy, tools, icon: Icon }, i) => <motion.article key={title} className="glass group relative overflow-hidden rounded-2xl p-6" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: .5, delay: i * .08 }}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent opacity-0 transition group-hover:opacity-100"/>
            <div className="flex items-center justify-between"><div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[.07] p-3 text-cyan-300"><Icon className="h-5 w-5"/></div><span className="mono text-[9px] text-slate-600">LAYER / 0{i + 1}</span></div>
            <h3 className="display mt-7 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 min-h-14 text-sm leading-6 text-slate-400">{copy}</p>
            <div className="mt-6 border-t border-white/8 pt-4 mono text-[9px] uppercase leading-5 tracking-[.1em] text-cyan-200">{tools}</div>
          </motion.article>)}
        </div>

        <motion.div className="mt-5 grid overflow-hidden rounded-2xl border border-white/8 bg-[#07101f]/75 md:grid-cols-5" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {["Request", "DNS + WAF", "EC2 application", "S3 storage", "Monitor + backup"].map((step, i) => <div key={step} className="relative flex min-h-24 items-center gap-3 border-b border-white/8 px-5 md:border-b-0 md:border-r"><span className="mono text-[9px] text-cyan-300">{String(i + 1).padStart(2, "0")}</span><span className="text-sm text-slate-300">{step}</span>{i < 4 && <span className="absolute -right-1.5 top-1/2 z-10 hidden h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-cyan-300/35 bg-[#07101f] md:block"/>}</div>)}
        </motion.div>
      </div>
    </section>
  );
}
