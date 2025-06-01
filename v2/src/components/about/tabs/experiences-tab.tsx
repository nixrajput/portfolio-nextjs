"use client";

import { Timeline } from "@/components/ui/timeline";
import { motion } from "motion/react";

interface Experience {
  title: string;
  company: string;
  date: string;
  description: string;
}

interface ExperiencesTabProps {
  experiences?: Experience[];
}

const defaultExperiences: Experience[] = [
  {
    title: "Junior Software Development Engineer",
    company: "StarApps Studio",
    date: "Jul 2024 - Present",
    description:
      "Developing innovative software solutions. Contributing to large-scale projects with a focus on performance optimization. Collaborating closely with cross-functional teams to ensure product quality. Adhering to clean code practices and modern development techniques.",
  },
  {
    title: "Full Stack Developer",
    company: "Merito",
    date: "Feb 2023 - Jul 2024",
    description:
      "Developed over 5 web applications with seamless backend API integration. Streamlined workflows by eliminating redundant data, boosting efficiency. Improved website loading time by 80% through image optimization, minimizing main-thread work, and implementing SEO strategies. Resolved 100+ bugs and conducted thorough code reviews. Demonstrated expertise in both backend and frontend development.",
  },
  {
    title: "Full Stack Development Intern",
    company: "TECHOX LLP",
    date: "May 2021 - Jul 2022",
    description:
      "Revamped and enhanced 3+ mobile apps using Flutter. Deployed RESTful APIs for seamless app-server integration. Integrated Google AdMob to effectively monetize applications. Contributed to boosting app functionality and revenue generation.",
  },
];

const ExperiencesTab = ({
  experiences = defaultExperiences,
}: ExperiencesTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Timeline
        data={experiences.map((experience, idx) => ({
          title: experience.date,
          content: (
            <div key={`experience-${idx}`}>
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
      {/* <div className="space-y-6">
        {experiences.map((experience, index) => (
          <motion.div
            key={`experience-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative pl-8 border-l border-neutral-200 dark:border-neutral-800"
          >
            <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-2 top-0"></div>

            <h3 className="text-lg font-semibold text-black dark:text-white">
              {experience.title}
            </h3>

            <p className="text-purple-500 text-base font-normal">
              {experience.company} ({experience.date})
            </p>

            <p className="text-neutral-700 dark:text-neutral-300 mt-2 text-base font-normal">
              {experience.description}
            </p>

            <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-2 bottom-0 hidden last-of-type:block"></div>
          </motion.div>
        ))}
      </div> */}
    </motion.div>
  );
};

export default ExperiencesTab;
