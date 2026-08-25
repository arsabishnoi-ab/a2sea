import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { termsMeta, termsSections } from "@/data/terms";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: termsMeta.title,
  description: termsMeta.description,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--paper)] px-5 pb-24 pt-32 md:px-8 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="display mt-6 text-[clamp(2.4rem,6vw,4rem)] text-[var(--ink)]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-8 text-base leading-relaxed text-[var(--muted)]">
            These terms govern all services provided by {siteConfig.brandName}, a web studio based in{" "}
            {siteConfig.location.city}, India. Please read them carefully before starting a project.
          </p>

          <div className="mt-14 space-y-12">
            {termsSections.map((section) => (
              <section key={section.title} aria-labelledby={section.title.replace(/\s+/g, "-").toLowerCase()}>
                <h2
                  id={section.title.replace(/\s+/g, "-").toLowerCase()}
                  className="font-serif text-2xl text-[var(--ink)]"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed text-[var(--muted)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 rounded-xl border border-[var(--line)] bg-white p-6 shadow-[var(--shadow-sm)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-gold)]">
              Questions
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              Contact us at{" "}
              <a href={siteConfig.contact.emailHref} className="text-[var(--ink)] underline-offset-4 hover:underline">
                {siteConfig.contact.email}
              </a>{" "}
              or{" "}
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ink)] underline-offset-4 hover:underline"
              >
                WhatsApp
              </a>{" "}
              before booking if you need clarification.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex text-sm font-medium text-[var(--accent-deep)] transition-colors hover:text-[var(--accent)]"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
