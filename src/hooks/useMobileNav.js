import { useState, useEffect } from "react";

const useMobileNav = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      if (innerWidth > 1080) {
        setMobileNav(false);
        if (showMobileMenu) {
          setShowMobileMenu(false);
        }
      } else {
        setMobileNav(true);
      }
    };

    if (document.readyState === "complete") {
      handleResize();
    }

    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", () => {});
      window.removeEventListener("resize", () => {});
    };
  }, [showMobileMenu, mobileNav]);

  return { mobileNav, setMobileNav, showMobileMenu, setShowMobileMenu };
};

export default useMobileNav;
