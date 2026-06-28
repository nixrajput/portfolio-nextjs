"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ExperienceRow } from "@/lib/queries";

function Step({
  exp,
  index,
  total,
  progress,
}: {
  exp: ExperienceRow;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const slice = 1 / total;
  const start = index * slice;
  const mid = start + slice / 2;
  const end = start + slice;

  const opacity = useTransform(
    progress,
    [start, mid - slice * 0.2, mid + slice * 0.2, end],
    [0.2, 1, 1, 0.2],
  );
  const x = useTransform(progress, [start, mid], [40, 0]);

  return (
    <motion.div style={{ opacity, x }} className="absolute inset-0 flex flex-col justify-center">
      <p className="font-mono text-sm text-[var(--brand-cyan)]">{exp.period}</p>
      <h3 className="mt-2 text-3xl font-bold sm:text-4xl">{exp.role}</h3>
      <p className="text-foreground/70 mt-1 text-lg">{exp.org}</p>
      <ul className="text-foreground/70 mt-5 max-w-lg space-y-2">
        {exp.description.map((d, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[image:var(--gradient-brand)]" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProgressRail({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="bg-foreground/10 absolute top-0 left-0 h-full w-px">
      <motion.div
        style={{ scaleY }}
        className="h-full w-px origin-top bg-[image:var(--gradient-brand)]"
      />
    </div>
  );
}

export function Experience({ experiences }: { experiences: ExperienceRow[] }) {
  const reduce = useReducedMotion();
  const sorted = [...experiences].sort((a, b) => a.order - b.order);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduce) {
    return (
      <section id="experience" className="scroll-mt-24 px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-foreground/50 mb-12 font-mono text-sm tracking-widest uppercase">
            Experience
          </p>
          <ol className="border-foreground/10 space-y-12 border-l pl-6">
            {sorted.map((exp) => (
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
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="scroll-mt-24">
      {/* tall scroll track: one viewport-height of scroll per step */}
      <div ref={ref} style={{ height: `${sorted.length * 100}vh` }} className="relative">
        <div className="sticky top-0 flex h-screen items-center px-6">
          <div className="mx-auto w-full max-w-3xl">
            <p className="text-foreground/50 mb-10 font-mono text-sm tracking-widest uppercase">
              Experience
            </p>
            <div className="relative h-72 pl-6">
              <ProgressRail progress={scrollYProgress} />
              {sorted.map((exp, i) => (
                <Step
                  key={`${exp.org}-${exp.period}`}
                  exp={exp}
                  index={i}
                  total={sorted.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
