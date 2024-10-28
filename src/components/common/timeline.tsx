"use client";

import { TimelineEntry } from "@/types";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full mt-8 mb-8" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-20 pb-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-20 lg:top-20 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-6 w-6 lg:h-8 lg:w-8 absolute left-5 lg:left-4 rounded-full bg-zinc-800 dark:bg-zinc-800 flex items-center justify-center">
                <div className="h-3 w-3 lg:h-4 lg:w-4 p-1 lg:p-2 rounded-full bg-neutral-700 dark:bg-neutral-700 border border-neutral-600 dark:border-neutral-700" />
              </div>
              <h3 className="hidden md:block text-lg lg:text-xl xl:text-2xl font-semibold text-[var(--textColor)] dark:text-[var(--textColor)] md:pl-20 tracking-wide">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-16 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: height - 20 + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[var(--primaryColor)] via-[var(--primaryColor50)] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
