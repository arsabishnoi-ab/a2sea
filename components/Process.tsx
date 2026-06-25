"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    num: "01",
    title: "Discovery call",
    body: "We understand your business, your customers, and the outcome you need. Clear goals, no assumptions. Takes 30 minutes.",
  },
  {
    num: "02",
    title: "Design & build",
    body: "Everything is built from scratch around your brand and how you actually sell. You review and shape it at every stage.",
  },
  {
    num: "03",
    title: "Launch & grow",
    body: "We go live, then keep improving based on how real customers interact with your site, profiles, and booking flows.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="bg-[var(--paper)] px-5 py-24 md:px-8 md:py-32" aria-labelledby="process-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">How we work</p>
          <h2 id="process-heading" className="display mt-4 max-w-2xl text-[clamp(2.2rem,5vw,3.6rem)] text-[var(--ink)]">
            From brief to live — no detours.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 pl-10 md:pl-16">
          {/* Track */}
          <div className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-[var(--line)] md:left-[15px]" aria-hidden />
          {/* Scroll-linked progress fill */}
          <motion.div
            className="absolute left-[11px] top-2 w-px origin-top bg-[var(--accent)] md:left-[15px]"
            style={{ height: reduced ? "100%" : lineHeight }}
            aria-hidden
          />

          <div className="flex flex-col gap-14">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.06} y={20}>
                <div className="relative">
                  {/* Node */}
                  <span className="absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--paper)] md:-left-16">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  </span>
                  <div className="flex flex-col gap-3">
                    <span className="text-sm tabular-nums text-[var(--muted-2)]">{s.num}</span>
                    <h3 className="display text-2xl text-[var(--ink)] md:text-3xl">{s.title}</h3>
                    <p className="max-w-md text-base leading-relaxed text-[var(--muted)]">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
