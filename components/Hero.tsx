"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ParticleField } from "@/components/motion/ParticleField";
import { TextReveal } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { siteConfig } from "@/data/siteConfig";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const { contact, location } = siteConfig;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--paper)] px-5 pb-20 pt-32 md:px-8 md:pt-36"
      aria-labelledby="hero-heading"
    >
      {/* Interactive particle sphere */}
      <ParticleField className="absolute inset-0 h-full w-full opacity-90" />

      {/* Soft accent wash */}
      <div className="blob left-[8%] top-[18%] h-[320px] w-[320px] bg-[var(--accent-wash)]" aria-hidden />
      <div className="blob right-[6%] bottom-[12%] h-[260px] w-[260px] bg-[#f3ece1]" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Eyebrow */}
        <motion.div
          className="mb-8 flex items-center gap-3"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="eyebrow">Web studio · {location.area}, {location.city}</span>
        </motion.div>

        {/* Headline — masked line reveal */}
        <h1 id="hero-heading" className="display max-w-4xl text-[clamp(2.8rem,8vw,6.2rem)] text-[var(--ink)]">
          <TextReveal
            lines={["Websites that bring", <em key="2" className="italic text-[var(--accent)]">customers</em>, "to your door."]}
            stagger={0.1}
            delay={0.15}
          />
        </h1>

        {/* Sub */}
        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)]"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        >
          We design and build premium websites, booking systems, and Google presence for hotels,
          cafés, ecommerce, and local businesses — fully custom, shipped in weeks.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
        >
          <MagneticButton
            href={contact.whatsappHref}
            external
            strength={0.5}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3.5 text-sm font-medium text-[var(--paper)] shadow-[var(--shadow-md)] transition-colors duration-200 hover:bg-[var(--accent)]"
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
          <Link
            href="#work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)]"
          >
            <span className="border-b border-[var(--ink)]/30 pb-0.5 transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
              View our work
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex flex-col items-center gap-2 text-[var(--muted-2)]">
          <span className="text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
          <motion.span
            className="block h-8 w-px bg-[var(--line-strong)]"
            animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
