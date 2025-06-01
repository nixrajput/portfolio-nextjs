"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import Image from "next/image";

interface Skill {
  name: string;
  icon: string;
  level: string;
}

interface ISkillList {
  title: string;
  items: Skill[];
}

interface SkillsTabProps {
  skillList?: ISkillList[];
}

const defaultSkills: ISkillList[] = [
  {
    title: "Programming Languages",
    items: [
      {
        name: "JavaScript",
        level: "Expert",
        icon: "/skills/javascript.svg",
      },
      {
        name: "TypeScript",
        level: "Intermediate",
        icon: "/skills/typescript.svg",
      },
      {
        name: "Ruby",
        level: "Intermediate",
        icon: "/skills/ruby.png",
      },
      {
        name: "Dart",
        level: "Expert",
        icon: "/skills/dart.svg",
      },
      {
        name: "Python",
        level: "Intermediate",
        icon: "/skills/python.png",
      },
    ],
  },
  {
    title: "Frontend Development",
    items: [
      {
        name: "Next.js",
        level: "Expert",
        icon: "/skills/nextjs.png",
      },
      {
        name: "React.js",
        level: "Expert",
        icon: "/skills/react.svg",
      },
      {
        name: "HTML",
        level: "Expert",
        icon: "/skills/html.svg",
      },
      {
        name: "CSS",
        level: "Intermediate",
        icon: "/skills/css.svg",
      },
      {
        name: "SASS/SCSS",
        level: "Intermediate",
        icon: "/skills/sass.svg",
      },
      {
        name: "Redux Toolkit",
        level: "Expert",
        icon: "/skills/redux.svg",
      },
    ],
  },
  {
    title: "Backend Development",
    items: [
      {
        name: "Node.js",
        level: "Expert",
        icon: "/skills/nodejs.svg",
      },
      {
        name: "Express.js",
        level: "Expert",
        icon: "/skills/express.svg",
      },
      {
        name: "Ruby on Rails",
        level: "Intermediate",
        icon: "/skills/rails.png",
      },
      {
        name: "Socket.io",
        level: "Intermediate",
        icon: "/skills/socket-io.png",
      },
    ],
  },
  {
    title: "Mobile App Development",
    items: [
      {
        name: "Flutter",
        level: "Expert",
        icon: "/skills/flutter.svg",
      },
      {
        name: "GetX",
        level: "Expert",
        icon: "/skills/getx.png",
      },
    ],
  },
  {
    title: "Database Management",
    items: [
      {
        name: "MongoDB",
        level: "Intermediate",
        icon: "/skills/mongodb.svg",
      },
      {
        name: "PostgreSQL",
        level: "Intermediate",
        icon: "/skills/postgresql.svg",
      },
      {
        name: "MySQL",
        level: "Beginner",
        icon: "/skills/mysql.svg",
      },
    ],
  },
  {
    title: "DevOps/VCS",
    items: [
      {
        name: "Docker",
        level: "Beginner",
        icon: "/skills/docker.png",
      },
      {
        name: "AWS",
        level: "Intermediate",
        icon: "/skills/aws.svg",
      },
      {
        name: "Git",
        level: "Expert",
        icon: "/skills/git.svg",
      },
      {
        name: "GitHub",
        level: "Expert",
        icon: "/skills/github.svg",
      },
    ],
  },
  {
    title: "Miscellaneous",
    items: [
      {
        name: "Firebase",
        level: "Intermediate",
        icon: "/skills/firebase.svg",
      },
      {
        name: "Ubuntu",
        level: "Intermediate",
        icon: "/skills/ubuntu.png",
      },
    ],
  },
  {
    title: "Nontechnical Skills",
    items: [
      {
        name: "Problem Solving",
        level: "Expert",
        icon: "/images/logical-thinking.png",
      },
      {
        name: "Collaboration",
        level: "Expert",
        icon: "/images/collaboration.png",
      },
      {
        name: "Analytical Skills",
        level: "Expert",
        icon: "/images/analytical-skills.png",
      },
    ],
  },
];

const SkillsTab = ({ skillList = defaultSkills }: SkillsTabProps) => {
  return (
    <div>
      <div className="relative w-full flex flex-col gap-6">
        {skillList.map((skillList, idx) => (
          <motion.div
            key={`skill-list-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold text-black dark:text-white">
              {skillList.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {skillList.items.map((skill, childIdx) => (
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
                        blurDataURL="/images/logical-thinking.png"
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
