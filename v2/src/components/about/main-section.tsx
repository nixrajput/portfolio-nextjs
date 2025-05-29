"use client";

import { motion } from "motion/react";
import BioSkillsSection from "./bio-skills-section";
import ProfileCard from "./profile-card";
import SectionTitle from "./section-title";
import StatsSection from "./stats-section";

const MainSection = () => {
  return (
    <div
      id="about"
      className="relative h-auto py-20 md:py-32 bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 flex flex-col items-center w-full max-w-screen justify-center overflow-hidden px-4 md:px-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => {
          // Use deterministic values based on index instead of random
          const positions = [
            { x: "-30%", y: "-20%", scale: 0.8, duration: 15 },
            { x: "20%", y: "-40%", scale: 0.7, duration: 18 },
            { x: "-20%", y: "30%", scale: 0.6, duration: 13 },
            { x: "40%", y: "30%", scale: 0.9, duration: 16 },
            { x: "10%", y: "60%", scale: 0.7, duration: 14 },
          ];

          const sizes = [
            { width: 400, height: 400 },
            { width: 300, height: 300 },
            { width: 500, height: 500 },
            { width: 350, height: 350 },
            { width: 450, height: 450 },
          ];

          return (
            <motion.div
              key={i}
              className="absolute bg-purple-500/5 dark:bg-purple-500/10 rounded-full"
              initial={{
                x: positions[i].x,
                y: positions[i].y,
                scale: positions[i].scale,
                opacity: 0,
              }}
              animate={{
                x:
                  positions[i].x === "-30%"
                    ? "30%"
                    : positions[i].x === "30%"
                    ? "-30%"
                    : positions[i].x === "20%"
                    ? "-20%"
                    : positions[i].x === "-20%"
                    ? "20%"
                    : "0%",
                y:
                  positions[i].y === "-40%"
                    ? "40%"
                    : positions[i].y === "40%"
                    ? "-40%"
                    : positions[i].y === "30%"
                    ? "-30%"
                    : positions[i].y === "-30%"
                    ? "30%"
                    : "0%",
                scale: positions[i].scale,
                opacity: 0.3,
              }}
              transition={{
                duration: positions[i].duration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                width: sizes[i].width,
                height: sizes[i].height,
                filter: "blur(80px)",
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section title */}
        <SectionTitle />

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Profile card */}
          <ProfileCard />

          {/* Bio and skills */}
          <BioSkillsSection />
        </div>

        {/* Stats section */}
        <StatsSection />
      </div>
    </div>
  );
};

export default MainSection;
