import { motion } from "framer-motion";

export function ConnectionPath({ active }: { active: boolean }) {
  return (
    <div className="relative ml-[21.5px] h-6 w-px">
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 2 24" preserveAspectRatio="none" aria-hidden="true">
        <motion.line
          x1="1" y1="0" x2="1" y2="24"
          stroke={active ? "#5de4ff" : "rgba(93,228,255,.32)"}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .5, ease: "easeInOut" }}
          style={{ transition: "stroke .3s ease" }}
        />
      </svg>
      <span className={`animate-route absolute left-1/2 top-0 h-2 w-[3px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_#5de4ff] transition-opacity duration-300 ${active ? "opacity-100" : "opacity-60"}`} />
    </div>
  );
}
