"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { siteConfig } from "@/data/siteConfig";

const WA_BASE = siteConfig.contact.whatsappHref.split("?")[0];
const EASE = [0.22, 1, 0.36, 1] as const;

const INPUT =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted-2)] outline-none transition-all duration-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15";

export function Contact() {
  const [form, setForm] = useState({ name: "", business: "", message: "" });
  const reduced = useReducedMotion() ?? false;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = `Hi a2sea! I'm ${form.name || "there"}${form.business ? ` from ${form.business}` : ""}. ${form.message}`;
    window.open(`${WA_BASE}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <section id="contact" className="bg-[var(--paper)] px-5 py-24 md:px-8 md:py-32" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">

          {/* Left — closing statement */}
          <div>
            <Reveal>
              <p className="eyebrow">Contact</p>
            </Reveal>
            <h2 id="contact-heading" className="display mt-6 text-[clamp(2.6rem,7vw,5rem)] text-[var(--ink)]">
              <TextReveal
                onView
                stagger={0.08}
                lines={["Let's build", <span key="2">something <em className="italic text-[var(--accent)]">good.</em></span>]}
              />
            </h2>
            <Reveal delay={0.15} y={18}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-[var(--muted)]">
                Fill in the form and we&apos;ll open a WhatsApp chat right away — or talk to Arvind directly below.
              </p>
            </Reveal>

            <Reveal delay={0.2} y={16}>
              <div className="mt-10 rounded-xl border border-[var(--line)] bg-white p-6 shadow-[var(--shadow-sm)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
                  Talk to founder
                </p>
                <p className="mt-3 font-serif text-2xl text-[var(--ink)]">{siteConfig.founder.name}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{siteConfig.founder.title}, {siteConfig.brandName}</p>

                <div className="mt-6 flex flex-col gap-3 border-t border-[var(--line)] pt-6">
                  <a
                    href={siteConfig.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 text-[var(--ink)]"
                  >
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">WhatsApp</span>
                    <span className="ml-auto font-medium transition-colors group-hover:text-[var(--accent)]">
                      {siteConfig.contact.phoneDisplay}
                    </span>
                  </a>
                  <a href={siteConfig.contact.phoneHref} className="group flex items-center gap-4 text-[var(--ink)]">
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">Phone</span>
                    <span className="ml-auto font-medium transition-colors group-hover:text-[var(--accent)]">
                      {siteConfig.contact.phoneDisplay}
                    </span>
                  </a>
                  <a href={siteConfig.contact.emailHref} className="group flex items-center gap-4 text-[var(--ink)]">
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">Email</span>
                    <span className="ml-auto font-medium transition-colors group-hover:text-[var(--accent)]">
                      {siteConfig.contact.email}
                    </span>
                  </a>
                  <div className="flex items-center gap-4 text-[var(--ink)]">
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">Location</span>
                    <span className="ml-auto font-medium">
                      {siteConfig.location.city}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <form onSubmit={onSubmit} className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-[var(--shadow-sm)] md:p-8">
              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Your name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Arjun Sharma" className={INPUT} />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Business name <span className="font-normal text-[var(--muted-2)]">(optional)</span>
                  </label>
                  <input value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} placeholder="Your hotel, café, or shop" className={INPUT} />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">What do you need?</label>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Website, Google Maps, booking flow, custom software..." className={`${INPUT} resize-none`} />
                </div>
                <button
                  type="submit"
                  className="btn-classic mt-1 flex items-center justify-center gap-2 bg-[var(--ink)] px-6 py-4 text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[var(--paper)] transition-colors duration-200 hover:bg-[var(--accent-deep)] active:scale-[0.99]"
                >
                  Send via WhatsApp
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <p className="text-center text-xs text-[var(--muted-2)]">
                  We typically respond within a few hours.
                </p>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
