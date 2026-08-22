import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/businessVerticals";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const { location, brandName } = siteConfig;
  return (
    <footer className="border-t border-[var(--line)] bg-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 py-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-2xl font-semibold lowercase tracking-[-0.04em] text-[var(--ink)]">
              a2sea
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              Premium websites, software, and Google presence for businesses in {location.city}.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.14em] text-[var(--muted-2)]">Navigate</p>
            <nav className="flex flex-col gap-2.5" aria-label="Footer">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.14em] text-[var(--muted-2)]">Contact</p>
            <div className="flex flex-col gap-2.5 text-sm text-[var(--muted)]">
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--ink)]"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
              <a href={siteConfig.contact.emailHref} className="transition-colors hover:text-[var(--ink)]">
                {siteConfig.contact.email}
              </a>
              <p>
                {location.city}, India
              </p>
            </div>
          </div>
        </div>

        <div className="hidden border-t border-[var(--line)] py-8 md:block">
          <p className="mb-4 text-xs uppercase tracking-[0.14em] text-[var(--muted-2)]">Services</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href="/#services"
                className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 border-t border-[var(--line)] py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[var(--muted-2)]">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/terms" className="text-xs text-[var(--muted-2)] transition-colors hover:text-[var(--ink)]">
              Terms &amp; Conditions
            </Link>
            <p className="text-xs text-[var(--muted-2)]">Websites · Software · Google Presence</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
