"use client";

import { AnimatedTabs } from "@/components/ui/animated-tabs";
import BioTab from "./tabs/bio-tab";
import ExperiencesTab from "./tabs/experiences-tab";
import SkillsTab from "./tabs/skills-tab";

interface Tab {
  title: string;
  value: string;
  content?: string | React.ReactNode;
}

interface ProfileTabsProps {
  tabs?: Tab[];
}

const defaultProfileTabs: Tab[] = [
  {
    title: "Biography",
    value: "bio",
    content: (
      <div className="w-full overflow-y-scroll relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
        <BioTab />
      </div>
    ),
  },

  {
    title: "Skills",
    value: "skills",
    content: (
      <div className="w-full overflow-y-scroll relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold text-black dark:text-white bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
        <SkillsTab />
      </div>
    ),
  },

  {
    title: "Experience",
    value: "experience",
    content: (
      <div className="w-full overflow-y-scroll relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold text-black dark:text-white bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
        <ExperiencesTab />
      </div>
    ),
  },
];

const ProfileTabs = ({ tabs = defaultProfileTabs }: ProfileTabsProps) => {
  return (
    <div className="h-[20rem] md:h-[30rem] [perspective:1000px] relative flex flex-col flex-1 mx-auto w-full items-start justify-start">
      <AnimatedTabs tabs={tabs} />
    </div>
  );
};

export default ProfileTabs;
