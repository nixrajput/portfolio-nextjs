import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "./ProjectCard";
import type { MergedProject } from "@/lib/projects";

const GITHUB_PROFILE = "https://github.com/nixrajput";

export function Projects({ projects }: { projects: MergedProject[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-foreground/50 mb-2 font-mono text-sm tracking-widest uppercase">
            Projects
          </p>
          <h2 className="mb-12 text-3xl font-bold sm:text-4xl">Featured work</h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {rest.length > 0 && (
          <>
            <h3 className="text-foreground/70 mt-16 mb-4 text-sm font-semibold">
              More repositories
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.htmlUrl ?? `https://github.com/nixrajput/${p.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-foreground/10 flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-colors hover:border-[var(--brand-violet)]/40"
                  >
                    <span className="font-medium">{p.title}</span>
                    <span className="text-foreground/50">★ {p.stars ?? "—"}</span>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-12 text-center">
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="border-foreground/20 hover:bg-foreground/5 inline-flex items-center gap-1.5 rounded-full border px-6 py-3 text-sm font-semibold transition-colors"
          >
            View all on GitHub <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
