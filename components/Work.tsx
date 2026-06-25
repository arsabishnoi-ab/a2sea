"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { projects, type Project } from "@/data/projects";

function screenshotUrl(url: string) {
  return `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`;
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

function WorkItem({ project, index, featured }: { project: Project; index: number; featured?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Parallax: image drifts upward as the card scrolls through the viewport
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <Reveal y={28} amount={0.05} delay={index * 0.04}>
      <motion.a
        ref={ref}
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-white shadow-[var(--shadow-sm)] transition-shadow duration-300 group-hover:shadow-[var(--shadow-lg)]">
          <BrowserChrome url={project.url} />
          <div className={`relative w-full overflow-hidden bg-[var(--paper-2)] ${featured ? "h-72 md:h-[30rem]" : "h-56 md:h-72"}`}>
            <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] h-[116%]">
              <Image
                src={project.image ?? screenshotUrl(project.url)}
                alt={`${project.name} website`}
                fill
                unoptimized={!project.image}
                priority={featured}
                sizes={featured ? "(max-width: 768px) 100vw, 1024px" : "(max-width: 640px) 100vw, 50vw"}
                className="object-cover object-top"
              />
            </motion.div>
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--ink)]/0 transition-colors duration-300 group-hover:bg-[var(--ink)]/30">
              <span className="translate-y-3 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[var(--ink)] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Visit site ↗
              </span>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-4 flex items-start justify-between gap-4 px-1">
          <div>
            <p className="eyebrow text-[var(--muted-2)]">{project.sector} · {project.location}</p>
            <h3 className={`mt-1 font-semibold text-[var(--ink)] ${featured ? "text-xl" : "text-base"}`}>
              {project.name}
            </h3>
            {featured && (
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-[var(--muted)]">{project.blurb}</p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full border border-[var(--line)] bg-white px-2.5 py-0.5 text-[11px] font-medium text-[var(--muted)]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </Reveal>
  );
}

export function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="border-t border-[var(--line)] bg-[var(--paper-2)] px-5 py-24 md:px-8 md:py-32" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-heading" className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)] text-[var(--ink)]">
              Live builds,<br />real clients.
            </h2>
          </Reveal>
          <Reveal delay={0.1} y={20}>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)] md:ml-auto">
              Every project below is live and serving real customers. Click any to open the site.
            </p>
          </Reveal>
        </div>

        {/* Featured */}
        <div className="mt-16">
          <WorkItem project={featured} index={0} featured />
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {rest.map((p, i) => (
            <WorkItem key={p.slug} project={p} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
