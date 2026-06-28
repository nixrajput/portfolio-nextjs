import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ServiceCard } from "./ServiceCard";
import type { Service } from "@/db/schema";

export type ServiceRow = Service;

export function Services({ services }: { services: ServiceRow[] }) {
  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <Section id="services" className="scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="Services" title="What I do" />
      </Reveal>

      {sorted.length === 0 ? (
        <Card className="flex items-center justify-center py-12 text-center">
          <p className="text-muted text-sm">No services listed yet.</p>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.05}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

export default Services;
