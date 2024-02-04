"use client";

import { useState, useEffect } from "react";

const useMobileNav = () => {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      if (innerWidth > 900) {
        setMobileNav(false);
        if (showMobileMenu) {
          setShowMobileMenu(false);
        }
      } else {
        setMobileNav(true);
      }
    };

    if (document.readyState === "complete") handleResize();

    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [showMobileMenu, mobileNav]);

  return { mobileNav, setMobileNav, showMobileMenu, setShowMobileMenu };
};

export default useMobileNav;
