"use client";

import SectionTitle from "@/components/common/section-title";
import { motion } from "motion/react";
import ProfileCard from "./profile-card";
import ProfileTabs from "./profile-tabs";
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
          const animations = [
            {
              initial: { x: "-30%", y: "-20%" },
              animate: { x: "30%", y: "20%" },
              scale: 0.8,
              duration: 15,
            },
            {
              initial: { x: "20%", y: "-40%" },
              animate: { x: "-20%", y: "40%" },
              scale: 0.7,
              duration: 18,
            },
            {
              initial: { x: "-20%", y: "30%" },
              animate: { x: "20%", y: "-30%" },
              scale: 0.6,
              duration: 13,
            },
            {
              initial: { x: "40%", y: "30%" },
              animate: { x: "-40%", y: "-30%" },
              scale: 0.9,
              duration: 16,
            },
            {
              initial: { x: "10%", y: "60%" },
              animate: { x: "-10%", y: "-60%" },
              scale: 0.7,
              duration: 14,
            },
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
                ...animations[i].initial,
                scale: animations[i].scale,
                opacity: 0,
              }}
              animate={{
                ...animations[i].animate,
                scale: animations[i].scale,
                opacity: 0.3,
              }}
              transition={{
                duration: animations[i].duration,
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

      <div className="relative flex flex-col items-center mx-auto z-10 w-full max-w-screen gap-16">
        {/* Section title */}
        <SectionTitle title="About" highlightText="Me" />

        {/* Main content */}
        <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start w-full min-h-[20rem] md:min-h-[30rem]">
          {/* Profile card */}
          <ProfileCard />

          {/* Bio skills and experience */}
          <ProfileTabs />
        </div>

        {/* Stats section */}
        <StatsSection />
      </div>
    </div>
  );
};

export default MainSection;
