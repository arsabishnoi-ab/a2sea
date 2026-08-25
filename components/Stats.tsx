"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

const stats = [
  { prefix: "", to: 17, suffix: "+", label: "Live projects", sub: "Real businesses online" },
  { prefix: "", to: 6, suffix: "", label: "Sectors served", sub: "Law · Hotels · Furniture · Groups" },
  { prefix: "", to: 100, suffix: "%", label: "Custom built", sub: "No templates, ever" },
  { prefix: "<", to: 4, suffix: " wks", label: "Avg. delivery", sub: "From brief to live" },
] as const;

export function Stats() {
  return (
    <section className="bg-[var(--paper)] px-5 py-20 md:px-8 md:py-28" aria-label="By the numbers">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-0 md:divide-x md:divide-[var(--line)]">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} y={20}>
              <div className="md:px-10 md:first:pl-0 md:last:pr-0">
                <p className="display text-[clamp(2.8rem,6vw,4.2rem)] text-[var(--ink)]">
                  <CountUp prefix={s.prefix} to={s.to} suffix={s.suffix} duration={1300 + i * 120} />
                </p>
                <p className="mt-3 text-sm font-semibold text-[var(--ink-soft)]">{s.label}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
