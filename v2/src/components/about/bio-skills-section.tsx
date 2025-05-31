"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";

const skills = [
  { name: "React.js", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "TailwindCSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Flutter", category: "mobile" },
  { name: "React Native", category: "mobile" },
  { name: "Firebase", category: "cloud" },
  { name: "AWS", category: "cloud" },
  { name: "Docker", category: "devops" },
  { name: "Git", category: "devops" },
];

const BioSkillsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      viewport={{ once: true }}
      className="lg:col-span-8"
    >
      <Card className="border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <Tabs defaultValue="bio" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="bio">Biography</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="bio" className="space-y-4">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Hello there! 👋
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                I&apos;m Nikhil Rajput, a passionate full-stack developer with
                over 5 years of experience building web and mobile applications.
                I specialize in creating robust, scalable, and user-friendly
                solutions that solve real-world problems.
              </p>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                My journey in software development began during my college years
                when I built my first web application. Since then, I&apos;ve
                worked with various technologies and frameworks, always eager to
                learn and adapt to the ever-evolving tech landscape.
              </p>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                When I&apos;m not coding, you can find me exploring new
                technologies, contributing to open-source projects, or sharing
                my knowledge through blog posts and tutorials. I believe in
                continuous learning and giving back to the community that has
                helped me grow.
              </p>
            </TabsContent>

            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm"
                        >
                          {skill.name}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                    Soft Skills
                  </h3>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      Problem Solving
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      Team Collaboration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      Project Management
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      Communication
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      Adaptability
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experience">
              <div className="space-y-6">
                <div className="relative pl-8 border-l border-neutral-200 dark:border-neutral-800">
                  <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-2 top-0"></div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Senior Software Engineer
                  </h3>
                  <p className="text-purple-500 font-medium">
                    TechCorp Inc. (2023 - Present)
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-300 mt-2">
                    Leading development of enterprise-level web applications
                    using React, Next.js, and Node.js. Managing a team of 5
                    developers and implementing CI/CD pipelines.
                  </p>
                </div>

                <div className="relative pl-8 border-l border-neutral-200 dark:border-neutral-800">
                  <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-2 top-0"></div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Full Stack Developer
                  </h3>
                  <p className="text-purple-500 font-medium">
                    WebSolutions Ltd. (2020 - 2023)
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-300 mt-2">
                    Developed and maintained multiple client projects using MERN
                    stack. Implemented responsive designs and optimized
                    application performance.
                  </p>
                </div>

                <div className="relative pl-8 border-l border-neutral-200 dark:border-neutral-800">
                  <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-2 top-0"></div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Junior Developer
                  </h3>
                  <p className="text-purple-500 font-medium">
                    StartupHub (2018 - 2020)
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-300 mt-2">
                    Assisted in developing frontend components using React.
                    Collaborated with designers to implement UI/UX designs.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BioSkillsSection;
