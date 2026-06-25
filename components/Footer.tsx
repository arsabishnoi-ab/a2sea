import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "WhatsApp",
    href: siteConfig.contact.whatsappHref,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.47 14.38c-.28-.14-1.65-.81-1.9-.9-.26-.09-.44-.14-.63.14-.19.28-.72.9-.88 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.37-1.63-1.54-1.91-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.17.18-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.63-1.52-.86-2.08-.23-.54-.46-.47-.63-.48-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.35-.26.28-1 1-1 2.42s1.02 2.81 1.16 3.01c.14.19 2.01 3.07 4.87 4.3.68.29 1.21.47 1.63.6.68.21 1.31.18 1.8.11.55-.08 1.65-.67 1.88-1.33.23-.65.23-1.2.16-1.32-.06-.1-.25-.16-.53-.3Z"/>
        <path d="M12 2a10 10 0 0 0-8.44 15.33L2 22l4.83-1.54A10 10 0 1 0 12 2Z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: siteConfig.contact.emailHref,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
      </svg>
    ),
  },
  {
    label: "Call",
    href: siteConfig.contact.phoneHref,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
];

export function Footer() {
  const { location, brandName } = siteConfig;
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-6xl px-5 md:px-8">

        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <p className="max-w-xs text-sm leading-relaxed text-[var(--muted)]">
              Premium websites, software, and Google presence for businesses in {location.city}.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--ink-soft)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-2)]">Navigation</p>
            <nav className="flex flex-col gap-2.5" aria-label="Footer">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-2)]">Contact</p>
            <div className="flex flex-col gap-2.5 text-sm text-[var(--muted)]">
              <a href={siteConfig.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--ink)]">
                {siteConfig.contact.phoneDisplay}
              </a>
              <a href={siteConfig.contact.emailHref} className="transition-colors hover:text-[var(--ink)]">
                {siteConfig.contact.email}
              </a>
              <p>{location.area}, {location.city}, India</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start gap-2 border-t border-[var(--line)] py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[var(--muted-2)]">© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <p className="text-xs text-[var(--muted-2)]">Websites · Software · Google Presence</p>
        </div>
      </div>
    </footer>
  );
}
