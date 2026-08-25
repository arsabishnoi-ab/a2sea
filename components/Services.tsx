"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { services, type Service } from "@/data/businessVerticals";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<Service["icon"], React.ReactNode> = {
  globe:  <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/></>,
  hotel:  <><path d="M3 21h18M5 21V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4"/></>,
  coffee: <><path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M17 9h2a2 2 0 0 1 0 5h-2"/></>,
  cart:   <><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M3 4h2l2.2 11.2a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.8L21 7H6"/></>,
  store:  <><path d="M4 9V5h16v4M5 9v11h14V9M4 9h16"/><path d="M9 20v-5h6v5"/></>,
  map:    <><path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10Z"/><circle cx="12" cy="11" r="2.2"/></>,
  stars:  <path d="M12 3.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.2l5.4-.8L12 3.5Z"/>,
  code:   <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13 4l-2 16"/>,
};

function SvgIcon({ name, size = 20 }: { name: Service["icon"]; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[name]}
    </svg>
  );
}

export function Services() {
  const reduced = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 250, damping: 28, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 250, damping: 28, mass: 0.5 });

  function onMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  return (
    <section id="services" className="bg-[var(--paper)] px-5 py-24 md:px-8 md:py-32" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <Reveal>
            <p className="eyebrow">Services</p>
            <h2 id="services-heading" className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)] text-[var(--ink)]">
              Everything your<br />business needs online.
            </h2>
          </Reveal>
          <Reveal delay={0.1} y={20}>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)] md:ml-auto">
              From showing up on Google Maps to a site that converts — we build and connect
              every layer of your digital presence.
            </p>
          </Reveal>
        </div>

        {/* ── Desktop: interactive list with cursor-follow preview ── */}
        <div
          ref={containerRef}
          onMouseMove={onMove}
          className="relative mt-16 hidden md:block"
        >
          <div className="border-t border-[var(--line)]">
            {services.map((s, i) => (
              <motion.a
                key={s.slug}
                href="#contact"
                className="group relative flex items-center justify-between gap-8 border-b border-[var(--line)] py-7"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: EASE }}
              >
                <div className="flex items-baseline gap-5">
                  <span className="w-8 text-sm tabular-nums text-[var(--muted-2)]">0{i + 1}</span>
                  <motion.span
                    className="display text-[clamp(1.6rem,3vw,2.6rem)] text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--accent)]"
                    animate={!reduced && active !== null && active !== i ? { opacity: 0.35 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {s.title}
                  </motion.span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="max-w-xs text-right text-sm text-[var(--muted)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {s.tagline}
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--ink)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--paper)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Cursor-following preview */}
          <AnimatePresence>
            {active !== null && !reduced && (
              <motion.div
                className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
                style={{ x: sx, y: sy }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <div className="-translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--line)] bg-[var(--ink)] p-6 text-[var(--paper)] shadow-[var(--shadow-lg)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--paper)]">
                    <SvgIcon name={services[active].icon} size={20} />
                  </span>
                  <p className="mt-4 max-w-[200px] text-sm leading-relaxed text-[var(--paper)]/80">
                    {services[active].summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {services[active].points.slice(0, 3).map((p) => (
                      <span key={p} className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-[var(--paper)]/70">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Mobile: clean cards ── */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:hidden">
          {services.map((s) => (
            <a key={s.slug} href="#contact" className="flex flex-col rounded-2xl border border-[var(--line)] bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-wash)] text-[var(--accent)]">
                <SvgIcon name={s.icon} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-[var(--ink)]">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{s.summary}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
