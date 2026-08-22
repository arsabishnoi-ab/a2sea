"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

const VIDEO_SRC = "/hero/hero.mp4";
const POSTER_SRC = "/hero/hero-preview.jpg";

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-white"
      aria-label={`${siteConfig.brandName} — ${siteConfig.seo.shortTitle}`}
    >
      <h1 className="sr-only">
        {siteConfig.brandName} — {siteConfig.seo.shortTitle}
      </h1>

      <div className="hero-stage">
        {reduced ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={POSTER_SRC} alt="" className="hero-media" />
        ) : (
          <video
            ref={videoRef}
            className="hero-media"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER_SRC}
            width={1920}
            height={1080}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        )}
      </div>

      {!reduced && (
        <button
          type="button"
          onClick={togglePlayback}
          className="absolute bottom-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/90 text-[var(--muted)] transition-colors hover:text-[var(--ink)] md:bottom-8 md:right-8"
          aria-label={paused ? "Play hero video" : "Pause hero video"}
          aria-pressed={!paused}
        >
          {paused ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          )}
        </button>
      )}
    </section>
  );
}
