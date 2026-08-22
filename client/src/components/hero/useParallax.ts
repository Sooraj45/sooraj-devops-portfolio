import { useEffect, useState } from "react";

export interface ParallaxPos { x: number; y: number }

export function useParallax(enabled: boolean): ParallaxPos {
  const [pos, setPos] = useState<ParallaxPos>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPos({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("mousemove", onMove); };
  }, [enabled]);

  return pos;
}
