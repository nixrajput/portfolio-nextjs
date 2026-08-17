"use client";

import Image from "next/image";
import { Star, GitFork, ExternalLink, Github, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { MergedProject } from "@/lib/projects";

/**
 * Large showcase cell for a featured project. Sits above the filterable grid so the
 * two or three projects worth leading with get real estate a uniform grid cannot give
 * them, and carries the cover image the compact cards have no room for.
 */
export function FeaturedProject({
  project,
  onQuickView,
}: {
  project: MergedProject;
  onQuickView: () => void;
}) {
  const githubUrl = project.htmlUrl ?? `https://github.com/nixrajput/${project.repo}`;

  return (
    <article className="border-border bg-surface group relative grid overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors hover:border-(--brand-deep)/40 md:grid-cols-2">
      {/* Media half. Fixed aspect on mobile so the cover never collapses to nothing;
          stretches to the text height from md up. */}
      <div className="relative aspect-16/10 overflow-hidden md:aspect-auto md:min-h-full">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        ) : (
          <div className="size-full bg-(image:--gradient-brand) opacity-80" />
        )}
      </div>

      {/* Text half. min-w-0 so long identifiers wrap instead of stretching the grid
          track - a grid item cannot shrink below its content without it. */}
      <div className="flex min-w-0 flex-col p-6 sm:p-8">
        <div className="text-muted mb-3 flex items-center gap-3 text-xs font-semibold tracking-wider uppercase">
          <span className="text-(--accent-on-chip)">Featured</span>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1" aria-label={`${project.stars ?? 0} stars`}>
            <Star className="size-3.5" aria-hidden /> {project.stars ?? "—"}
          </span>
          <span className="flex items-center gap-1" aria-label={`${project.forks ?? 0} forks`}>
            <GitFork className="size-3.5" aria-hidden /> {project.forks ?? "—"}
          </span>
        </div>

        <h3 className="text-2xl leading-tight font-bold text-balance">{project.title}</h3>

        {project.description && (
          <p className="text-muted mt-3 line-clamp-4 text-sm text-pretty">{project.description}</p>
        )}

        {(project.language || project.tags.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.language && (
              <span className="rounded-full border border-(--brand-deep)/40 bg-(--chip-surface) px-2 py-0.5 text-xs font-semibold text-(--accent-on-chip)">
                {project.language}
              </span>
            )}
            {project.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="border-border text-muted rounded-full border bg-(--chip-surface) px-2 py-0.5 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <Button
            size="sm"
            onClick={onQuickView}
            leftIcon={<Maximize2 className="size-3.5" aria-hidden />}
          >
            Quick view
          </Button>
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
    </article>
  );
}
