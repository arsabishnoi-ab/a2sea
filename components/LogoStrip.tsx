import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";

export function LogoStrip() {
  return (
    <section aria-label="Businesses we have built for" className="border-y border-[var(--line)] bg-[var(--paper)] py-14">
      <Reveal>
        <p className="mb-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted-2)]">
          Trusted by businesses across India
        </p>
      </Reveal>
      <Marquee duration={38}>
        {projects.map((p) => (
          <span key={p.slug} className="flex items-center">
            <span className="display text-2xl text-[var(--ink)]/35 transition-colors hover:text-[var(--ink)] md:text-4xl">
              {p.name}
            </span>
            <span className="mx-10 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]/60 md:mx-14" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
