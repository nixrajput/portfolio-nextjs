"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import React, { forwardRef, useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  className?: string;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ data, className }, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });
    const [hasBeenInView, setHasBeenInView] = useState(false);

    useEffect(() => {
      if (isInView) {
        setHasBeenInView(true);
      }
    }, [isInView]);

    useEffect(() => {
      const updateHeight = () => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          setHeight(rect.height);
        }
      };
      updateHeight();
      window.addEventListener("resize", updateHeight);
      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }, []);

    // Track the content element's position within the scrollable container
    const { scrollYProgress } = useScroll({
      container: containerRef,
      target: ref,
      offset: ["start 0%", "end 100%"],
      layoutEffect: false,
    });

    // Track scroll progress for animation completion with debouncing
    const [progress, setProgress] = useState(0);
    const [direction, setDirection] = useState<"up" | "down">("down");
    const prevProgress = useRef(0);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;

      const unsubscribe = scrollYProgress.on("change", (latest) => {
        // Clear previous timeout
        clearTimeout(timeoutId);

        // Determine scroll direction
        if (latest > prevProgress.current) {
          setDirection("down");
        } else if (latest < prevProgress.current) {
          setDirection("up");
        }
        prevProgress.current = latest;

        // Set a timeout to update progress after a small delay to prevent jitter
        timeoutId = setTimeout(() => {
          setProgress(latest);
        }, 5);
      });

      return () => {
        clearTimeout(timeoutId);
        unsubscribe();
      };
    }, [scrollYProgress]);

    // Create smooth transforms for height and opacity
    const heightTransform = useTransform(
      scrollYProgress,
      [0, 1],
      [0, height],
      { clamp: true } // Clamp values to ensure animation completes
    );
    const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
      <div
        className={cn(
          "w-full relative no-visible-scrollbar scroll-smooth",
          className
        )}
        ref={(node) => {
          // Handle both the forwarded ref and our local ref
          containerRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
      >
        <div ref={ref} className="relative w-full mx-auto">
          {data.map((item, index) => (
            <div key={index} className="flex justify-start py-10 md:gap-10">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-20 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-6 w-6 absolute left-3 md:left-3 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800" />
                </div>

                <h3 className="hidden md:block text-xl md:pl-20 font-bold text-primary dark:text-primary">
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-primary dark:text-primary">
                  {item.title}
                </h3>
                {item.content}{" "}
              </div>
            </div>
          ))}

          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-6 left-6 top-0 overflow-hidden w-[1px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: hasBeenInView
                  ? direction === "up" && progress < 0.05
                    ? 0
                    : direction === "down" && progress > 0.95
                    ? height
                    : height * Math.max(progress, 0)
                  : 0,
                opacity: hasBeenInView
                  ? Math.min(Math.max(progress, 0) * 5, 1)
                  : 0,
              }}
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute inset-x-0 top-0 w-[1px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }
);

Timeline.displayName = "Timeline";
