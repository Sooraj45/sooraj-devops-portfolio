import { useEffect, useState } from "react";

export function CursorEyes() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => { const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches; if (reduceMotion) return; let frame = 0; const move = (event: PointerEvent) => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => setOffset({ x: (event.clientX / window.innerWidth - .5) * 8, y: (event.clientY / window.innerHeight - .5) * 8 })); }; window.addEventListener("pointermove", move, { passive: true }); return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); }; }, []);
  return <div className="cursor-eyes" aria-hidden="true"><span className="cursor-eyes-label">watching the stack</span><div className="cursor-eyes-row">{[0, 1, 2].map(index => <span className={`cursor-eye eye-${index + 1}`} key={index}><span className="cursor-pupil" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}/></span>)}</div></div>;
}
