"use client";

import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { siteConfig } from "@/data/siteConfig";

export function CTA() {
  return (
    <section
      className="border-t border-[var(--line)] bg-white px-5 py-24 md:px-8 md:py-36"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2
            id="cta-heading"
            className="display max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)] text-[var(--ink)]"
          >
            Have a property, practice, or shop?
            <span className="mt-2 block text-[var(--muted)]">
              Let&apos;s build the site that brings people in.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} y={12}>
          <MagneticButton
            href={siteConfig.contact.whatsappHref}
            external
            className="mt-10 inline-flex min-h-12 items-center justify-center bg-[var(--ink)] px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-[var(--accent)]"
          >
            Start a project
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
