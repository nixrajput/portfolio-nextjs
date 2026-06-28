import { useEffect, useState, useCallback } from "react";
import { navMenus } from "@/data/navMenus";

function throttle<T extends (...args: never[]) => void>(fn: T, wait: number) {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn(...args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn(...args);
      }, remaining);
    }
  };
}

function useVisibleSection(sections = navMenus) {
  const [visibleSectionId, setVisibleSectionId] = useState<string>(sections[0].name);

  const isSectionVisible = (elementId: string) => {
    const section = document.getElementById(elementId);

    if (!section) return false;

    const sectionPosition = section.getBoundingClientRect();
    const vHeight = window.innerHeight || document.documentElement.clientHeight;

    // Calculate the threshold for more than 50% visibility
    const threshold = vHeight * 0.5;

    // Check if more than 50% of the element is visible from the start or end in the viewport
    return (
      (sectionPosition.top <= threshold && sectionPosition.bottom >= threshold) || // More than 50% from the start
      (sectionPosition.bottom >= vHeight - threshold && sectionPosition.top <= vHeight - threshold) // More than 50% from the end
    );
  };

  const checkVisibility = useCallback(() => {
    if (!sections || sections.length < 1) return;

    sections.forEach(({ name }) => {
      const isVisible = isSectionVisible(name);

      if (isVisible) {
        setVisibleSectionId(name);
      }
    });
  }, [sections]);

  useEffect(() => {
    const handler = throttle(checkVisibility, 300);

    if (document.readyState === "complete") handler();

    window.addEventListener("DOMContentLoaded", handler);
    window.addEventListener("load", handler);
    window.addEventListener("scroll", handler);
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("DOMContentLoaded", handler);
      window.removeEventListener("load", handler);
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [checkVisibility]);

  return visibleSectionId;
}

export default useVisibleSection;
