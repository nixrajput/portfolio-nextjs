"use client";

import { useState, useEffect } from "react";

const useScrolled = (offset?: number) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    let tempOffset = 40;
    if (
      !offset ||
      offset < 0 ||
      offset > window.innerHeight ||
      typeof offset !== "number" ||
      isNaN(offset) ||
      !isFinite(offset) ||
      offset === Infinity ||
      offset === -Infinity ||
      offset === 0 ||
      offset === null ||
      offset === undefined
    ) {
      tempOffset = 40;
    }

    const handleScroll = () => {
      if (window.scrollY > tempOffset) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    if (document.readyState === "complete") handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return scrolled;
};

export default useScrolled;
