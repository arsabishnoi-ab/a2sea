"use client";

import { motion, useReducedMotion } from "framer-motion";

type TextRevealProps = {
  /** Each string is rendered as its own masked line */
  lines: React.ReactNode[];
  className?: string;
  /** Per-line stagger in seconds */
  stagger?: number;
  delay?: number;
  /** Animate on scroll into view instead of on mount */
  onView?: boolean;
};

const EASE = [0.33, 1, 0.68, 1] as const;

export function TextReveal({
  lines,
  className,
  stagger = 0.08,
  delay = 0,
  onView = false,
}: TextRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </span>
    );
  }

  const animateProps = onView
    ? { whileInView: { y: "0%" }, viewport: { once: true, amount: 0.4 as const } }
    : { animate: { y: "0%" } };

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%" }}
            {...animateProps}
            transition={{ duration: 0.65, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
