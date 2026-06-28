"use client";

import { useState } from "react";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";
import { Meteors } from "@/components/ui/Meteors";
import type { MergedProject } from "@/lib/projects";

export type { MergedProject };

export function ProjectCard({ project }: { project: MergedProject }) {
  const [hover, setHover] = useState(false);

  const githubUrl = project.htmlUrl ?? `https://github.com/nixrajput/${project.repo}`;
  const blurb = project.description ?? "";

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group border-foreground/10 bg-foreground/[0.02] relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-colors hover:border-[var(--brand-violet)]/40"
    >
      {hover && <Meteors number={10} />}

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <div className="text-foreground/60 flex shrink-0 items-center gap-3 text-sm">
            <span className="flex items-center gap-1" aria-label={`${project.stars ?? 0} stars`}>
              <Star className="size-4" aria-hidden /> {project.stars ?? "—"}
            </span>
            <span className="flex items-center gap-1" aria-label={`${project.forks ?? 0} forks`}>
              <GitFork className="size-4" aria-hidden /> {project.forks ?? "—"}
            </span>
          </div>
        </div>

        {blurb && <p className="text-foreground/70 mt-3 flex-1 text-sm text-pretty">{blurb}</p>}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.language && (
            <span className="rounded-full bg-[var(--brand-violet)]/10 px-2.5 py-0.5 text-xs text-[var(--brand-violet)]">
              {project.language}
            </span>
          )}
          {project.tags.map((t) => (
            <span
              key={t}
              className="bg-foreground/5 text-foreground/60 rounded-full px-2.5 py-0.5 text-xs"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 text-sm font-medium">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            <Github className="size-4" aria-hidden /> Code
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="size-4" aria-hidden /> Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
