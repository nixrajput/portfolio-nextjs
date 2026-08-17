import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProjectsBrowser } from "./ProjectsBrowser";
import type { MergedProject } from "@/lib/projects";

const GITHUB_PROFILE = "https://github.com/nixrajput";

/** Server shell: heading and CTA stay server-rendered, and ProjectsBrowser owns the
 *  parts that need selection state (showcase, filter, grid, quick view). */
export function Projects({ projects }: { projects: MergedProject[] }) {
  return (
    <Section id="projects" className="scroll-mt-24">
      <Reveal>
        <SectionHeading number="05" eyebrow="Projects" title="Featured work" />
      </Reveal>

      <ProjectsBrowser projects={projects} />

      <div className="mt-12 text-center">
        <Magnetic>
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
        </Magnetic>
      </div>
    </Section>
  );
}

export default Projects;
