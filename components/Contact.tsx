"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/data/siteConfig";

const WA_BASE = siteConfig.contact.whatsappHref.split("?")[0];

const INPUT =
  "w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted-2)] outline-none transition-colors duration-200 focus:border-[var(--ink)]";

export function Contact() {
  const [form, setForm] = useState({ name: "", business: "", message: "" });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = `Hi a2sea! I'm ${form.name || "there"}${form.business ? ` from ${form.business}` : ""}. ${form.message}`;
    window.open(`${WA_BASE}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-[var(--line)] bg-white px-5 py-24 md:px-8 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2
              id="contact-heading"
              className="display mt-4 text-[clamp(2.4rem,5vw,3.8rem)] text-[var(--ink)]"
            >
              Let&apos;s talk.
            </h2>
          </Reveal>
          <Reveal delay={0.08} y={14}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--muted)]">
              Fill in the form and we&apos;ll open a WhatsApp chat — or talk to{" "}
              {siteConfig.founder.name} directly.
            </p>
          </Reveal>

          <Reveal delay={0.12} y={12}>
            <dl className="mt-12 space-y-5 text-sm">
              <div className="flex justify-between gap-6 border-b border-[var(--line)] pb-4">
                <dt className="text-[var(--muted-2)]">WhatsApp</dt>
                <dd>
                  <a
                    href={siteConfig.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-[var(--line)] pb-4">
                <dt className="text-[var(--muted-2)]">Phone</dt>
                <dd>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-[var(--line)] pb-4">
                <dt className="text-[var(--muted-2)]">Email</dt>
                <dd>
                  <a
                    href={siteConfig.contact.emailHref}
                    className="text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-[var(--muted-2)]">Studio</dt>
                <dd className="text-[var(--ink)]">{siteConfig.location.city}</dd>
              </div>
            </dl>
            <p className="mt-8 text-xs text-[var(--muted-2)]">
              {siteConfig.founder.name}, {siteConfig.founder.title}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={16}>
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-[var(--muted-2)]">
                Your name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Arjun Sharma"
                className={INPUT}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-[var(--muted-2)]">
                Business name <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <input
                value={form.business}
                onChange={(e) => setForm({ ...form, business: e.target.value })}
                placeholder="Your hotel, café, or shop"
                className={INPUT}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-[var(--muted-2)]">
                What do you need?
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Website, Google Maps, booking flow, custom software..."
                className={`${INPUT} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex min-h-12 w-full items-center justify-center bg-[var(--ink)] px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-[var(--accent)] md:w-auto"
            >
              Send via WhatsApp
            </button>
            <p className="text-xs text-[var(--muted-2)]">We typically respond within a few hours.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
