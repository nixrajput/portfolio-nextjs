import { useEffect, useState, useMemo } from "react";

const useIsInViewport = (
  ref,
  { root = null, rootMargin = null, threshold = null } = {}
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSection, setVisibleSection] = useState("");

  const options = useMemo(
    () => ({
      root: root || null,
      rootMargin: rootMargin || "20px",
      threshold: threshold || 0.3,
    }),
    [root, rootMargin, threshold]
  );

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
        setVisibleSection(entry.target.id);
      }, options),
    [options]
  );

  useEffect(() => {
    if (!ref.current) return;

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, observer]);

  console.log(`visibleSection: ${visibleSection}`);
  return { isVisible, visibleSection };
};

export default useIsInViewport;
