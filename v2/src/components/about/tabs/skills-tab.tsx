"use client";

import { Badge } from "@/components/ui/badge";
import { defaultSkillLists } from "@/data";
import { cn } from "@/lib/utils";
import type { ISkillList } from "@/types";
import { motion } from "motion/react";
import Image from "next/image";

interface SkillsTabProps {
  skillLists?: ISkillList[];
  className?: string;
}

const SkillsTab = ({
  skillLists = defaultSkillLists,
  className,
}: SkillsTabProps) => {
  return (
    <div className={cn("w-full flex flex-col relative", className)}>
      <div className="relative w-full flex flex-col gap-6">
        {skillLists.map((skillCategory, idx) => (
          <motion.div
            key={`skill-list-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold text-black dark:text-white">
              {skillCategory.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {skillCategory.items.map((skill, childIdx) => (
                <motion.div
                  key={`skill-${childIdx}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: childIdx * 0.15 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm flex items-center gap-2 rounded-full"
                  >
                    {skill.icon ? (
                      <Image
                        src={skill.icon}
                        alt={`logo-${skill.name}`}
                        width={48}
                        height={48}
                        sizes="100%"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPg=="
                        className="w-5 lg:w-6 h-auto aspect-square object-cover"
                      />
                    ) : null}

                    <span className="text-xs font-semibold">{skill.name}</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsTab;
