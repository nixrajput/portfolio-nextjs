"use client";

import { useSearchParams } from "next/navigation";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import ConstraintedBox from "@/components/core/ConstraintedBox";
import AppBar from "@/components/common/AppBar";
import { getProjectName } from "@/data/projects";

const ProjectsSection1 = ({ id }: Readonly<{ id?: string }>) => {
  const searchParams = useSearchParams();

  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[calc(100vh-5rem)]"
      id={id}
    >
      <ConstraintedBox classNames="px-4 pt-4 py-8">
        <AppBar>{getProjectName(searchParams.get("id")!) || ""}</AppBar>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default ProjectsSection1;
