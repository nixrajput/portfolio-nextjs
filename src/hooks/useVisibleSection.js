import { useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";
import navMenus from "@/data/navMenus";

function useVisibleSection(sections = navMenus) {
  const [visibleSectionId, setVisibleSectionId] = useState("");

  const isSectionVisible = (elementId) => {
    const section = document.getElementById(elementId);

    if (section) {
      const sectionPosition = section.getBoundingClientRect();

      const viewPort = {
        height: window.innerHeight,
        width: window.innerWidth,
      };

      return (
        sectionPosition.top >= 0 &&
        sectionPosition.left >= 0 &&
        sectionPosition.bottom <= viewPort.height &&
        sectionPosition.right <= viewPort.width
      );
    }

    return false;
  };

  const checkVisibility = useCallback(() => {
    if (!sections || sections.length < 1) return;

    sections.forEach(({ id }) => {
      if (isSectionVisible(id)) {
        setVisibleSectionId(id);
      }
    });
  }, [sections]);

  useEffect(() => {
    if (document.readyState === "complete") {
      throttle(checkVisibility, 300);
    }

    window.addEventListener("load", throttle(checkVisibility, 300));
    window.addEventListener("scroll", throttle(checkVisibility, 300));

    checkVisibility();

    return () => {
      window.removeEventListener("load", throttle(checkVisibility, 300));
      window.removeEventListener("scroll", throttle(checkVisibility, 300));
    };
  }, [checkVisibility]);

  console.log(`hooks-active: ${visibleSectionId}`);
  return visibleSectionId;
}

export default useVisibleSection;
