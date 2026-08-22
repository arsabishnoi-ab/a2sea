"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { siteConfig } from "@/data/siteConfig";
import { allProjects } from "@/data/projects";

export function Proof() {
  return (
    <section className="border-y border-[var(--line)] bg-white" aria-label="Credibility">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <p className="max-w-2xl text-xl leading-snug tracking-[-0.03em] text-[var(--ink)] md:text-2xl">
            We build digital experiences that help businesses get found, trusted, and chosen.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[var(--line)] pt-10">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label}>
              <p className="stat-number display text-[clamp(1.8rem,4vw,3rem)] text-[var(--ink)]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--muted-2)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--line)] py-8" aria-label="Businesses we have built for">
        <p className="mb-6 text-center text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--muted-2)]">
          Trusted by businesses across India
        </p>
        <Marquee duration={42}>
          {allProjects.map((p) => (
            <span key={p.slug} className="flex items-center">
              <span className="text-lg font-medium tracking-[-0.03em] text-[var(--ink)]/30 md:text-2xl">
                {p.name}
              </span>
              <span className="mx-8 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--line-strong)] md:mx-12" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
