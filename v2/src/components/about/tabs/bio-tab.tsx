import { motion } from "motion/react";

const BioTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold text-black dark:text-white">
          Hello there! 👋
        </h3>

        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base font-normal mt-4">
          I&apos;m Nikhil Rajput, a passionate full-stack developer with over 2
          years of experience building web and mobile applications. I specialize
          in creating robust, scalable, and user-friendly solutions that solve
          real-world problems.
        </p>

        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base font-normal mt-4">
          My journey in software development began during my college years when
          I built my first web application. Since then, I&apos;ve worked with
          various technologies and frameworks, always eager to learn and adapt
          to the ever-evolving tech landscape.
        </p>

        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base font-normal mt-4">
          When I&apos;m not coding, you can find me exploring new technologies,
          contributing to open-source projects, or sharing my knowledge through
          blog posts and tutorials. I believe in continuous learning and giving
          back to the community that has helped me grow.
        </p>
      </div>
    </motion.div>
  );
};

export default BioTab;
