import { Send, Sparkles, X } from "lucide-react";
import {
  FormEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type Message = { role: "assistant" | "user"; text: string };
type Position = { right: number; bottom: number };
type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  grabFromRight: number;
  grabFromBottom: number;
  moved: boolean;
};

const quickQuestions = ["What are Sooraj's skills?", "Show me his experience", "How can I contact him?"];
const viewportGap = 8;

function greetingFor(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatLiveTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

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
  const [position, setPosition] = useState<Position | null>(null);
  const [dragging, setDragging] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [messages, setMessages] = useState<Message[]>([]);
  const shellRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const ignoreClickRef = useRef(false);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  const clampPosition = () => {
    setPosition(current => {
      const shell = shellRef.current;
      if (!current || !shell) return current;
      const rect = shell.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      const next = {
        right: Math.min(Math.max(viewportGap, current.right), Math.max(viewportGap, viewportWidth - rect.width - viewportGap)),
        bottom: Math.min(Math.max(viewportGap, current.bottom), Math.max(viewportGap, viewportHeight - rect.height - viewportGap)),
      };
      return next.right === current.right && next.bottom === current.bottom ? current : next;
    });
  };

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(clampPosition);
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    window.addEventListener("resize", clampPosition);
    return () => window.removeEventListener("resize", clampPosition);
  }, []);

  const beginDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!event.isPrimary || event.button !== 0 || !shellRef.current) return;
    const rect = shellRef.current.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      grabFromRight: rect.right - event.clientX,
      grabFromBottom: rect.bottom - event.clientY,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    const shell = shellRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !shell) return;

    drag.moved = drag.moved || Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 4;
    if (!drag.moved) return;

    event.preventDefault();
    setDragging(true);
    const rect = shell.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const right = viewportWidth - event.clientX - drag.grabFromRight;
    const bottom = viewportHeight - event.clientY - drag.grabFromBottom;
    setPosition({
      right: Math.min(Math.max(viewportGap, right), Math.max(viewportGap, viewportWidth - rect.width - viewportGap)),
      bottom: Math.min(Math.max(viewportGap, bottom), Math.max(viewportGap, viewportHeight - rect.height - viewportGap)),
    });
  };

  const endDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    ignoreClickRef.current = drag.moved;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const toggleAssistant = () => {
    if (ignoreClickRef.current) {
      ignoreClickRef.current = false;
      return;
    }
    setOpen(value => !value);
  };

  const ask = (question: string) => { const value = question.trim(); if (!value) return; setMessages(items => [...items, { role: "user", text: value }, { role: "assistant", text: answerQuestion(value) }]); setInput(""); };
  const submit = (event: FormEvent) => { event.preventDefault(); ask(input); };

  return <div ref={shellRef} className="assistant-shell" style={position ?? undefined}>{open && <section className="assistant-panel glass" aria-label="Portfolio assistant" aria-live="polite"><header className="assistant-header"><div className="assistant-title"><img src={`${import.meta.env.BASE_URL}chatbot-robot-v2.png`} alt="" aria-hidden="true"/><div><div className="flex items-center gap-2 text-cyan-300"><Sparkles className="h-4 w-4"/><span className="mono text-[10px] uppercase tracking-[.16em]">Sooraj AI assistant</span></div><p className="mt-1 text-xs text-slate-500">Instant answers</p></div></div><button onClick={() => setOpen(false)} aria-label="Close assistant" className="assistant-icon-button"><X className="h-4 w-4"/></button></header><div className="assistant-messages"><div className="assistant-live-card"><strong>{greetingFor(now)}</strong><p>Welcome to Sooraj's portfolio. How can I help?</p><time dateTime={now.toISOString()}><span aria-hidden="true"/>{formatLiveTime(now)}</time></div>{messages.map((message, index) => <div key={index} className={`assistant-message ${message.role}`}>{message.text}</div>)}<div ref={endRef}/></div><div className="assistant-quick">{quickQuestions.map(question => <button key={question} onClick={() => ask(question)}>{question}</button>)}</div><form onSubmit={submit} className="assistant-form"><input value={input} onChange={event => setInput(event.target.value)} aria-label="Ask the portfolio assistant" placeholder="Ask about Sooraj..."/><button type="submit" aria-label="Send question"><Send className="h-4 w-4"/></button></form></section>}{!open && <aside className="assistant-live-card assistant-live-teaser" aria-label="Live portfolio assistant greeting"><strong>{greetingFor(now)}</strong><p>Welcome to Sooraj's portfolio. How can I help?</p><time dateTime={now.toISOString()}><span aria-hidden="true"/>{formatLiveTime(now)}</time></aside>}<button className={`assistant-launcher${dragging ? " is-dragging" : ""}`} onClick={toggleAssistant} onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} aria-expanded={open} aria-label={`${open ? "Close" : "Open"} portfolio assistant; drag to move`} title="Drag to move • Click to chat"><span className="assistant-avatar" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}chatbot-robot-v2.png`} alt="" draggable={false}/><span className="assistant-eyes-blink"><i/><i/></span></span><span>Ask Sooraj AI</span></button></div>;
}
