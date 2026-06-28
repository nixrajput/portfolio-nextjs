import { Star, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "./ProjectCard";
import type { MergedProject } from "@/lib/projects";

const GITHUB_PROFILE = "https://github.com/nixrajput";

export function Projects({ projects }: { projects: MergedProject[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" className="scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="Projects" title="Featured work" />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.05} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      {rest.length > 0 && (
        <div className="mt-16">
          <h3 className="text-muted mb-4 text-sm font-semibold tracking-wider uppercase">
            More repositories
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <li key={p.id}>
                <a
                  href={p.htmlUrl ?? `https://github.com/nixrajput/${p.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-surface hover:bg-surface-2 hover:border-foreground/20 flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-colors"
                >
                  <span className="truncate font-medium">{p.title}</span>
                  <span className="text-muted ml-3 flex shrink-0 items-center gap-1">
                    <Star className="size-3.5" aria-hidden />
                    {p.stars ?? "—"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-12 text-center">
        <Button
          href={GITHUB_PROFILE}
          variant="secondary"
          size="md"
          target="_blank"
          rel="noopener noreferrer"
          leftIcon={<ArrowUpRight className="size-4" aria-hidden />}
        >
          View all on GitHub
        </Button>
      </div>
    </Section>
  );
}

export default Projects;
