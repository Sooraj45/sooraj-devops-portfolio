// Control Plane Noir: this page treats the portfolio as an evidence-led operations console.
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight, Cloud, Code2, Copy, Download, Github, Globe2, LockKeyhole, Mail, Menu, Network, Server, ShieldCheck, Terminal, X, Zap } from "lucide-react";
import { toast } from "sonner";
import { InfrastructureSection } from "@/components/infrastructure/InfrastructureSection";
import { DevOpsHero } from "@/components/hero/DevOpsHero";

const base = import.meta.env.BASE_URL;
const asset = {
  hero: `${base}manus-storage/control-plane-hero_c8abb376.jpg`,
  architecture: `${base}manus-storage/infrastructure-architecture_fa1ffc0c.jpg`,
  texture: `${base}manus-storage/observability-texture_bdf42214.jpg`,
  profile: `${base}manus-storage/soorajImage_cee72ae5.jpg`,
  resume: `${base}manus-storage/Sooraj_Poojary_Resume_efe1a1d5.pdf`,
};

const navItems = ["About", "Experience", "Skills", "Infrastructure", "Education", "Contact"];
const expertise = [
  ["Cloud Infrastructure", "Cloud infrastructure deployment, configuration and application hosting.", ["AWS EC2", "AWS S3", "Oracle Cloud"], Cloud],
  ["Network & Security", "Network security, firewall configuration, secure connectivity and DNS management.", ["WAF", "Firewall", "VPN", "SonicWall", "CloudFlare"], ShieldCheck],
  ["Systems Administration", "Server administration, virtualization, user management and infrastructure operations.", ["Linux", "Windows infrastructure", "Active Directory", "Hyper-V"], Server],
  ["Microsoft Infrastructure", "Microsoft cloud administration, user provisioning, licensing and endpoint management.", ["Microsoft 365", "Exchange Administration", "Intune", "Group Policy"], Network],
  ["Backup & Monitoring", "Backup, monitoring, patch management and infrastructure maintenance.", ["Veeam", "Acronis", "Atera", "ManageEngine"], Zap],
  ["Application Deployment", "Application deployment, hosting, connectivity and infrastructure security.", ["AWS", "S3", "EC2", "WAF", "DNS"], Code2],
] as const;

const experience = [
  { role: "DevOps Engineer", company: "IDSSPL Technologies", date: "May 2026 — Present", tone: "cyan", bullets: ["Deployed and managed applications on AWS EC2 and S3.", "Configured inbound security rules and bucket policies.", "Managed domain and DNS configuration through GoDaddy.", "Configured and maintained Instra WAF for fintech application infrastructure.", "Set up and managed VPN tunnels for secure remote connectivity.", "Contributed to front-end development for a fintech application."] },
  { role: "System Engineer — Internship", company: "Trikuta Infotech Pty Ltd", date: "Melbourne, Victoria, Australia · Dec 2025 — Present", tone: "violet", bullets: ["Managed and deployed Acronis and Atera solutions.", "Supported backup, cybersecurity and remote monitoring.", "Applied Azure DevOps Server and Microsoft Azure Machine Learning."] },
  { role: "System Administrator", company: "Scymes Pvt Ltd", date: "Apr 2025 — Apr 2026", tone: "amber", bullets: ["Hyper-V virtualization, VM creation, monitoring and maintenance.", "Accops HySecure, Accops HyWorks and Accops Controller.", "Veeam backup and Microsoft 365 administration.", "User provisioning, license assignments, group management and security compliance.", "SonicWall firewall, VPN, load balancers and Sophos Antivirus.", "ManageEngine patch management."] },
  { role: "System Administrator", company: "Athena BPO Pvt Ltd", date: "Jul 2023 — Mar 2025", tone: "slate", bullets: ["Server health monitoring and Active Directory.", "User accounts, credentials, permissions and access rights.", "Network inventory and software licensing.", "Patch management, Kaspersky Antivirus and ITSM.", "Change management, incident management and ticketing."] },
  { role: "Linux Administrator — Internship", company: "CorexTech IT Services Pvt Ltd", date: "3 months", tone: "slate", bullets: ["Cloud computing and cloud security.", "Linux server administration and Linux kernel fundamentals."] },
];

