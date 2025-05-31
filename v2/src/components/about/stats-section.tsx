"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";

const StatsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
    >
      <Card className="border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <h3 className="text-3xl font-bold text-purple-500 mb-1">5+</h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Years Experience
          </p>
        </CardContent>
      </Card>

      <Card className="border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <h3 className="text-3xl font-bold text-purple-500 mb-1">50+</h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Projects Completed
          </p>
        </CardContent>
      </Card>

      <Card className="border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <h3 className="text-3xl font-bold text-purple-500 mb-1">20+</h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Happy Clients
          </p>
        </CardContent>
      </Card>

      <Card className="border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <h3 className="text-3xl font-bold text-purple-500 mb-1">15+</h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Open Source Contributions
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsSection;
