import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BootSequence } from "./BootSequence";
import { HeroHeadline } from "./HeroHeadline";
import { InfrastructureNetwork } from "./InfrastructureNetwork";
import { LiveMetrics } from "./LiveMetrics";
import { ScrollIndicator } from "./ScrollIndicator";
import { TerminalPanel } from "./TerminalPanel";
import { useParallax } from "./useParallax";

export function DevOpsHero({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [booted, setBooted] = useState(false);
  const [scrollT, setScrollT] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const parallax = useParallax(!reduceMotion);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = heroRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setScrollT(Math.max(0, Math.min(1, -rect.top / rect.height)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, [reduceMotion]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: booted ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: .6, delay, ease: [.23, 1, .32, 1] as const },
  });

  return (
    <div ref={heroRef} className="relative flex min-h-screen w-full flex-col justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,58,237,.16),transparent_28%),radial-gradient(circle_at_80%_40%,rgba(34,211,238,.12),transparent_32%)]" />
      <div
        className="grid-texture absolute inset-0 opacity-30"
        style={reduceMotion ? undefined : { transform: `translate3d(${parallax.x * 3}px, ${parallax.y * 3}px, 0)` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(93,228,255,.14),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#050505_22%,rgba(5,5,5,.9)_54%,rgba(5,5,5,.35))]" />

      {!booted && <BootSequence skip={reduceMotion} onDone={() => setBooted(true)} />}

      <div className="container relative">
        <div className="relative grid gap-14 py-16 lg:py-24">
          <div className="relative z-20 max-w-2xl">
            <motion.div className="eyebrow mb-7 flex items-center gap-3" {...fadeUp(0)}>
              <span className="signal-dot animate-signal" />DEVOPS ENGINEER · CLOUD · INFRASTRUCTURE
            </motion.div>

            <HeroHeadline start={booted} />

            <motion.p className="mt-8 max-w-xl text-lg leading-8 text-slate-300" {...fadeUp(.62)}>
              DevOps Engineer with hands-on experience across cloud infrastructure, systems administration and application deployment. Skilled in AWS, Oracle Cloud, virtualization, network and firewall security, VPN configuration, backup and disaster recovery, and front-end development.
            </motion.p>

            <motion.div className="mt-10 flex flex-wrap gap-3" {...fadeUp(.74)}>
              <button
                onClick={() => scrollTo("experience")}
                className="group rounded-lg bg-cyan-300 px-5 py-3.5 display text-sm font-semibold text-[#050505] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_32px_rgba(93,228,255,.35)] active:scale-[.98]"
              >
                View My Experience <ArrowUpRight className="ml-2 inline h-4 w-4 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
              <a
                href="#contact"
                className="rounded-lg border border-white/15 bg-white/[.04] px-5 py-3.5 display text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[.08]"
              >
                Let's Connect
              </a>
            </motion.div>

            <motion.div className="mt-10 flex items-center gap-5 mono text-[10px] uppercase tracking-[.16em] text-slate-500" {...fadeUp(.86)}>
              <a href="mailto:soorajpoojary45@gmail.com" className="transition hover:text-cyan-300">Email</a>
              <a href="https://github.com/Sooraj45" target="_blank" rel="noreferrer" className="transition hover:text-cyan-300">GitHub</a>
            </motion.div>
          </div>

          <div className="relative z-10 mt-4 lg:absolute lg:inset-y-0 lg:right-[-1%] lg:mt-0 lg:flex lg:w-[48%] lg:items-center">
            <div
              className="relative h-[360px] w-full max-w-md sm:h-[420px] lg:h-[600px] lg:max-w-none"
              style={reduceMotion ? undefined : {
                transform: `translate3d(${parallax.x * 8}px, ${parallax.y * 8 - scrollT * 40}px, 0)`,
                opacity: 1 - scrollT * .5,
                transition: "opacity .2s linear",
              }}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-1/3 bg-gradient-to-r from-[#050505] to-transparent lg:block" />
              <motion.div
                className="relative h-full w-full"
                initial={{ opacity: 0, scale: .96 }}
                animate={booted ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: .8, delay: .3, ease: [.23, 1, .32, 1] }}
              >
                <InfrastructureNetwork animateIn={booted} enabled={!reduceMotion} />
              </motion.div>

              <div className="absolute -top-3 right-0 z-20 hidden w-40 rounded-lg border border-white/8 bg-[#0b0b0b]/70 p-3 backdrop-blur-sm lg:block">
                <LiveMetrics enabled={!reduceMotion} />
              </div>

              <div className="absolute -bottom-10 -left-8 z-20 hidden w-64 lg:block">
                <TerminalPanel enabled={!reduceMotion} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator onClick={() => scrollTo("about")} />
    </div>
  );
}
