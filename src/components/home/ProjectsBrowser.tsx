"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "./ProjectCard";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectQuickView } from "./ProjectQuickView";
import type { MergedProject } from "@/lib/projects";

const ALL = "All";
// Above this many, the showcase stops being a showcase and becomes a very long page.
// Featured projects beyond the cut fall into the grid but keep a badge, so the flag
// still reads instead of silently doing nothing for four of the seven.
const MAX_SHOWCASE = 3;

/**
 * Interactive half of the Projects section - client-side because the showcase, filter and grid
 * share selection state. Filters the already-loaded list rather than refetching.
 */
export function ProjectsBrowser({ projects }: { projects: MergedProject[] }) {
  const [language, setLanguage] = useState(ALL);
  const [quickView, setQuickView] = useState<MergedProject | null>(null);

  // All three derived together and keyed on `projects` alone. Splitting them meant the memo
  // depended on a `rest` array rebuilt every render, so it never actually memoised anything
  // while its dependency list read as though it did.
  const { showcase, rest, languages } = useMemo(() => {
    // projects arrives already sorted featured-first by mergeProjects.
    const lead = projects.filter((p) => p.featured).slice(0, MAX_SHOWCASE);
    const leadIds = new Set(lead.map((p) => p.id));
    const others = projects.filter((p) => !leadIds.has(p.id));

    // Counted over the grid only, so a filter chip's number matches what it reveals.
    const counts = new Map<string, number>();
    for (const p of others) {
      if (p.language) counts.set(p.language, (counts.get(p.language) ?? 0) + 1);
    }
    return {
      showcase: lead,
      rest: others,
      languages: [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
    };
  }, [projects]);

  const filtered = language === ALL ? rest : rest.filter((p) => p.language === language);

  return (
    <>
      {showcase.length > 0 && (
        <div className="mb-14 grid gap-6">
          {showcase.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <FeaturedProject project={p} onQuickView={() => setQuickView(p)} />
            </Reveal>
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <>
          {languages.length > 1 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {[[ALL, rest.length] as const, ...languages].map(([name, count]) => {
                const active = language === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setLanguage(name)}
                    aria-pressed={active}
                    className={
                      active
                        ? "rounded-full border border-(--brand-deep)/50 bg-(--chip-surface) px-3 py-1.5 text-xs font-semibold text-(--accent-on-chip) transition-colors"
                        : "border-border text-muted hover:border-foreground/30 hover:text-foreground rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                    }
                  >
                    {name}
                    <span className="ml-1.5 opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.05} className="h-full">
                <ProjectCard project={p} onQuickView={() => setQuickView(p)} />
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-muted py-8 text-center text-sm">No projects in {language} yet.</p>
          )}
        </>
      )}

      <ProjectQuickView project={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}
