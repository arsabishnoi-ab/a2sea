"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const industries = [
  { name: "Hotels & Hospitality", value: "Direct bookings, guest management, OTA-beating rates" },
  { name: "Cafés & Restaurants", value: "Digital menus, table bookings, online ordering" },
  { name: "Ecommerce & Retail", value: "Product stores, fast checkout, inventory" },
  { name: "Local Shops & Brands", value: "Credibility, discoverability, brand identity" },
  { name: "Google Business & Maps", value: "Local SEO, Maps presence, review management" },
  { name: "Custom Software", value: "Dashboards, tools, automations, integrations" },
];

export function Industries() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-[var(--paper)] px-5 py-24 md:px-8 md:py-32" aria-labelledby="industries-heading">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <Reveal>
            <p className="eyebrow">Industries</p>
            <h2 id="industries-heading" className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)] text-[var(--ink)]">
              Who we build for.
            </h2>
          </Reveal>
          <Reveal delay={0.1} y={20}>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)] md:ml-auto">
              Every business type has unique needs. We&apos;ve built for all of them.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              className="group bg-[var(--paper)] p-8 transition-colors duration-300 hover:bg-white"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: EASE }}
            >
              <span className="text-sm tabular-nums text-[var(--muted-2)]">0{i + 1}</span>
              <h3 className="mt-5 text-lg font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                {ind.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{ind.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
