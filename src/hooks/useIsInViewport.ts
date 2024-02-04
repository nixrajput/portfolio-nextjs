"use client";

import type { ViewportProps } from "@/types";
import { useEffect, useState, useMemo, RefObject } from "react";

const useInViewport = (
  ref: RefObject<HTMLDataElement>,
  options?: ViewportProps
) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const vOptions = useMemo(
    () => ({
      root: options?.root,
      rootMargin: options?.rootMargin || "20px",
      threshold: options?.threshold || 0.3,
    }),
    [options]
  );

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
      }, vOptions),
    [vOptions]
  );

  useEffect(() => {
    if (!ref || !ref.current) return;

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, observer]);

  return isVisible;
};

export default useInViewport;
