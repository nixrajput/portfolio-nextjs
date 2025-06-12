import { bio1, bio2, bio3 } from "@/data";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface BioTabProps {
  className?: string;
}

const BioTab = ({ className }: BioTabProps) => {
  return (
    <div className={cn("w-full flex flex-col relative", className)}>
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
            {bio1}
          </p>

          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base font-normal mt-4">
            {bio2}
          </p>

          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base font-normal mt-4">
            {bio3}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BioTab;
