"use client";

import { useEffect } from "react";
import { cn } from "@/utils/cn";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

export const TypewriterEffect = ({
  words,
  className,
  delay,
  duration,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  delay?: number;
  duration?: number;
  cursorClassName?: string;
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
          duration: 0.5,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.span ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <span key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-[var(--textColor)] text-[var(--textColor)] opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </span>
          );
        })}
      </motion.span>
    );
  };
  return (
    <span
      className={cn(
        "text-2xl/normal sm:text-3xl/normal md:text-4xl/normal lg:text-5xl/normal xl:text-6xl/normal font-bold",
        className
      )}
      style={{ whiteSpace: "nowrap" }}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm h-[4px] md:h-[5px] lg:h-[6px] w-4 md:w-6 lg:w-10 bg-[var(--textColor)]",
          cursorClassName
        )}
      ></motion.span>
    </span>
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
      <span className="relative">
        {wordsArray.map((word, idx) => {
          return (
            <span key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-[var(--textColor)] text-[var(--textColor)] `,
                    word.className
                  )}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <motion.span
      className={cn("relative inline-block overflow-hidden", className)}
      initial={{ width: "0%" }}
      animate={{ width: "fit-content" }}
      transition={{
        duration: duration || 2,
        ease: "linear",
        delay: delay || 1,
      }}
    >
      <span
        className="text-2xl/normal sm:text-3xl/normal md:text-4xl/normal lg:text-5xl/normal xl:text-6xl/normal font-bold text-center"
        style={{ whiteSpace: "nowrap" }}
      >
        {renderWords()}
      </span>
    </motion.span>
  );
};
