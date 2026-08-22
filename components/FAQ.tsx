"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const faqs = [
  {
    q: "What happens during a first call?",
    a: "We learn about your business, your customers, and the outcome you want — more bookings, stronger Google presence, or custom software. No pitch decks, just a straight conversation. About 30 minutes.",
  },
  {
    q: "How long does a project take?",
    a: "Most focused websites ship in two to four weeks. Larger systems like booking flows, CRMs, or ecommerce integrations depend on content readiness and third-party connections.",
  },
  {
    q: "Do you only build websites?",
    a: "No. We build websites, set up Google Business Profiles, manage review funnels, build WhatsApp flows, dashboards, integrations, and fully custom software of any kind.",
  },
  {
    q: "Can you redesign or improve an existing site?",
    a: "Yes. If the foundation is solid, we can redesign, improve speed, add booking flows, connect analytics, and fix the conversion path — without rebuilding from scratch.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. The best systems get better after customers start using them. We can stay on for updates, improvements, and operational support.",
  },
] as const;

export function FAQ() {
  const [open, setOpen] = useState<number>(-1);
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="border-t border-[var(--line)] bg-white px-5 py-24 md:px-8 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-heading" className="display mt-4 text-[clamp(2.2rem,5vw,3.4rem)] text-[var(--ink)]">
            Before we build.
          </h2>
        </Reveal>

        <Reveal delay={0.08} y={16}>
          <div className="border-t border-[var(--line)]">
            {faqs.map((item, i) => (
              <div key={item.q} className="border-b border-[var(--line)]">
                <button
                  type="button"
                  className="flex min-h-12 w-full items-center justify-between gap-6 py-6 text-left"
                  onClick={() => setOpen((v) => (v === i ? -1 : i))}
                  aria-expanded={open === i}
                >
                  <span className="text-base font-medium tracking-[-0.02em] text-[var(--ink)] md:text-lg">
                    {item.q}
                  </span>
                  <motion.span
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--muted-2)]"
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-8 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
