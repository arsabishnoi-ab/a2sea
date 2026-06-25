"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { siteConfig } from "@/data/siteConfig";

const EASE = [0.22, 1, 0.36, 1] as const;

const differentiators = [
  {
    k: "01",
    claim: "No templates. Ever.",
    detail: "Every site is built from scratch around how your business operates and how your customers decide.",
  },
  {
    k: "02",
    claim: "Ships in weeks.",
    detail: "No six-month timelines. Most focused builds go live in two to four weeks — and improve after launch.",
  },
  {
    k: "03",
    claim: "Owned end-to-end.",
    detail: "Website, Google profile, booking, WhatsApp, reviews — one studio builds and connects every piece.",
  },
];

export function About() {
  const reduced = useReducedMotion() ?? false;
  const { brandName, location } = siteConfig;

  return (
    <section id="about" className="border-y border-[var(--line)] bg-[var(--ink)] px-5 py-24 text-[var(--paper)] md:px-8 md:py-36" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-[var(--accent-gold)]">Why a2sea</p>
        </Reveal>

        {/* Brand lockup — transparent, so it hugs its own content with no extra space */}
        <Reveal delay={0.08} y={20}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/a2sea-logo.png"
            alt="a2sea — Built to Scale"
            width={765}
            height={241}
            className="mt-8 h-auto w-full max-w-[24rem]"
          />
        </Reveal>

        {/* Oversized pull quote */}
        <h2 id="about-heading" className="display mt-8 max-w-4xl text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.08] text-[var(--paper)]">
          <TextReveal
            onView
            stagger={0.09}
            lines={[
              "We don't just build websites.",
              <span key="2" className="text-[var(--paper)]/55">We build the system that makes</span>,
              <span key="3" className="text-[var(--paper)]/55">your business <em className="italic text-[var(--accent)]">findable, trusted,</em></span>,
              <span key="4" className="text-[var(--paper)]/55">and <em className="italic text-[var(--accent)]">chosen.</em></span>,
            ]}
          />
        </h2>

        <Reveal delay={0.15} y={20}>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--paper)]/60">
            <span className="text-[var(--paper)]">{brandName}</span> is a web studio in {location.area},{" "}
            {location.city}. We work with hotels, cafés, restaurants, retail, and ecommerce — the
            businesses whose revenue depends on being found and chosen online.
          </p>
        </Reveal>

        {/* Differentiators */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.k}
              className="bg-[var(--ink)] p-8"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <span className="text-sm tabular-nums text-[var(--accent)]">{d.k}</span>
              <h3 className="display mt-6 text-2xl text-[var(--paper)]">{d.claim}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--paper)]/55">{d.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
