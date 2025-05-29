"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FlipWords } from "@/components/ui/flip-words";
import { motion } from "motion/react";

const words = ["Nikhil Rajput.", "@nixrajput."];

function HeroSection({ className }: { className?: string }) {
  return (
    <div
      id="hero"
      className="relative h-auto min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 flex items-center w-full max-w-screen justify-center overflow-hidden"
    >
      <BackgroundBeamsWithCollision className={className}>
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-clip-text"
          >
            Hi there! I am
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <FlipWords
                words={words}
                className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]"
              />
              <FlipWords
                words={words}
                className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4"
              />
            </div>
          </motion.div>
        </h2>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

export default HeroSection;
