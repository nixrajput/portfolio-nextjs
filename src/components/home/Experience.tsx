"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/utils/cn";
import type { ExperienceRow } from "@/lib/queries";

function TimelineEntry({ exp, index, last }: { exp: ExperienceRow; index: number; last: boolean }) {
  const reduce = useReducedMotion();

  const inner = (
    <div className="flex gap-6">
      {/* Rail dot (the connector line is drawn once for the whole list) */}
      <div className="relative flex w-3 justify-center">
        <span className="bg-background z-10 mt-1 size-3 shrink-0 rounded-full border-2 border-(--brand-violet) ring-4 ring-(--brand-violet)/10" />
      </div>

      {/* Card content */}
      <div className={cn("pb-10", last && "pb-0")}>
        <p className="font-mono text-xs tracking-widest text-(--period) uppercase">{exp.period}</p>
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
              <li key={`${exp.id}-bullet-${i}`} className="text-muted flex gap-2 text-sm">
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
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);

  // Track scroll through the list and fill the connector rail as it passes.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const scaleY = useTransform(fill, [0, 1], [0, 1]);

  return (
    <Section id="experience" className="scroll-mt-24">
      {/* Two columns on lg+: a sticky intro fills the left while the timeline
          scrolls on the right, so the section uses the full width instead of
          leaving a large blank gutter. Stacks to one column below lg. */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading number="04" eyebrow="Experience" title="Where I've worked" />
          <p className="text-muted -mt-6 max-w-sm text-base leading-relaxed">
            A track record of shipping across startups and open source - each role a step in
            building faster, more reliable products.
          </p>
        </div>

        <div ref={listRef} className="relative">
          {/* Connector rail: faint track + a gradient fill that grows on scroll.
              Sits under the entry dots (which are z-10). */}
          {sorted.length > 1 && (
            <>
              <span aria-hidden className="bg-border absolute top-2 bottom-8 left-[5.5px] w-px" />
              <motion.span
                aria-hidden
                style={reduce ? { transform: "scaleY(1)" } : { scaleY }}
                className="absolute top-2 bottom-8 left-[5.5px] w-px origin-top bg-(image:--gradient-brand)"
              />
            </>
          )}
          <ol className="relative">
            {sorted.map((exp, index) => (
              <TimelineEntry
                key={exp.id}
                exp={exp}
                index={index}
                last={index === sorted.length - 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

export default Experience;
