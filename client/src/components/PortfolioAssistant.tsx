import { Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "assistant" | "user"; text: string };
const quickQuestions = ["What are Sooraj's skills?", "Show me his experience", "How can I contact him?"];

function answerQuestion(question: string) {
  const q = question.toLowerCase();
  if (/skill|technology|tech|aws|cloud/.test(q)) return "Sooraj works across AWS EC2 and S3, Oracle Cloud, Linux, Hyper-V, Microsoft 365, Active Directory, networking, VPN, WAF, backup, monitoring, and front-end development.";
  if (/experience|work|job|role|company/.test(q)) return "Sooraj is a DevOps Engineer with experience in cloud deployment, systems administration, virtualization, infrastructure security, backups, monitoring, and application delivery.";
  if (/project|portfolio|built/.test(q)) return "His public work includes this DevOps portfolio, the IDSSPL official website, and a Django pharmacy management system. Source and live links are in the Projects section.";
  if (/contact|email|hire|resume|reach/.test(q)) return "You can reach Sooraj at soorajpoojary45@gmail.com. Use the Contact section to copy the address or request his latest resume.";
  if (/education|degree|cert/.test(q)) return "Sooraj holds an M.Sc. IT and B.Sc. IT, and is an Oracle Cloud Infrastructure Certified Foundations Associate.";
  if (/location|where/.test(q)) return "Sooraj is based in Mumbai, India.";
  return "I can help with Sooraj's skills, experience, projects, education, resume, or contact details. Try asking one of those topics.";
}

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: "Hi! I'm Sooraj's free portfolio assistant. Ask me about his skills, experience, projects, or contact details." }]);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const followPointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setEyeOffset({
          x: (event.clientX / window.innerWidth - 0.5) * 3,
          y: (event.clientY / window.innerHeight - 0.5) * 3,
        });
      });
    };

    window.addEventListener("pointermove", followPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", followPointer);
    };
  }, []);
  const ask = (question: string) => { const value = question.trim(); if (!value) return; setMessages(items => [...items, { role: "user", text: value }, { role: "assistant", text: answerQuestion(value) }]); setInput(""); };
  const submit = (event: FormEvent) => { event.preventDefault(); ask(input); };

  return <div className="assistant-shell">{open && <section className="assistant-panel glass" aria-label="Portfolio assistant" aria-live="polite"><header className="assistant-header"><div className="assistant-title"><img src={`${import.meta.env.BASE_URL}chatbot-robot-v2.png`} alt="" aria-hidden="true"/><div><div className="flex items-center gap-2 text-cyan-300"><Sparkles className="h-4 w-4"/><span className="mono text-[10px] uppercase tracking-[.16em]">Sooraj AI assistant</span></div><p className="mt-1 text-xs text-slate-500">Free · no API key · instant answers</p></div></div><button onClick={() => setOpen(false)} aria-label="Close assistant" className="assistant-icon-button"><X className="h-4 w-4"/></button></header><div className="assistant-messages">{messages.map((message, index) => <div key={index} className={`assistant-message ${message.role}`}>{message.text}</div>)}<div ref={endRef}/></div><div className="assistant-quick">{quickQuestions.map(question => <button key={question} onClick={() => ask(question)}>{question}</button>)}</div><form onSubmit={submit} className="assistant-form"><input value={input} onChange={event => setInput(event.target.value)} aria-label="Ask the portfolio assistant" placeholder="Ask about Sooraj..."/><button type="submit" aria-label="Send question"><Send className="h-4 w-4"/></button></form></section>}<button className="assistant-launcher" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}><span className="assistant-avatar" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}chatbot-robot-v2.png`} alt=""/><i className="assistant-avatar-pupil assistant-avatar-pupil-left" style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}/><i className="assistant-avatar-pupil assistant-avatar-pupil-right" style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}/></span><span>Ask Sooraj AI</span></button></div>;
}
