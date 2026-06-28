"use client";

import { useState } from "react";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Meteors } from "@/components/ui/Meteors";
import type { MergedProject } from "@/lib/projects";

export type { MergedProject };

export function ProjectCard({ project }: { project: MergedProject }) {
  const [hover, setHover] = useState(false);

  const githubUrl = project.htmlUrl ?? `https://github.com/nixrajput/${project.repo}`;
  const blurb = project.description ?? "";

  return (
    <Card
      as="article"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex h-full flex-col overflow-hidden hover:border-[var(--brand-violet)]/40"
    >
      {hover && <Meteors number={10} />}

      <div className="relative z-10 flex flex-1 flex-col">
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
              <span className="rounded-full border border-[var(--brand-violet)]/30 bg-[var(--brand-violet)]/10 px-2 py-0.5 text-xs text-[var(--brand-violet)]">
                {project.language}
              </span>
            )}
            {project.tags.map((t) => (
              <span
                key={t}
                className="border-border bg-surface-2 text-muted rounded-full border px-2 py-0.5 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Action links */}
        <div className="mt-auto flex items-center gap-2 pt-5">
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
