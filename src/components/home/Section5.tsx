"use client";

import { useState } from "react";
import ConstraintedBox from "@/components/core/ConstraintedBox";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import GridBox from "@/components/core/GridBox";
import ProjectItem from "./components/ProjectItem";
import projects from "@/data/projects";

const HomeSection5 = ({ id }: { id: string }) => {
  const [loadedProjects, setLoadedProjects] = useState(projects.slice(0, 4));

  const loadMore = (): void => {
    if (loadedProjects.length >= projects.length) return;

    const moreProjects = projects.slice(
      loadedProjects.length,
      loadedProjects.length + 2
    );

    setLoadedProjects([...loadedProjects, ...moreProjects]);
  };

  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <p className="text-center mx-auto text-3xl/6 md:text-4xl/6 font-bold">
          Recent Works
        </p>

        <GridBox classNames="justify-items-center sm:grid-cols-2 lg:grid-cols-3 mt-16">
          {loadedProjects.map((project, index) => {
            return <ProjectItem key={`service-${index}`} project={project} />;
          })}
        </GridBox>

        {loadedProjects.length < projects.length ? (
          <button
            type="button"
            className="app__outlined_btn small__btn !text-sm"
            style={{
              margin: "2rem auto 0",
            }}
            onClick={loadMore}
          >
            Load more
          </button>
        ) : null}
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection5;
