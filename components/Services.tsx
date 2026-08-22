"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/data/businessVerticals";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-white px-5 py-24 md:px-8 md:py-32"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <Reveal>
            <p className="eyebrow">Services</p>
            <h2
              id="services-heading"
              className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)] text-[var(--ink)]"
            >
              What we build.
            </h2>
          </Reveal>
          <Reveal delay={0.08} y={16}>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)] md:ml-auto">
              From the website to Google, reviews, and custom software — one studio, end to end.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-[var(--line)]">
          {services.map((service, i) => (
            <li key={service.slug}>
              <Link
                href="/#contact"
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 border-b border-[var(--line)] py-7 transition-colors duration-300 hover:bg-[var(--paper-2)] md:grid-cols-[4.5rem_minmax(0,280px)_1fr_auto] md:gap-x-8 md:px-3 md:py-8"
              >
                <span className="text-xs tabular-nums text-[var(--muted-2)] transition-transform duration-300 group-hover:-translate-y-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)] md:text-xl">
                  {service.title}
                  {service.featured ? (
                    <span className="ml-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
                      Core
                    </span>
                  ) : null}
                </h3>
                <p className="col-span-3 mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)] md:col-span-1 md:mt-0">
                  {service.summary}
                </p>
                <span
                  className="col-start-3 row-start-1 mt-1 text-[var(--muted-2)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)] md:col-start-4 md:row-start-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
