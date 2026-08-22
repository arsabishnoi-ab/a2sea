"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { siteConfig } from "@/data/siteConfig";

const NAV = siteConfig.nav.filter((n) => n.href !== "#contact");
const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-white/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <Link
          href="/"
          aria-label="a2sea home"
          onClick={() => setOpen(false)}
          className="relative z-50 flex items-center gap-2.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/a2sea-mark.png"
            alt=""
            width={40}
            height={36}
            className="h-8 w-auto object-contain md:h-9"
          />
          <span className="text-[1.35rem] font-semibold lowercase tracking-[-0.03em] text-[var(--ink)] md:text-[1.5rem]">
            a2sea
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={`/${item.href}`}
              className="group relative text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <MagneticButton
            href="/#contact"
            className="btn-classic bg-[var(--ink)] px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.12em] text-white hover:bg-[var(--accent)]"
          >
            Get in touch
          </MagneticButton>
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`absolute h-px w-5 bg-[var(--ink)] transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
          <span className={`absolute h-px w-5 bg-[var(--ink)] transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-white px-6 pb-10 pt-24 md:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {siteConfig.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.05, duration: 0.35, ease: EASE }}
                >
                  <Link
                    href={`/${item.href}`}
                    className="display block border-b border-[var(--line)] py-5 text-3xl text-[var(--ink)]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center bg-[var(--ink)] py-4 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-white"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
