"use client";

import { LiquidGlassButton } from "@/components/common/liquid-glass-button";
import { FlipWords } from "@/components/ui/flip-words";
import { names, roles } from "@/data";
import { cn } from "@/lib/utils";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";

function HeroSection({ className }: { className?: string }) {
  return (
    <div
      id="hero"
      className={cn(
        "relative h-auto min-h-screen flex items-center w-full max-w-screen justify-center overflow-hidden",
        className
      )}
      role="banner"
      aria-label="Hero section with introduction"
    >
      <BackgroundBeamsWithCollision className={className}>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-clip-text"
            >
              Hi there! I am
              <div className="relative mx-auto inline-block w-max">
                <FlipWords
                  words={names}
                  duration={6000}
                  className="bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4 [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]"
                />
              </div>
            </motion.div>
          </h2>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-clip-text"
          >
            <FlipWords
              words={roles}
              duration={2000}
              className="text-sm md:text-base font-medium text-black dark:text-white"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="bg-clip-text mt-6"
          >
            <LiquidGlassButton size="lg">
              Book a Call
              <IconArrowRight className="ml-2 h-4 w-4" />
            </LiquidGlassButton>
          </motion.div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

export default HeroSection;
