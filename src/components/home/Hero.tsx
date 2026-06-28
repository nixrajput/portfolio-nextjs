"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Heart, Sparkles } from "lucide-react";
import { Aurora } from "@/components/background/Aurora";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { FlipWords } from "./FlipWords";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type HeroProfile = {
  name: string;
  roles: string[];
  avatarUrl: string;
  blurDataURL?: string;
  resumeUrl?: string;
};

export function Hero({
  profile,
  sponsorUrl,
  tagline,
}: {
  profile: HeroProfile;
  sponsorUrl?: string;
  tagline: string;
}) {
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
        {/* Text column */}
        <div className="text-center md:text-left">
          {/* Motto pill */}
          <Reveal>
            <span className="bg-surface border-border mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
              <Sparkles className="size-3.5 text-violet-500" aria-hidden />
              <span className="text-muted">{tagline}</span>
            </span>
          </Reveal>

          {/* Eyebrow */}
          <Reveal delay={0.05}>
            <h1 className="text-muted font-mono text-sm tracking-widest uppercase">Hi, I&apos;m</h1>
          </Reveal>

          {/* Name */}
          <Reveal delay={0.1}>
            <p className="gradient-text mt-1 text-5xl leading-tight font-bold text-balance sm:text-6xl md:text-7xl">
              {profile.name}
            </p>
          </Reveal>

          {/* Role cycler */}
          <Reveal delay={0.15}>
            <div className="mt-4 text-xl font-medium sm:text-2xl">
              <span className="text-muted">I&apos;m </span>
              <FlipWords words={profile.roles} showArticle className="text-foreground" />
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Button variant="primary" size="lg" href="#projects">
                View work
              </Button>
              {sponsorUrl && (
                <Button
                  variant="secondary"
                  size="lg"
                  href={sponsorUrl}
                  leftIcon={<Heart className="size-4" aria-hidden />}
                >
                  Sponsor
                </Button>
              )}
            </div>
          </Reveal>
        </div>

        {/* Photo column */}
        <Reveal delay={0.2} className="justify-self-center">
          <div className="relative aspect-square w-48 sm:w-60 md:w-72 lg:w-80">
            {/* Gradient glow ring */}
            <div className="absolute inset-0 -z-10 rounded-full bg-[image:var(--gradient-brand)] opacity-30 blur-2xl" />
            <Image
              src={profile.avatarUrl}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, (max-width: 1024px) 288px, 320px"
              placeholder={profile.blurDataURL ? "blur" : "empty"}
              blurDataURL={profile.blurDataURL}
              className="rounded-full border border-white/20 object-cover shadow-2xl"
            />
          </div>
        </Reveal>
      </motion.div>

      {/* Scroll-down chevron */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        style={{ opacity }}
        className="text-muted hover:text-foreground absolute bottom-8 left-1/2 -translate-x-1/2 transition-colors"
      >
        <ArrowDown className="size-5 animate-bounce motion-reduce:animate-none" aria-hidden />
      </motion.a>
    </section>
  );
}

export default Hero;
