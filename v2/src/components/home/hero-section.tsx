"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FlipWords } from "@/components/ui/flip-words";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

const words = ["Nikhil Rajput.", "@nixrajput."];

function HeroSection({ className }: { className?: string }) {
  return (
    <div
      id="hero"
      className="relative h-auto min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 flex items-center w-full max-w-screen justify-center overflow-hidden"
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
                  words={words}
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
            <p className="text-sm md:text-base font-medium text-black dark:text-white">
              SDE • Open Source • Full Stack Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="bg-clip-text mt-6"
          >
            <Button
              variant="default"
              size="lg"
              className="w-full min-w-40 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 hover:opacity-90 hover:-translate-y-0.5 transition-all text-white"
            >
              Book a Call
              <IconArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

export default HeroSection;