const skillGroups: readonly (readonly [string, readonly string[]])[] = [
  ["Cloud & DevOps", ["AWS EC2", "AWS S3", "Oracle Cloud", "Azure DevOps Server", "Azure Machine Learning"]],
  ["Virtualization", ["Hyper-V", "Accops HySecure", "Accops HyWorks", "Accops Controller"]],
  ["Networking & Security", ["WAF", "Firewall Administration", "VPN Configuration", "GoDaddy DNS", "SonicWall", "CloudFlare", "Sophos", "Kaspersky"]],
  ["IT Infrastructure", ["Veeam Backup", "Acronis", "Atera", "Microsoft 365", "Exchange Administration", "Intune", "ManageEngine", "Group Policy", "Active Directory", "Linux Server Administration", "ITSM", "Incident Management"]],
  ["Front-End", ["HTML", "CSS", "JavaScript"]],
];

const terminalHelp = ["Available commands:", "  help          Show this help", "  whoami        Who is this", "  about         Short summary", "  skills        List core skills", "  experience    Recent roles", "  contact       Get in touch", "  resume        Download resume", "  social        Social links", "  ls            List files", "  clear         Clear the terminal"];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .55, delay, ease: [.23, 1, .32, 1] }}>{children}</motion.div>;
}

function SectionHeading({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return <div className="mb-12 max-w-3xl"><div className="eyebrow mb-4">{kicker}</div><h2 className="display text-4xl font-semibold tracking-[-.04em] text-white md:text-6xl">{title}</h2>{copy && <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">{copy}</p>}</div>;
}

type TermLine = { type: "input" | "output"; text: string };

function TerminalCard() {
  const [history, setHistory] = useState<TermLine[]>([{ type: "output", text: "sooraj@control-plane — interactive shell. Type 'help' to get started." }]);
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }); }, [history]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory(h => [...h, { type: "input", text: cmd }]);
    setCmdLog(h => [...h, cmd]);
    setLogIndex(-1);

    const [name, ...args] = cmd.split(/\s+/);
    let output: string[];
    switch (name.toLowerCase()) {
      case "help": output = terminalHelp; break;
      case "whoami": output = ["Sooraj Poojary — DevOps Engineer, Mumbai, India"]; break;
      case "about": output = ["Cloud infrastructure, systems administration and application deployment.", "AWS, Oracle Cloud, virtualization, network & firewall security, VPN, backup & DR."]; break;
      case "skills": output = skillGroups.map(([group, list]) => `${group}: ${list.join(", ")}`); break;
      case "experience": output = experience.map(item => `${item.date} — ${item.role} @ ${item.company}`); break;
      case "contact": output = ["Email: soorajpoojary45@gmail.com", "Location: Mumbai, India"]; break;
      case "resume": output = ["Opening resume..."]; window.open(asset.resume, "_blank"); break;
      case "social": output = ["LinkedIn: https://www.linkedin.com", "GitHub: https://github.com"]; break;
      case "ls": output = ["about.md  experience.log  skills.json  contact.txt  resume.pdf"]; break;
      case "echo": output = [args.join(" ")]; break;
      case "date": output = [new Date().toString()]; break;
      case "sudo": output = ["Permission denied: nice try 😄"]; break;
      case "clear": setHistory([]); return;
      default: output = [`command not found: ${name} (type 'help' for a list)`];
    }
    setHistory(h => [...h, ...output.map(text => ({ type: "output" as const, text }))]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { runCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (!cmdLog.length) return; const next = logIndex < 0 ? cmdLog.length - 1 : Math.max(0, logIndex - 1); setLogIndex(next); setInput(cmdLog[next]); }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (logIndex < 0) return; const next = logIndex + 1; if (next >= cmdLog.length) { setLogIndex(-1); setInput(""); } else { setLogIndex(next); setInput(cmdLog[next]); } }
  };

  return <div className="glass animate-shimmer rounded-2xl p-5" onClick={() => inputRef.current?.focus()}>
    <div className="mb-5 flex items-center justify-between"><div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-red-300/70"/><span className="h-2 w-2 rounded-full bg-amber-300/70"/><span className="h-2 w-2 rounded-full bg-emerald-300/70"/></div><span className="mono text-[10px] text-slate-500 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse"/>ops-shell / bash — live</span></div>
    <div ref={scrollRef} className="h-48 space-y-1.5 overflow-y-auto mono text-xs pr-1">
      {history.map((line, i) => line.type === "input"
        ? <div key={i} className="flex gap-2"><span className="shrink-0 text-cyan-300">sooraj@control-plane:~$</span><span className="text-slate-200">{line.text}</span></div>
        : <div key={i} className="whitespace-pre-wrap pl-0 text-slate-400">{line.text}</div>)}
      <div className="flex items-center gap-2">
        <span className="shrink-0 text-cyan-300">sooraj@control-plane:~$</span>
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown} spellCheck={false} autoComplete="off" aria-label="Terminal input" className="flex-1 bg-transparent text-slate-100 outline-none caret-cyan-300"/>
      </div>
    </div>
  </div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [architectureOffset, setArchitectureOffset] = useState(0);
  const email = "soorajpoojary45@gmail.com";
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;
    let frame = 0;
    const updateParallax = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = document.getElementById("infrastructure");
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (rect.top + rect.height / 2)) / (window.innerHeight + rect.height)));
        setArchitectureOffset(progress * 30);
      });
    };
    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", updateParallax); window.removeEventListener("resize", updateParallax); };
  }, []);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const copyEmail = async () => { await navigator.clipboard?.writeText(email); setCopied(true); toast.success("Email copied to clipboard"); window.setTimeout(() => setCopied(false), 1800); };
  const allSkills = useMemo(() => skillGroups.flatMap(([, list]) => list), []);

  return <div className="min-h-screen overflow-hidden bg-[#080d17] text-slate-100"><div aria-hidden="true" className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex"><div className="mb-1 h-10 w-px bg-gradient-to-b from-transparent via-cyan-300/60 to-transparent"/><span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(93,228,255,.8)]"/><span className="h-1 w-1 rounded-full bg-slate-600"/><span className="h-1 w-1 rounded-full bg-slate-600"/><span className="h-1 w-1 rounded-full bg-slate-600"/><div className="mt-1 h-20 w-px bg-gradient-to-b from-cyan-300/50 to-transparent"/><span className="mono [writing-mode:vertical-rl] text-[8px] uppercase tracking-[.26em] text-slate-600">signal rail / ops</span></div>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#080d17]/80 backdrop-blur-xl"><div className="container flex h-20 items-center justify-between"><a href="#home" className="flex items-center gap-3"><div className="relative hidden h-10 w-10 overflow-hidden rounded-full border border-cyan-300/35 bg-[#e9eef0] shadow-[0_0_22px_rgba(93,228,255,.12)] sm:block"><img src={asset.profile} alt="Sooraj Poojary profile" className="h-full w-full object-cover object-top"/><span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-[#080d17] bg-emerald-300"/></div><div><div className="display text-base font-bold tracking-[.26em] text-white">SOORAJ</div><div className="mono text-[9px] tracking-[.2em] text-cyan-300">DEVOPS ENGINEER</div></div></a><nav className="hidden items-center gap-7 lg:flex">{navItems.map(item => <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="mono text-[10px] uppercase tracking-[.14em] text-slate-400 transition-colors hover:text-cyan-300">{item}</button>)}</nav><div className="hidden items-center gap-3 md:flex"><span className="flex items-center gap-2 mono text-[10px] uppercase tracking-[.14em] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/>Available to connect</span><button onClick={() => scrollTo("contact")} className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 mono text-[10px] uppercase tracking-[.12em] text-cyan-200 transition hover:bg-cyan-300/20">Let's Connect <ArrowUpRight className="ml-1 inline h-3 w-3"/></button></div><button aria-label="Toggle menu" className="rounded-lg border border-white/10 p-2 text-slate-300 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>{menuOpen && <div className="border-t border-white/10 bg-[#0b1220] px-5 py-5 md:hidden">{navItems.map(item => <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="block w-full border-b border-white/8 py-4 text-left mono text-xs uppercase tracking-[.14em] text-slate-300">{item}</button>)}</div>}</header>

    <main id="home">
      <section className="relative overflow-hidden pt-28"><DevOpsHero heroImage={asset.hero} scrollTo={scrollTo}/></section>

      <section id="about" className="relative py-28 md:py-36"><div className="container grid gap-14 lg:grid-cols-[.82fr_1.18fr]"><Reveal><SectionHeading kicker="01 / About" title="Engineering infrastructure with security in mind." copy="A practical DevOps and systems profile shaped by cloud infrastructure, administration, secure connectivity, backup operations and application deployment."/><p className="max-w-xl text-base leading-8 text-slate-400">I bring hands-on experience across cloud infrastructure, systems administration and application deployment, with a focus on AWS EC2 and S3, Oracle Cloud, virtualization, network and firewall security, VPN configuration, backup and disaster recovery, and front-end development. My work supports business-critical infrastructure with minimal downtime.</p></Reveal><Reveal delay={.1}><div className="grid gap-3 sm:grid-cols-2">{["Cloud Infrastructure", "Systems Administration", "Application Deployment", "Security & Networking"].map((item, i) => <div key={item} className="glass group rounded-xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/30"><div className="mb-8 flex items-center justify-between"><span className="mono text-[10px] text-slate-500">0{i + 1}</span><ArrowUpRight className="h-4 w-4 text-cyan-300 opacity-50 transition group-hover:opacity-100"/></div><div className="display text-xl font-semibold text-white">{item}</div><div className="mt-3 h-px w-14 bg-cyan-300/50"/></div>)}</div><div className="mt-4"><TerminalCard/></div></Reveal></div></section>

      <section id="expertise" className="relative border-y border-white/8 bg-[#0b1220] py-28"><div className="container"><Reveal><SectionHeading kicker="02 / Core expertise" title="The systems behind the delivery." copy="A recruiter-friendly view of the infrastructure domains represented in the resume."/></Reveal><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{expertise.map(([title, desc, tags, Icon], i) => <Reveal key={title} delay={i * .04}><article className="glass animate-shimmer group h-full rounded-2xl p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/35"><div className="flex items-start justify-between"><div className="rounded-xl border border-cyan-300/20 bg-cyan-300/8 p-3 text-cyan-300"><Icon className="h-5 w-5"/></div><span className="mono text-[10px] text-slate-600">DOMAIN / 0{i + 1}</span></div><div className="mt-5 flex items-center justify-between border-y border-white/8 py-2 mono text-[9px] uppercase tracking-[.14em] text-slate-500"><span>surface / operational</span><span className="flex items-center gap-1.5 text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/>active</span></div><h3 className="display mt-8 text-2xl font-semibold text-white">{title}</h3><p className="mt-3 min-h-16 text-sm leading-6 text-slate-400">{desc}</p><div className="mt-6 flex flex-wrap gap-2">{tags.map(tag => <span key={tag} className="rounded-md border border-white/10 bg-white/[.035] px-2.5 py-1.5 mono text-[10px] text-slate-300">{tag}</span>)}</div></article></Reveal>)}</div></div></section>

      <section id="experience" className="py-28 md:py-36"><div className="container"><Reveal><SectionHeading kicker="03 / Experience" title="A career built close to the system." copy="Exact roles and responsibilities from the resume, organized as an operational timeline."/></Reveal><div className="relative max-w-5xl"><div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-cyan-300/65 via-violet-300/35 to-transparent md:left-5"/>{experience.map((item, i) => <Reveal key={`${item.company}-${item.role}`} delay={i * .04}><article className="relative mb-10 pl-12 md:pl-16"><div className={`absolute left-0 top-1.5 h-7 w-7 rounded-full border-4 border-[#080d17] ${item.tone === "cyan" ? "bg-cyan-300" : item.tone === "amber" ? "bg-amber-300" : item.tone === "violet" ? "bg-violet-300" : "bg-slate-500"}`}/><div className="glass rounded-2xl p-6 md:p-8"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-start"><div><div className="eyebrow">{item.date}</div><h3 className="display mt-3 text-2xl font-semibold text-white md:text-3xl">{item.role}</h3><div className="mt-1 text-base text-cyan-200">{item.company}</div></div><span className="rounded-full border border-white/10 px-3 py-1 mono text-[10px] uppercase tracking-[.12em] text-slate-500">Role {String(i + 1).padStart(2, "0")}</span></div><ul className="mt-7 grid gap-3 md:grid-cols-2">{item.bullets.map(b => <li key={b} className="flex gap-3 text-sm leading-6 text-slate-400"><Check className="mt-1 h-4 w-4 shrink-0 text-cyan-300"/>{b}</li>)}</ul>{i === 0 && <div className="mt-7 rounded-xl border border-cyan-300/15 bg-cyan-300/[.04] p-4 mono text-[10px] uppercase tracking-[.12em] text-slate-400">GoDaddy DNS <ChevronRight className="mx-1 inline h-3 w-3 text-cyan-300"/> Instra WAF <ChevronRight className="mx-1 inline h-3 w-3 text-cyan-300"/> AWS EC2 <ChevronRight className="mx-1 inline h-3 w-3 text-cyan-300"/> Application</div>}</div></article></Reveal>)}</div></div></section>

      <InfrastructureSection backgroundImage={asset.architecture} backgroundOffset={architectureOffset}/>

      <section id="skills" className="py-28 md:py-36"><div className="container"><Reveal><SectionHeading kicker="05 / Skills matrix" title="The working vocabulary." copy={`${allSkills.length} technologies and practices listed in the resume, grouped by the systems they support.`}/></Reveal><div className="grid gap-4 lg:grid-cols-2">{skillGroups.map(([group, skills], i) => <Reveal key={group} delay={i * .04}><div className="glass animate-shimmer rounded-2xl p-6"><div className="flex items-center justify-between border-b border-white/10 pb-4"><div><div className="mono text-[9px] uppercase tracking-[.18em] text-slate-600">matrix / {String(i + 1).padStart(2, "0")}</div><h3 className="display mt-1 text-xl font-semibold text-white">{group}</h3></div><span className="mono text-[10px] text-cyan-300">{String(skills.length).padStart(2, "0")} nodes</span></div><div className="mt-5 flex flex-wrap gap-2">{skills.map(skill => <div key={skill} className="group rounded-lg border border-white/10 bg-white/[.025] px-3 py-2 transition hover:border-cyan-300/40 hover:bg-cyan-300/[.06]"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/70 transition group-hover:bg-cyan-300"/><span className="text-sm text-slate-300">{skill}</span></div>)}</div></div></Reveal>)}</div></div></section>

      <section id="security" className="border-y border-white/8 bg-[#0b1220] py-28"><div className="container grid gap-12 lg:grid-cols-[1fr_.85fr] lg:items-center"><Reveal><div className="eyebrow">06 / Security posture</div><h2 className="display mt-4 max-w-xl text-4xl font-semibold tracking-[-.04em] text-white md:text-6xl">Security is part of the infrastructure.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">The resume reflects practical experience across WAF, firewalls, VPN, DNS, endpoint protection and cloud security. This section keeps the claim grounded: secure connectivity and managed controls as part of reliable operations.</p><div className="mt-8 flex flex-wrap gap-2">{["WAF", "Firewall", "VPN", "CloudFlare", "SonicWall", "Sophos", "Kaspersky", "Security Compliance", "Cloud Security", "DNS"].map(tag => <span key={tag} className="rounded-full border border-amber-300/20 bg-amber-300/[.05] px-3 py-2 mono text-[10px] uppercase tracking-[.08em] text-amber-100">{tag}</span>)}</div></Reveal><Reveal delay={.1}><div className="relative mx-auto flex aspect-square max-w-[420px] items-center justify-center rounded-full border border-cyan-300/15 bg-[radial-gradient(circle,rgba(93,228,255,.13),transparent_58%)]"><div className="absolute inset-10 rounded-full border border-dashed border-cyan-300/25"/><div className="absolute inset-20 rounded-full border border-white/10"/><div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-cyan-300/40 bg-[#0b1626] text-cyan-300 shadow-[0_0_60px_rgba(93,228,255,.16)]"><LockKeyhole className="h-10 w-10"/></div>{["WAF", "VPN", "DNS", "Firewall"].map((item, i) => <div key={item} className={`absolute rounded-lg border border-white/10 bg-[#121d2f] px-3 py-2 mono text-[10px] text-slate-300 ${["top-8 left-1/2 -translate-x-1/2", "right-3 top-1/2 -translate-y-1/2", "bottom-8 left-1/2 -translate-x-1/2", "left-3 top-1/2 -translate-y-1/2"][i]}`}>{item}</div>)}</div></Reveal></div></section>

      <section id="education" className="py-28 md:py-36"><div className="container grid gap-12 lg:grid-cols-[.85fr_1.15fr]"><Reveal><SectionHeading kicker="07 / Education" title="A foundation in information technology."/><div className="glass rounded-2xl p-6"><div className="eyebrow">Certification</div><div className="mt-5 flex items-start gap-4"><div className="rounded-xl bg-amber-300/10 p-3 text-amber-200"><Cloud className="h-6 w-6"/></div><div><h3 className="display text-xl font-semibold text-white">Oracle Cloud Infrastructure</h3><p className="mt-1 text-sm text-slate-400">Certified Foundations Associate · 2025</p></div></div></div></Reveal><Reveal delay={.1}><div className="space-y-4"><div className="glass rounded-2xl p-7"><div className="flex items-start justify-between gap-4"><div><div className="eyebrow">2026</div><h3 className="display mt-3 text-2xl font-semibold text-white">M.Sc. IT</h3><p className="mt-2 text-slate-400">Chandrabhan Sharma College, Mumbai</p></div><span className="mono text-sm text-cyan-300">CGPI 9.45</span></div></div><div className="glass rounded-2xl p-7"><div className="flex items-start justify-between gap-4"><div><div className="eyebrow">2023</div><h3 className="display mt-3 text-2xl font-semibold text-white">B.Sc. IT</h3><p className="mt-2 text-slate-400">S.M. Shetty College</p></div><span className="mono text-sm text-cyan-300">CGPI 6.95</span></div></div></div></Reveal></div></section>

      <section className="border-y border-white/8 bg-[#0b1220] py-20"><div className="container grid gap-5 md:grid-cols-2"><Reveal><div className="glass rounded-2xl p-6"><div className="eyebrow">Languages</div><div className="mt-5 grid gap-3 sm:grid-cols-2">{[["English", "Professional Working"], ["Hindi", "Native / Bilingual"], ["Tulu", "Native / Bilingual"], ["Marathi", "Elementary"]].map(([name, level]) => <div key={name} className="flex items-center justify-between border-b border-white/8 pb-3"><span className="text-sm text-slate-200">{name}</span><span className="mono text-[10px] text-slate-500">{level}</span></div>)}</div></div></Reveal><Reveal delay={.08}><div className="glass rounded-2xl p-6"><div className="eyebrow">Interests</div><div className="mt-5 flex flex-wrap gap-2">{["Cricket", "Gaming"].map(item => <span key={item} className="rounded-md border border-white/10 bg-white/[.03] px-3 py-2 mono text-[10px] uppercase tracking-[.12em] text-slate-300">{item}</span>)}</div><p className="mt-7 text-sm leading-6 text-slate-500">A small personal layer from the resume, kept separate from the technical profile.</p></div></Reveal></div></section>

      <section className="border-y border-white/8 bg-[#0b1220] py-24"><div className="container grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center"><Reveal><div className="eyebrow">Beyond infrastructure</div><h2 className="display mt-4 text-4xl font-semibold tracking-[-.04em] text-white md:text-5xl">Reliable systems need clear interfaces.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">Alongside infrastructure work, I also contribute to front-end development with HTML, CSS and JavaScript for a fintech application.</p><div className="mt-6 flex gap-2">{["HTML", "CSS", "JavaScript"].map(x => <span key={x} className="rounded-md border border-white/10 px-3 py-2 mono text-[10px] text-cyan-200">{x}</span>)}</div></Reveal><Reveal delay={.1}><div className="glass overflow-hidden rounded-2xl"><div className="flex items-center gap-2 border-b border-white/10 px-4 py-3"><span className="h-2 w-2 rounded-full bg-red-300/70"/><span className="h-2 w-2 rounded-full bg-amber-300/70"/><span className="h-2 w-2 rounded-full bg-emerald-300/70"/><span className="ml-auto mono text-[9px] text-slate-500">app-preview.local</span></div><div className="h-48 bg-[radial-gradient(circle_at_70%_30%,rgba(93,228,255,.22),transparent_28%),linear-gradient(135deg,#14263a,#0d1625)] p-6"><div className="h-3 w-24 rounded bg-cyan-300/70"/><div className="mt-5 h-2 w-44 rounded bg-white/20"/><div className="mt-2 h-2 w-32 rounded bg-white/10"/><div className="mt-7 flex gap-3"><div className="h-16 w-20 rounded-lg border border-white/10 bg-white/5"/><div className="h-16 w-20 rounded-lg border border-white/10 bg-white/5"/><div className="h-16 w-20 rounded-lg border border-white/10 bg-white/5"/></div></div></div></Reveal></div></section>

      <section className="py-24"><div className="container"><Reveal><div className="glass relative overflow-hidden rounded-3xl p-8 md:p-14"><div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${asset.texture})` }}/><div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-end"><div><div className="eyebrow">Resume / detailed record</div><h2 className="display mt-4 max-w-2xl text-4xl font-semibold tracking-[-.04em] text-white md:text-6xl">Want to know more about my experience?</h2><p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">Explore the resume for a detailed overview of professional experience, technical skills and education.</p></div><div className="flex flex-wrap gap-3"><a href={asset.resume} download className="rounded-lg bg-cyan-300 px-5 py-3.5 display text-sm font-semibold text-[#081018] transition hover:bg-cyan-200">Download Resume <Download className="ml-2 inline h-4 w-4"/></a><button onClick={() => scrollTo("contact")} className="rounded-lg border border-white/15 px-5 py-3.5 display text-sm font-semibold text-white">Contact Me</button></div></div></div></Reveal></div></section>

      <section id="contact" className="border-t border-white/8 bg-[#0b1220] py-28"><div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><Reveal><div className="eyebrow">08 / Contact</div><h2 className="display mt-4 max-w-xl text-5xl font-semibold tracking-[-.05em] text-white md:text-7xl">Let's build something reliable.</h2><p className="mt-6 max-w-md text-lg leading-8 text-slate-400">Open to conversations around DevOps, cloud infrastructure, system administration and technology.</p><div className="mt-10 space-y-4"><button onClick={copyEmail} className="flex items-center gap-3 text-left text-slate-300 transition hover:text-cyan-300"><Mail className="h-5 w-5 text-cyan-300"/>{copied ? "Copied" : email}<Copy className="h-3.5 w-3.5 text-slate-500"/></button><div className="flex items-center gap-3 text-slate-400"><Globe2 className="h-5 w-5 text-cyan-300"/>Mumbai, India</div></div></Reveal><Reveal delay={.1}><form onSubmit={e => { e.preventDefault(); toast.success("Thanks — this form is ready to connect to your preferred email workflow."); }} className="glass rounded-2xl p-6 md:p-8"><div className="grid gap-5 md:grid-cols-2"><label className="space-y-2"><span className="mono text-[10px] uppercase tracking-[.14em] text-slate-500">Name</span><input required className="w-full rounded-lg border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50" placeholder="Your name"/></label><label className="space-y-2"><span className="mono text-[10px] uppercase tracking-[.14em] text-slate-500">Email</span><input required type="email" className="w-full rounded-lg border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50" placeholder="you@company.com"/></label></div><label className="mt-5 block space-y-2"><span className="mono text-[10px] uppercase tracking-[.14em] text-slate-500">Subject</span><input required className="w-full rounded-lg border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50" placeholder="A reliable opportunity"/></label><label className="mt-5 block space-y-2"><span className="mono text-[10px] uppercase tracking-[.14em] text-slate-500">Message</span><textarea required rows={5} className="w-full resize-none rounded-lg border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50" placeholder="Tell me a little about the systems or team..."/></label><button type="submit" className="mt-6 rounded-lg bg-cyan-300 px-5 py-3.5 display text-sm font-semibold text-[#081018] transition hover:bg-cyan-200 active:scale-[.98]">Send Message <ArrowUpRight className="ml-2 inline h-4 w-4"/></button></form></Reveal></div></section>
    </main>

    <footer className="border-t border-white/8 bg-[#080d17] py-10"><div className="container flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><div className="display text-sm font-bold tracking-[.18em] text-white">SOORAJ POOJARY</div><div className="mt-1 mono text-[9px] tracking-[.18em] text-cyan-300">CLOUD · INFRASTRUCTURE · SECURITY · AUTOMATION</div></div><div className="flex items-center gap-5 mono text-[10px] uppercase tracking-[.12em] text-slate-500"><a href="#home" className="hover:text-cyan-300">Home</a><a href="#experience" className="hover:text-cyan-300">Experience</a><a href="#skills" className="hover:text-cyan-300">Skills</a><a href="#contact" className="hover:text-cyan-300">Contact</a></div><div className="mono text-[10px] text-slate-600">© 2026 · Built for reliable systems</div></div></footer>
  </div>;
}
