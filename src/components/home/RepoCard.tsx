"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Meteors } from "@/components/ui/Meteors";
import type { MergedProject } from "@/lib/projects";

/**
 * Compact "More repositories" row. Uses the same hover accents as the featured
 * ProjectCard - meteor streaks + a brand-tinted border - so both card styles
 * feel like one family.
 */
export function RepoCard({ project }: { project: MergedProject }) {
  const [hover, setHover] = useState(false);
  const href = project.htmlUrl ?? `https://github.com/nixrajput/${project.repo}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="border-border bg-surface hover:bg-surface-2 group relative flex items-center justify-between overflow-hidden rounded-xl border px-4 py-2.5 text-sm transition-colors hover:border-(--brand-violet)/40"
    >
      {hover && <Meteors number={6} />}
      <span className="relative z-10 truncate font-medium">{project.title}</span>
      <span className="text-muted relative z-10 ml-3 flex shrink-0 items-center gap-1">
        <Star className="size-3.5" aria-hidden />
        {project.stars ?? "—"}
      </span>
    </a>
  );
}
