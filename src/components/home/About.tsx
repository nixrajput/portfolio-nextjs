import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { AnimatedStat } from "./AnimatedStat";
import { cn } from "@/utils/cn";

export type AboutProfile = {
  bio: string;
  stats: { years: number; repos: number; stars: number };
  name?: string;
  avatarUrl?: string;
};

type StatGridProps = {
  stats: AboutProfile["stats"];
  className?: string;
};

function StatGrid({ stats, className }: StatGridProps) {
  const items: { value: number; label: string }[] = [
    { value: stats.years, label: "Years building" },
    { value: stats.repos, label: "Public repos" },
    { value: stats.stars, label: "GitHub stars" },
  ];

  return (
    <Card className={cn("divide-border mt-12 grid grid-cols-3 divide-x p-0", className)}>
      {items.map(({ value, label }, i) => (
        <AnimatedStat key={label} value={value} label={label} delay={0.1 + i * 0.08} />
      ))}
    </Card>
  );
}

export function About({ profile }: { profile: AboutProfile }) {
  return (
    <Section id="about" className="scroll-mt-24">
      <div>
        <Reveal>
          <SectionHeading number="02" eyebrow="About" title="A bit about me" />
        </Reveal>

        <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:gap-14">
          <Reveal delay={0.08} className="min-w-0 flex-1">
            <div className="max-w-2xl space-y-4">
              {profile.bio
                .split(/\n\s*\n/)
                .map((para) => para.trim())
                .filter(Boolean)
                .map((para, i) => (
                  <p
                    key={`bio-${i}`}
                    className={
                      i === 0
                        ? "text-foreground/90 text-xl leading-relaxed font-medium sm:text-2xl"
                        : "text-muted text-base leading-relaxed sm:text-lg"
                    }
                  >
                    {para}
                  </p>
                ))}
            </div>
          </Reveal>

          {profile.avatarUrl && (
            <Reveal delay={0.14} className="mx-auto shrink-0 md:mx-0">
              <Parallax strength={28} className="group relative">
                {/* Gradient halo behind the portrait */}
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[2rem] bg-(image:--gradient-brand) opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-45"
                />
                <div className="border-border relative aspect-4/5 w-56 overflow-hidden rounded-3xl border backdrop-blur-sm sm:w-64">
                  <Image
                    src={profile.avatarUrl}
                    alt={`Portrait of ${profile.name ?? "Nikhil Rajput"}`}
                    fill
                    sizes="(max-width: 640px) 224px, 256px"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </Parallax>
            </Reveal>
          )}
        </div>

        <StatGrid stats={profile.stats} />
      </div>
    </Section>
  );
}

export default About;
