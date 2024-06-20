"use client";

import { motion } from "framer-motion";
import ResumeButton from "./ResumeButton";
import TalkButton from "./TalkButton";

const HeroButtons = () => {
  return (
    <motion.div
      className="gap-4 mt-12 lg:mt-16 flex flex-col md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "linear",
        delay: 5,
      }}
    >
      <TalkButton />
      <ResumeButton />
    </motion.div>
  );
};

export default HeroButtons;
