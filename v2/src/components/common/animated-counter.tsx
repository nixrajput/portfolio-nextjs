"use client";

import { useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

const AnimatedCounter = ({ value, className }: AnimatedCounterProps) => {
  const [counter, setCounter] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [scope, animate] = useAnimate();

  // Parse the value to get the number and suffix
  const parseValue = () => {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*?)$/);
    if (match) {
      return {
        number: parseFloat(match[1]),
        suffix: match[2] || "",
      };
    }
    return { number: 0, suffix: "" };
  };

  const { number, suffix } = parseValue();

  useEffect(() => {
    // Set up intersection observer to detect when element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    const currentRef = counterRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      // Reset counter when element comes into view
      setCounter(0);

      // Calculate animation duration based on the target number
      // Smaller numbers animate faster, larger numbers take longer
      const duration = Math.min(2, Math.max(0.5, number / 50));

      // Calculate increment steps - more steps for larger numbers
      const steps = Math.max(20, Math.min(50, number));
      const increment = number / steps;

      let currentCount = 0;
      const interval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= number) {
          setCounter(number);
          clearInterval(interval);
        } else {
          setCounter(Math.round(currentCount));
        }
      }, (duration * 1000) / steps);

      // Add a subtle scale animation
      animate(
        scope.current,
        { scale: [0.97, 1.03, 1] },
        { duration: duration, ease: "easeOut" }
      );

      return () => clearInterval(interval);
    }
  }, [isInView, number, animate, scope]);

  return (
    <span ref={scope} className={className}>
      <span ref={counterRef}>{counter}</span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
