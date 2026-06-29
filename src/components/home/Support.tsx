import { Heart, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export type FundingRow = {
  label: string;
  url: string;
  primary: boolean;
  order: number;
};

export function Support({ funding }: { funding: FundingRow[] }) {
  const sorted = [...funding].sort((a, b) => a.order - b.order);
  const primary = sorted.find((f) => f.primary) ?? sorted[0];
  const rest = sorted.filter((f) => f !== primary);

  if (!primary) return null;

  return (
    <Section id="support" className="scroll-mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionHeading eyebrow="Support" title="Support my open-source work" className="mb-4" />
          <p className="text-foreground/70 mb-10 leading-relaxed">
            Most of what I build is free and open source. If it helps you, supporting its continued
            development is genuinely appreciated.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              href={primary.url}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<Heart className="size-4" aria-hidden />}
            >
              {primary.label}
            </Button>
            {rest.map((f) => (
              <Button
                key={f.label}
                href={f.url}
                variant="secondary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {f.label} <ArrowUpRight className="size-4" aria-hidden />
              </Button>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default Support;
