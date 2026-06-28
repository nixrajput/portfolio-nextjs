"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ExperienceRow } from "@/lib/queries";

function TimelineEntry({ exp, index }: { exp: ExperienceRow; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <p className="font-mono text-sm text-[var(--brand-cyan)]">{exp.period}</p>
      <h3 className="mt-1 text-2xl font-bold sm:text-3xl">{exp.role}</h3>
      <p className="text-foreground/70 mt-0.5 text-base">{exp.org}</p>
      <ul className="text-foreground/70 mt-4 space-y-2">
        {exp.description.map((d, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[image:var(--gradient-brand)]" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

export function Experience({ experiences }: { experiences: ExperienceRow[] }) {
  const reduce = useReducedMotion();
  const sorted = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-foreground/50 mb-12 font-mono text-sm tracking-widest uppercase">
          Experience
        </p>
        <ol className="border-foreground/10 space-y-12 border-l pl-6">
          {sorted.map((exp, index) =>
            reduce ? (
              <li key={`${exp.org}-${exp.period}`}>
                <p className="font-mono text-sm text-[var(--brand-cyan)]">{exp.period}</p>
                <h3 className="mt-1 text-2xl font-bold">{exp.role}</h3>
                <p className="text-foreground/70">{exp.org}</p>
                <ul className="text-foreground/70 mt-3 space-y-1.5">
                  {exp.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </li>
            ) : (
              <TimelineEntry key={`${exp.org}-${exp.period}`} exp={exp} index={index} />
            ),
          )}
        </ol>
      </div>
    </section>
  );
}

export default Experience;
