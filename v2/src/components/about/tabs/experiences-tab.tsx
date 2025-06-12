"use client";

import { Timeline } from "@/components/ui/timeline";
import { defaultExperiences } from "@/data";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types";
import { motion } from "motion/react";

interface ExperiencesTabProps {
  experiences?: Experience[];
  className?: string;
}

const ExperiencesTab = ({
  experiences = defaultExperiences,
  className,
}: ExperiencesTabProps) => {
  return (
    <div className={cn("w-full flex flex-col relative", className)}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Timeline
          data={experiences.map((experience, idx) => ({
            title: experience.date,
            content: (
              <div key={`experience-${experience.company}-${idx}`}>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {experience.title}
                </h3>

                <p className="text-purple-500 text-base font-normal">
                  {experience.company}
                </p>

                <p className="text-neutral-700 dark:text-neutral-300 mt-2 text-base font-normal">
                  {experience.description}
                </p>
              </div>
            ),
          }))}
        />
      </motion.div>
    </div>
  );
};

export default ExperiencesTab;
