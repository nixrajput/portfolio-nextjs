"use client";

import AnimatedCounter from "@/components/common/animated-counter";
import { Card, CardContent } from "@/components/ui/card";
import { defaultStats } from "@/data";
import type { Stat } from "@/types";
import { motion } from "motion/react";

interface StatsSectionProps {
  stats?: Stat[];
}

const StatsSection = ({ stats = defaultStats }: StatsSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full"
    >
      {stats.map((stat, index) => (
        <Card
          key={`stat-${index}`}
          className="border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm hover:shadow-md hover:scale-105 transition-all duration-300"
        >
          <CardContent className="p-6 text-center">
            <h3 className="text-3xl font-bold text-purple-500 mb-1">
              <AnimatedCounter value={stat.count.toString()} />
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {stat.label}
            </p>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};

export default StatsSection;
