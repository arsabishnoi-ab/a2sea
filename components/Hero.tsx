"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { siteConfig } from "@/data/siteConfig";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIDEO_SRC = "/hero/hero.mp4";
const POSTER_SRC = "/hero/hero-preview.jpg";

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const { contact, location, hero } = siteConfig;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    video.muted = true;
    const play = video.play();
    if (play) play.catch(() => setPaused(true));
  }, [reduced]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPaused(false)).catch(() => {});
    } else {
      video.pause();
      setPaused(true);
    }
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0" aria-hidden>
        {reduced ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={POSTER_SRC}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER_SRC}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/55 to-white/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <motion.p
          className="eyebrow"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {hero.eyebrow} · {location.city}
        </motion.p>

        <h1
          id="hero-heading"
          className="display mt-6 max-w-5xl text-[clamp(2.6rem,8vw,6rem)] text-[var(--ink)]"
        >
          <TextReveal
            lines={[
              "Websites that bring",
              <span key="2">
                customers to your{" "}
                <em className="font-medium not-italic text-[var(--accent)]">door.</em>
              </span>,
            ]}
            stagger={0.1}
            delay={0.12}
          />
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
        >
          {hero.sub}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
        >
          <MagneticButton
            href={contact.whatsappHref}
            external
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--ink)] px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[var(--accent)]"
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
          <Link
            href="/#work"
            className="group inline-flex min-h-12 items-center text-sm font-medium text-[var(--ink)]"
          >
            <span className="border-b border-[var(--ink)]/25 pb-0.5 transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
              View our work
            </span>
          </Link>
        </motion.div>
      </div>

      {!reduced && (
        <button
          type="button"
          onClick={togglePlayback}
          className="absolute bottom-6 right-5 z-10 min-h-11 rounded-full border border-[var(--line)] bg-white/80 px-4 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[var(--muted)] backdrop-blur-sm transition-colors hover:text-[var(--ink)] md:bottom-8 md:right-8"
          aria-pressed={!paused}
        >
          {paused ? "Play" : "Pause"}
        </button>
      )}
    </section>
  );
}
