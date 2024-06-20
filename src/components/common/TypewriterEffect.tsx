"use client";

import { useEffect } from "react";
import { cn } from "@/utils/cn";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

export const TypewriterEffect = ({
  words,
  className,
  delay,
  duration,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  delay?: number;
  duration?: number;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ width: "0%" }}
      animate={{ width: "fit-content" }}
      transition={{
        duration: duration || 2,
        ease: "linear",
        delay: delay || 1,
      }}
    >
      <div
        className={cn(
          "text-2xl/normal sm:text-3xl/normal md:text-4xl/normal lg:text-5xl/normal xl:text-6xl/normal font-bold",
          className
        )}
        style={{ whiteSpace: "nowrap" }}
      >
        {renderWords()}
      </div>
    </motion.div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  delay,
  duration,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  delay?: number;
  duration?: number;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      <div className="relative">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black `, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ width: "0%" }}
      animate={{ width: "fit-content" }}
      transition={{
        duration: duration || 2,
        ease: "linear",
        delay: delay || 1,
      }}
    >
      <div
        className="text-2xl/normal sm:text-3xl/normal md:text-4xl/normal lg:text-5xl/normal xl:text-6xl/normal font-bold text-center"
        style={{ whiteSpace: "nowrap" }}
      >
        {renderWords()}
      </div>
    </motion.div>
  );
};
