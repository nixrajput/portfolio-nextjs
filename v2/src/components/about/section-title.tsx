import { motion } from "motion/react";

const SectionTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
        About{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
          Me
        </span>
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
        I&apos;m a passionate full-stack developer with expertise in building
        modern web and mobile applications.
      </p>
    </motion.div>
  );
};

export default SectionTitle;
