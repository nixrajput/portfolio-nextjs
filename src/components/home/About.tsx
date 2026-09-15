import { Reveal } from "@/components/motion/Reveal";
import { AvatarPortrait } from "./AvatarPortrait";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { AnimatedStat } from "./AnimatedStat";
import { cn } from "@/utils/cn";

export type AboutProfile = {
  bio: string;
  stats: { years: number; repos: number; stars: number; followers: number };
  name?: string;
  avatarUrl?: string;
};

type StatGridProps = {
  stats: AboutProfile["stats"];
  className?: string;
};

function StatGrid({ stats, className }: StatGridProps) {
  const items: { value: number; label: string }[] = [
    { value: stats.years, label: "Years of experience" },
    { value: stats.repos, label: "Public repos" },
    { value: stats.stars, label: "GitHub stars" },
    { value: stats.followers, label: "GitHub followers" },
  ];

  return (
    // 2x2 on mobile, 4-across from md up. divide-y separates the mobile rows;
    // the vertical dividers only apply once the grid is a single row (md).
    <Card
      className={cn(
        "divide-border mt-12 grid grid-cols-2 divide-x divide-y p-0 md:grid-cols-4 md:divide-y-0",
        className,
      )}
    >
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
              <AvatarPortrait src={profile.avatarUrl} name={profile.name ?? "Nikhil Rajput"} />
            </Reveal>
          )}
        </div>

        <StatGrid stats={profile.stats} />
      </div>
    </Section>
  );
}

export default About;
