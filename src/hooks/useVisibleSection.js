import { useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";
import navMenus from "@/data/navMenus";

function useVisibleSection(sections = navMenus) {
  const [visibleSectionId, setVisibleSectionId] = useState(sections[0].id);

  const isSectionVisible = (elementId) => {
    const section = document.getElementById(elementId);

    if (!section) return false;

    let sectionPosition = section.getBoundingClientRect();

    const vWidth = window.innerWidth || document.documentElement.clientWidth;
    const vHeight = window.innerHeight || document.documentElement.clientHeight;

    // const vertInView =
    //   sectionPosition.top <= vHeight &&
    //   sectionPosition.top + sectionPosition.height > vHeight / 2;
    const horInView =
      sectionPosition.left <= vWidth &&
      sectionPosition.left + sectionPosition.width >= 0;

    // Calculate the height of the element
    // var elementHeight = sectionPosition.bottom - sectionPosition.top;

    // Calculate the threshold for more than 50% visibility
    var threshold = vHeight * 0.5;

    return (
      sectionPosition.top <= threshold &&
      sectionPosition.bottom >= threshold &&
      sectionPosition.bottom <= vHeight && horInView
    );
  };

  const checkVisibility = useCallback(() => {
    if (!sections || sections.length < 1) return;

    sections.forEach(({ id }) => {
      const isVisible = isSectionVisible(id);

      // console.log(`id: ${id} -- isVisible: ${isVisible}`);

      if (isVisible) {
        setVisibleSectionId(id);
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

  console.log(`hooks-active: ${visibleSectionId}`);
  return visibleSectionId;
}

export default useVisibleSection;
