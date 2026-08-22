import { motion } from "framer-motion";

const lines = ["Building", "secure", "infrastructure", "that performs."];

export function HeroHeadline({ start }: { start: boolean }) {
  return (
    <h1 className="display text-5xl font-extrabold leading-[.96] tracking-[-.04em] text-white sm:text-7xl lg:text-[5.4rem] xl:text-[6rem]">
      {lines.map((line, i) => {
        const isLast = i === lines.length - 1;
        return (
          <motion.span
            key={line}
            className={`block ${isLast ? "text-cyan-300" : ""}`}
            style={isLast ? { textShadow: "0 0 42px rgba(93,228,255,.38)" } : undefined}
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={start ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{ duration: .82, delay: .12 * i, ease: [.16, 1, .3, 1] }}
          >
            {line}
          </motion.span>
        );
      })}
    </h1>
  );
}
