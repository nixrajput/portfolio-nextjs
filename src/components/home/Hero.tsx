"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type HeroProfile = {
  name: string;
  roles: string[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Entrance helper: fade-up at a choreographed delay. */
function fadeUp(reduce: boolean, delay: number) {
  return {
    initial: reduce ? false : ({ opacity: 0, y: 22 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  };
}

/**
 * Viewport-scale two-line name rising out of overflow masks, over the page-wide
 * AmbientBackground, with a local scrim guaranteeing text contrast in both themes.
 */
export function Hero({
  profile,
  sponsorUrl,
  heroTagline,
}: {
  profile: HeroProfile;
  sponsorUrl?: string;
  heroTagline?: string | null;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");
  // Duplicated track (x2) so the -50% translate loops seamlessly.
  const marqueeItems = [...profile.roles, ...profile.roles];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-svh scroll-mt-24 flex-col justify-center overflow-hidden"
    >
      {/* Text-protection scrim: quiets the gradient under the type only */}
      <div aria-hidden className="hero-scrim pointer-events-none absolute inset-0" />

      <motion.div style={{ y, opacity }} className="site-container relative">
        {/* Status chip — a glowing brand dot + the tagline (an AI-era signal,
            not personal data). No label; the pulsing dot reads as "live". */}
        {heroTagline && (
          <motion.p {...fadeUp(reduce, 0.35)} className="mb-[2.6vh]">
            <span className="border-border bg-surface text-muted inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[9px] tracking-[0.18em] uppercase backdrop-blur-sm sm:text-[10px]">
              <span
                aria-hidden
                className="size-1.5 animate-pulse rounded-full bg-(image:--gradient-brand) shadow-[0_0_8px_2px_rgb(var(--brand-deep-rgb)/0.6)] motion-reduce:animate-none"
              />
              {heroTagline}
            </span>
          </motion.p>
        )}

        {/* Name: two masked lines, solid + stroke */}
        <h1 className="leading-[0.92] font-extrabold tracking-tight uppercase select-none">
          <span className="block overflow-hidden">
            <motion.span
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              className="block text-[clamp(44px,16.5vw,90px)] sm:text-[clamp(50px,13.5vw,190px)]"
            >
              {first}
            </motion.span>
          </span>
          {last && (
            <span className="block overflow-hidden">
              <motion.span
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
                className="text-stroke-name block text-[clamp(44px,16.5vw,90px)] sm:text-[clamp(50px,13.5vw,190px)]"
              >
                {last}
              </motion.span>
            </span>
          )}
        </h1>

        {/* Hairline rule drawing in from the left */}
        <motion.div
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.05 }}
          className="bg-border mt-[4.2vh] h-px origin-left"
        />

        {/* Roles marquee (decorative; roles appear in page copy elsewhere) */}
        <motion.div
          {...fadeUp(reduce, 1.25)}
          aria-hidden="true"
          data-testid="hero-marquee"
          className="text-muted mt-[2.6vh] overflow-hidden mask-[linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] font-mono text-[13px] whitespace-nowrap sm:text-[15px]"
        >
          <span className={reduce ? "inline-block" : "hero-marquee-track inline-block"}>
            {marqueeItems.map((role, i) => (
              <span key={`${role}-${i}`} className="mx-[1.4em]">
                {role} <span className="ml-[1.4em] opacity-40">✦</span>
              </span>
            ))}
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUp(reduce, 1.4)} className="mt-[4.4vh] flex flex-wrap gap-4">
          <Magnetic>
            <Button variant="primary" size="lg" href="#projects">
              View work <ArrowRight className="size-4" aria-hidden />
            </Button>
          </Magnetic>
          {sponsorUrl && (
            <Magnetic>
              <Button
                variant="secondary"
                size="lg"
                href={sponsorUrl}
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<Heart className="size-4" aria-hidden />}
              >
                Sponsor
              </Button>
            </Magnetic>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
