"use client";

import { useRef, useEffect } from "react";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import Carousel from "@/components/common/carousel/Carousel";
import ProjectItem from "@/components/common/ProjectItem";
import useIsInViewport from "@/hooks/useIsInViewport";
import projects from "@/data/projects";

const HomeSection4 = ({ current, setCurrent }) => {
  const projectsRef = useRef(null);

  const isInView = useIsInViewport(projectsRef);

  useEffect(() => {
    if (isInView && current !== "projects") setCurrent("projects");

    return () => {
      if (isInView && current === "projects") setCurrent(null);
    };
  }, [isInView, current, setCurrent]);

  return (
    <ResponsiveBox
      classNames="bg-[var(--bgColor)] min-h-[100vh] items-center justify-center"
      animateReverse
      id="projects"
      elementRef={projectsRef}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <h2 className="text-center mx-auto">
          Recent <span className="text-[var(--primaryColor)]">Projects</span>
        </h2>

        <Carousel classes="mt-12 w-full">
          {projects.map((project, index) => {
            return <ProjectItem key={`service-${index}`} project={project} />;
          })}
        </Carousel>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection4;
