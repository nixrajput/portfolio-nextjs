"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

export interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const FlipWords = forwardRef<HTMLDivElement, FlipWordsProps>(
  ({ words, duration = 5000, className }, forwardedRef) => {
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    // Merge the forwarded ref with our local ref
    const localRef = useRef<HTMLDivElement>(null);
    const containerRef = forwardedRef || localRef;

    const startAnimation = useCallback(() => {
      const word = words[words.indexOf(currentWord) + 1] || words[0];
      setCurrentWord(word);
      setIsAnimating(true);
    }, [currentWord, words]);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      if (!isAnimating) {
        timeoutId = setTimeout(() => {
          startAnimation();
        }, duration);
      }

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [isAnimating, duration, startAnimation]);

    if (!words || words.length === 0) {
      return null;
    }

    return (
      <div ref={containerRef} className="relative w-full h-full">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            setIsAnimating(false);
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
            exit={{
              opacity: 0,
              y: -20,
              filter: "blur(8px)",
              scale: 1.1,
              position: "relative",
            }}
            className={cn(
              "z-10 inline-block relative text-left px-2",
              className
            )}
            key={currentWord}
          >
            {currentWord.split(" ").map((word, wordIndex) => (
              <motion.span
                key={word + wordIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: wordIndex * 0.2, // Slightly faster delay
                  duration: 0.25, // Slightly faster duration
                  ease: "easeOut", // Smoother easing
                }}
                className="inline-block whitespace-nowrap"
              >
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={word + letterIndex}
                    initial={{ opacity: 0, y: 5 }} // Reduced movement
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: wordIndex * 0.2 + letterIndex * 0.03, // Faster animation
                      duration: 0.15, // Shorter duration
                      ease: "easeOut", // Smoother easing
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

FlipWords.displayName = "FlipWords";
