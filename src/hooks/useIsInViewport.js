import { useEffect, useState, useMemo } from "react";

const useIsInViewport = (
  ref,
  { root = null, rootMargin = null, threshold = null } = {}
) => {
  const options = useMemo(
    () => ({
      root: root || null,
      rootMargin: rootMargin || "20px",
      threshold: threshold || 0.3,
    }),
    [root, rootMargin, threshold]
  );

  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const callbackFunction = (entries) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
    };

    const value = ref?.current;

    const observer = new IntersectionObserver(callbackFunction, options);

    if (value) observer.observe(ref.current);

    return () => {
      if (value) observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

export default useIsInViewport;
