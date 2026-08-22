"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { workSections, type Project, type WorkSection } from "@/data/projects";

function screenshotUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&viewport.width=1280&viewport.height=800&screenshot.type=jpeg&meta=false&embed=screenshot.url`;
}

function Preview({
  project,
  featured,
  priority,
}: {
  project: Project;
  featured?: boolean;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = project.image ?? screenshotUrl(project.url);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--paper-2)] px-6 text-center">
        <p className="text-sm text-[var(--muted)]">{project.name}</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`${project.name} website preview`}
      fill
      unoptimized={!project.image}
      priority={priority}
      quality={90}
      sizes={
        featured
          ? "(max-width: 768px) 100vw, 1152px"
          : "(max-width: 768px) 100vw, 50vw"
      }
      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      onError={() => setFailed(true)}
    />
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="mt-5">
      <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted-2)]">
        {project.sector} · {project.location}
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[var(--ink)] md:text-2xl">
        {project.name}
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
        {project.blurb}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="text-[0.7rem] text-[var(--muted-2)]">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectLink({
  project,
  featured,
  priority,
  className,
}: {
  project: Project;
  featured?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block ${className ?? ""}`}
    >
      <div
        className={`relative overflow-hidden bg-[var(--paper-2)] ${
          featured ? "aspect-[16/9] md:aspect-[16/8]" : "aspect-[16/11]"
        }`}
      >
        <Preview project={project} featured={featured} priority={priority} />
        <span className="absolute inset-0 flex items-center justify-center bg-[var(--ink)]/0 opacity-0 transition-all duration-300 group-hover:bg-[var(--ink)]/20 group-hover:opacity-100">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--ink)]">
            Visit site →
          </span>
        </span>
      </div>
      <ProjectMeta project={project} />
    </a>
  );
}

function SectionBlock({ section }: { section: WorkSection }) {
  const { projects } = section;

  if (projects.length === 0) {
    return (
      <div id={section.id} className="scroll-mt-28 border-t border-[var(--line)] pt-16">
        <Reveal>
          <p className="eyebrow">{section.title}</p>
          <h3 className="display mt-3 text-[clamp(1.6rem,3.5vw,2.4rem)] text-[var(--ink)]">
            {section.title}
          </h3>
          <p className="mt-4 max-w-xl text-base text-[var(--muted)]">{section.description}</p>
          <p className="mt-6 max-w-xl border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
            Ecommerce builds coming soon — contact us if you need a store, catalogue, or checkout flow.
          </p>
        </Reveal>
      </div>
    );
  }

  if (section.primary) {
    const [first, ...rest] = projects;
    const pair = rest.slice(0, 2);
    const trio = rest.slice(2);
    return (
      <div id={section.id} className="scroll-mt-28">
        <Reveal>
          <p className="eyebrow">Featured sector</p>
          <h3 className="display mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-[var(--ink)]">
            {section.title}
          </h3>
          <p className="mt-4 max-w-2xl text-base text-[var(--muted)]">{section.description}</p>
        </Reveal>
        <Reveal y={20} className="mt-10">
          <ProjectLink project={first} featured priority />
        </Reveal>
        {pair.length > 0 && (
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {pair.map((p) => (
              <Reveal key={p.slug} y={18}>
                <ProjectLink project={p} />
              </Reveal>
            ))}
          </div>
        )}
        {trio.length > 0 && (
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {trio.map((p) => (
              <Reveal key={p.slug} y={18}>
                <ProjectLink project={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (projects.length === 1) {
    return (
      <div id={section.id} className="scroll-mt-28 border-t border-[var(--line)] pt-16">
        <Reveal>
          <p className="eyebrow">{section.title}</p>
          <h3 className="display mt-3 text-[clamp(1.6rem,3.5vw,2.4rem)] text-[var(--ink)]">
            {section.title}
          </h3>
          <p className="mt-4 max-w-xl text-base text-[var(--muted)]">{section.description}</p>
        </Reveal>
        <Reveal y={20} className="mt-10">
          <ProjectLink project={projects[0]} featured />
        </Reveal>
      </div>
    );
  }

  return (
    <div id={section.id} className="scroll-mt-28 border-t border-[var(--line)] pt-16">
      <Reveal>
        <p className="eyebrow">{section.title}</p>
        <h3 className="display mt-3 text-[clamp(1.6rem,3.5vw,2.4rem)] text-[var(--ink)]">
          {section.title}
        </h3>
        <p className="mt-4 max-w-xl text-base text-[var(--muted)]">{section.description}</p>
      </Reveal>
      <div className="mt-10 space-y-16">
        {projects.map((p, i) => (
          <Reveal key={p.slug} y={20}>
            <ProjectLink
              project={p}
              featured={i % 2 === 0}
              className={i % 2 === 1 ? "md:ml-auto md:max-w-[85%]" : ""}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-[var(--line)] bg-white px-5 py-24 md:px-8 md:py-32"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2
              id="work-heading"
              className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)] text-[var(--ink)]"
            >
              Live builds by sector.
            </h2>
          </Reveal>
          <Reveal delay={0.08} y={16}>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)] md:ml-auto">
              Every link below is live. Browse lawyers, hospitality, transport, and ecommerce.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-24">
          {workSections.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}
