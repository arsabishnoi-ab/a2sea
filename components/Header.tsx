"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { siteConfig } from "@/data/siteConfig";

const NAV = siteConfig.nav.filter((n) => n.href !== "#contact");

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--line)] bg-[var(--paper)]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link
          href="#top"
          aria-label="a2sea home"
          onClick={() => setOpen(false)}
          className="relative z-50 flex items-center gap-2.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/a2sea-mark.png"
            alt=""
            width={48}
            height={44}
            className="h-9 w-auto object-contain md:h-11"
          />
          <span className="text-[1.6rem] font-bold lowercase leading-none tracking-[-0.02em] text-[var(--ink)] md:text-[1.9rem]">
            a2sea
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
                scrolled ? "text-[var(--ink-soft)] hover:text-[var(--ink)]" : "text-white/75 hover:text-white"
              }`}
            >
              {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--accent-gold)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <MagneticButton
            href="#contact"
            className={`btn-classic px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.12em] ${
              scrolled
                ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent-deep)]"
                : "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-[var(--accent-gold)] hover:bg-white/15"
            }`}
          >
            Get in touch
          </MagneticButton>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-px w-6 transition-all duration-300 ${scrolled ? "bg-[var(--ink)]" : "bg-white"} ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-px w-6 transition-all duration-300 ${scrolled ? "bg-[var(--ink)]" : "bg-white"} ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 transition-all duration-300 ${scrolled ? "bg-[var(--ink)]" : "bg-white"} ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-[var(--paper)] px-6 pb-10 pt-28 md:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {siteConfig.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="display block border-b border-[var(--line)] py-5 text-3xl text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded btn-classic bg-[var(--ink)] py-4 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[var(--paper)]"
              >
                Chat on WhatsApp
              </a>
              <p className="text-center text-xs text-[var(--muted)]">
                {siteConfig.contact.phoneDisplay} · {siteConfig.location.area}, {siteConfig.location.city}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
