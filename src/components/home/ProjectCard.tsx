"use client";

import { useState } from "react";
import { Star, GitFork, ExternalLink, Github, Maximize2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Meteors } from "@/components/ui/Meteors";
import type { MergedProject } from "@/lib/projects";

export type { MergedProject };

export function ProjectCard({
  project,
  onQuickView,
}: {
  project: MergedProject;
  onQuickView?: () => void;
}) {
  const [hover, setHover] = useState(false);

  const githubUrl = project.htmlUrl ?? `https://github.com/nixrajput/${project.repo}`;
  const blurb = project.description ?? "";

  return (
    <Card
      as="article"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex h-full flex-col overflow-hidden hover:border-(--brand-deep)/40"
    >
      {hover && <Meteors number={10} />}

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Featured badge: more projects are flagged featured than the showcase above
            can hold, so the ones that land in the grid still say so. */}
        {project.featured && (
          <p className="mb-2 text-[0.65rem] font-semibold tracking-wider text-(--accent-on-chip) uppercase">
            Featured
          </p>
        )}

        {/* Title + stats row */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-snug font-bold">{project.title}</h3>
          <div className="text-muted flex shrink-0 items-center gap-3 text-sm">
            <span className="flex items-center gap-1" aria-label={`${project.stars ?? 0} stars`}>
              <Star className="size-4" aria-hidden /> {project.stars ?? "—"}
            </span>
            <span className="flex items-center gap-1" aria-label={`${project.forks ?? 0} forks`}>
              <GitFork className="size-4" aria-hidden /> {project.forks ?? "—"}
            </span>
          </div>
        </div>

        {/* Description */}
        {blurb && <p className="text-muted mt-3 flex-1 text-sm text-pretty">{blurb}</p>}

        {/* Tech tags */}
        {(project.language || project.tags.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.language && (
              // Opaque brand-tinted chip: --chip-surface is a subtle violet
              // wash (not flat black) that blocks the moving ambient gradient
              // from bleeding through, so the accent text stays legible.
              <span className="rounded-full border border-(--brand-deep)/40 bg-(--chip-surface) px-2 py-0.5 text-xs font-semibold text-(--accent-on-chip)">
                {project.language}
              </span>
            )}
            {project.tags.map((t) => (
              <span
                key={t}
                className="border-border text-muted rounded-full border bg-(--chip-surface) px-2 py-0.5 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Action links */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {onQuickView && (
            <Button
              size="sm"
              onClick={onQuickView}
              leftIcon={<Maximize2 className="size-3.5" aria-hidden />}
            >
              Quick view
            </Button>
          )}
          <Button
            href={githubUrl}
            variant="secondary"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<Github className="size-3.5" aria-hidden />}
          >
            Code
          </Button>
          {project.homepage && (
            <Button
              href={project.homepage}
              variant="ghost"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<ExternalLink className="size-3.5" aria-hidden />}
            >
              Live
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
