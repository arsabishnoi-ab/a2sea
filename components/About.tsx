"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { siteConfig } from "@/data/siteConfig";

const differentiators = [
  {
    k: "01",
    claim: "No templates. Ever.",
    detail:
      "Every site is built from scratch around how your business operates and how your customers decide.",
  },
  {
    k: "02",
    claim: "Ships in weeks.",
    detail:
      "No six-month timelines. Most focused builds go live in two to four weeks — and improve after launch.",
  },
  {
    k: "03",
    claim: "Owned end-to-end.",
    detail:
      "Website, Google profile, booking, WhatsApp, reviews — one studio builds and connects every piece.",
  },
];

export function About() {
  const { brandName, location } = siteConfig;

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-[var(--line)] bg-white px-5 py-24 md:px-8 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">About</p>
        </Reveal>

        <h2
          id="about-heading"
          className="display mt-6 max-w-4xl text-[clamp(2rem,5vw,3.8rem)] text-[var(--ink)]"
        >
          <TextReveal
            onView
            stagger={0.08}
            lines={[
              "We don't just build websites.",
              <span key="2" className="text-[var(--muted)]">
                We build the system that makes your business findable, trusted, and chosen.
              </span>,
            ]}
          />
        </h2>

        <Reveal delay={0.1} y={16}>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--muted)]">
            <span className="text-[var(--ink)]">{brandName}</span> is a web studio in {location.city}. We
            work with hotels, cafés, restaurants, retail, and ecommerce — the businesses whose revenue
            depends on being found and chosen online.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-[var(--line)] pt-12 md:grid-cols-3">
          {differentiators.map((d, i) => (
            <Reveal key={d.k} delay={i * 0.06} y={16}>
              <p className="text-xs tabular-nums text-[var(--muted-2)]">{d.k}</p>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">
                {d.claim}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{d.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
