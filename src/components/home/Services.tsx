import { Reveal } from "@/components/motion/Reveal";
import { ServiceCard } from "./ServiceCard";
import type { Service } from "@/db/schema";

export type ServiceRow = Service;

export function Services({ services }: { services: ServiceRow[] }) {
  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <section id="services" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-foreground/50 mb-2 font-mono text-sm tracking-widest uppercase">
            Services
          </p>
          <h2 className="mb-12 text-3xl font-bold sm:text-4xl">What I do</h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.05}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
