"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/utils/cn";
import type { ExperienceRow } from "@/lib/queries";

function TimelineEntry({ exp, index, last }: { exp: ExperienceRow; index: number; last: boolean }) {
  const reduce = useReducedMotion();

  const inner = (
    <div className="flex gap-6">
      {/* Rail: dot + line */}
      <div className="flex flex-col items-center">
        <span className="bg-background mt-1 size-3 shrink-0 rounded-full border-2 border-(--brand-violet) ring-4 ring-(--brand-violet)/10" />
        {!last && <span className="bg-border mt-1 w-px flex-1" />}
      </div>

      {/* Card content */}
      <div className={cn("pb-10", last && "pb-0")}>
        <p className="font-mono text-xs tracking-widest text-(--brand-cyan) uppercase">
          {exp.period}
        </p>
        <h3 className="mt-1 text-xl font-bold">{exp.role}</h3>
        <div className="text-muted mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm">
          <span>{exp.org}</span>
          {exp.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3" aria-hidden />
              {exp.location}
            </span>
          )}
        </div>
        {exp.description.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {exp.description.map((d, i) => (
              <li key={i} className="text-muted flex gap-2 text-sm">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-(image:--gradient-brand)" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  if (reduce) {
    return <li>{inner}</li>;
  }

  return (
    <motion.li
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
    >
      {inner}
    </motion.li>
  );
}

export function Experience({ experiences }: { experiences: ExperienceRow[] }) {
  const sorted = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <Section id="experience" className="scroll-mt-24">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />
      <ol className="max-w-2xl">
        {sorted.map((exp, index) => (
          <TimelineEntry
            key={`${exp.org}-${exp.period}`}
            exp={exp}
            index={index}
            last={index === sorted.length - 1}
          />
        ))}
      </ol>
    </Section>
  );
}

export default Experience;
