"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { workSections, type Project, type WorkSection } from "@/data/projects";

function screenshotUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&viewport.width=1280&viewport.height=800&screenshot.type=jpeg&meta=false&embed=screenshot.url`;
}

function BrowserChrome({ url }: { url: string }) {
  const display = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-[var(--line)] bg-[var(--paper-2)] px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-2 flex-1 truncate rounded-md border border-[var(--line)] bg-white px-3 py-1 font-mono text-xs text-[var(--muted-2)]">
        {display}
      </span>
    </div>
  );
}

function PreviewFallback({ project }: { project: Project }) {
  const domain = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(160deg,#f7f5f0_0%,#ece7dc_100%)] px-6 text-center">
      <span className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
        {project.sector}
      </span>
      <p className="font-serif text-lg text-[var(--ink)] md:text-xl">{project.name}</p>
      <p className="text-xs text-[var(--muted-2)]">{domain}</p>
    </div>
  );
}

function WorkPreview({
  project,
  priority,
  featured,
}: {
  project: Project;
  priority?: boolean;
  featured?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = project.image ?? screenshotUrl(project.url);
  const isLocal = Boolean(project.image);

  if (failed) {
    return <PreviewFallback project={project} />;
  }

  return (
    <Image
      src={src}
      alt={`${project.name} website preview`}
      fill
      unoptimized={isLocal}
      priority={priority}
      quality={95}
      sizes={
        featured
          ? "(max-width: 768px) 100vw, 1152px"
          : "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 384px"
      }
      className="object-cover object-top"
      onError={() => setFailed(true)}
    />
  );
}

function WorkItem({
  project,
  index,
  featured,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <Reveal y={24} amount={0.08} delay={index * 0.05}>
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col"
        whileHover={reduced ? undefined : { y: -4 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-white shadow-[var(--shadow-sm)] transition-shadow duration-300 group-hover:shadow-[var(--shadow-md)]">
          <BrowserChrome url={project.url} />
          <div className={`relative w-full overflow-hidden bg-[#eceae4] ${featured ? "aspect-[16/10]" : "aspect-[16/11]"}`}>
            <WorkPreview project={project} priority={featured} featured={featured} />
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--ink)]/0 transition-colors duration-300 group-hover:bg-[var(--ink)]/25">
              <span className="translate-y-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--ink)] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Visit site ↗
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col px-1">
          <p className="eyebrow text-[var(--muted-2)]">{project.sector} · {project.location}</p>
          <h3 className={`mt-1 font-semibold text-[var(--ink)] ${featured ? "text-xl" : "text-base"}`}>
            {project.name}
          </h3>
          <p className={`mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--muted)] ${featured ? "line-clamp-3" : ""}`}>
            {project.blurb}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--line)] bg-white px-2.5 py-0.5 text-[11px] font-medium text-[var(--muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </Reveal>
  );
}

function WorkCategorySection({ section, startIndex }: { section: WorkSection; startIndex: number }) {
  const { projects, primary } = section;

  if (projects.length === 0) {
    return (
      <div id={section.id} className="scroll-mt-28 border-t border-[var(--line)] pt-16 first:border-t-0 first:pt-0">
        <Reveal>
          <p className="eyebrow">{section.title}</p>
          <h3 className="display mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-[var(--ink)]">{section.title}</h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">{section.description}</p>
          <p className="mt-6 rounded-xl border border-dashed border-[var(--line)] bg-white px-5 py-6 text-sm text-[var(--muted)]">
            Ecommerce builds coming soon — contact us if you need a store, catalogue, or checkout flow.
          </p>
        </Reveal>
      </div>
    );
  }

  const [featured, ...rest] = primary ? projects : [];

  return (
    <div id={section.id} className="scroll-mt-28 border-t border-[var(--line)] pt-16 first:border-t-0 first:pt-0">
      <Reveal>
        <p className="eyebrow">{primary ? "Featured sector" : "Sector"}</p>
        <h3 className="display mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-[var(--ink)]">{section.title}</h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">{section.description}</p>
      </Reveal>

      {primary && featured ? (
        <>
          <div className="mt-10">
            <WorkItem project={featured} index={startIndex} featured />
          </div>
          {rest.length > 0 && (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {rest.map((project, i) => (
                <WorkItem key={project.slug} project={project} index={startIndex + i + 1} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={`mt-10 grid gap-8 ${projects.length === 1 ? "max-w-3xl" : "sm:grid-cols-2"}`}>
          {projects.map((project, i) => (
            <WorkItem
              key={project.slug}
              project={project}
              index={startIndex + i}
              featured={projects.length === 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Work() {
  let index = 0;

  return (
    <section id="work" className="border-t border-[var(--line)] bg-[var(--paper-2)] px-5 py-24 md:px-8 md:py-32" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-heading" className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)] text-[var(--ink)]">
              Live builds by<br />sector.
            </h2>
          </Reveal>
          <Reveal delay={0.1} y={20}>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)] md:ml-auto">
              Browse by industry — lawyers, hospitality, furniture, transport, and business groups. Every link below is live.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-4">
          {workSections.map((section) => {
            const startIndex = index;
            index += section.projects.length || 1;
            return <WorkCategorySection key={section.id} section={section} startIndex={startIndex} />;
          })}
        </div>
      </div>
    </section>
  );
}
