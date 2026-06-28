"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Heart } from "lucide-react";
import { Aurora } from "@/components/background/Aurora";
import { Reveal } from "@/components/motion/Reveal";
import { FlipWords } from "./FlipWords";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type HeroProfile = {
  name: string;
  headline: string;
  roles: string[];
  avatarUrl: string;
  blurDataURL?: string;
  resumeUrl?: string;
  availableForWork: boolean;
};

export function Hero({ profile, sponsorUrl }: { profile: HeroProfile; sponsorUrl?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] scroll-mt-24 items-center justify-center overflow-hidden px-6"
    >
      <Aurora />

      <motion.div
        style={{ y, opacity }}
        className="mx-auto grid max-w-5xl items-center gap-10 py-28 md:grid-cols-[1.4fr_1fr]"
      >
        <div className="text-center md:text-left">
          {profile.availableForWork && (
            <Reveal>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Available for work
              </span>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <h1 className="text-foreground/60 font-mono text-sm tracking-widest uppercase">
              Hi, I&apos;m
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="gradient-text mt-1 text-5xl leading-tight font-bold text-balance sm:text-6xl md:text-7xl">
              {profile.name}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="text-foreground/80 mt-4 text-xl font-medium sm:text-2xl">
              <span className="text-foreground/60">I&apos;m a </span>
              <FlipWords words={profile.roles} className="text-foreground" />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-foreground/70 mx-auto mt-5 max-w-md text-pretty md:mx-0">
              {profile.headline}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="#projects"
                className="rounded-full bg-[image:var(--gradient-brand)] px-6 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
              >
                View work
              </a>
              {sponsorUrl && (
                <a
                  href={sponsorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-foreground/20 text-foreground hover:bg-foreground/5 flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors"
                >
                  <Heart className="size-4" aria-hidden /> Sponsor
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="justify-self-center">
          <div className="relative aspect-square w-48 sm:w-60 md:w-72 lg:w-80">
            <div className="absolute inset-0 -z-10 rounded-full bg-[image:var(--gradient-brand)] opacity-30 blur-2xl" />
            <Image
              src={profile.avatarUrl}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(max-width: 768px) 240px, 320px"
              placeholder={profile.blurDataURL ? "blur" : "empty"}
              blurDataURL={profile.blurDataURL}
              className="rounded-full border border-white/20 object-cover shadow-2xl"
            />
          </div>
        </Reveal>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        style={{ opacity }}
        className="text-foreground/50 hover:text-foreground absolute bottom-8 left-1/2 -translate-x-1/2 transition-colors"
      >
        <ArrowDown className="size-5 animate-bounce motion-reduce:animate-none" aria-hidden />
      </motion.a>
    </section>
  );
}

export default Hero;
