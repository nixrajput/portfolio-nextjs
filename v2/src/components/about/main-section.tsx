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
      className="relative h-auto py-20 md:py-32 flex flex-col items-center w-full max-w-screen justify-center overflow-hidden px-4 md:px-8"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative flex flex-col items-center mx-auto z-10 w-full max-w-screen gap-16"
      >
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
      </motion.div>
    </div>
  );
};

export default MainSection;
