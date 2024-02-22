"use client";

import { useSearchParams } from "next/navigation";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import ConstraintedBox from "@/components/core/ConstraintedBox";
import AppBar from "@/components/common/AppBar";
import ScreenshotGallery from "./components/ScreenshotGallery";
import { getProjectDetails, getProjectName } from "@/data/projects";

const ProjectsSection1 = ({ id }: Readonly<{ id?: string }>) => {
  const searchParams = useSearchParams();
  const projectName = getProjectName(searchParams.get("id")!) || "";
  const screenshots = getProjectDetails(searchParams.get("id")!)?.sceenshots;

  return (
    <ResponsiveBox classNames="bg-[var(--dialogColor)]" id={id}>
      <ConstraintedBox classNames="p-4">
        <AppBar>{projectName}</AppBar>

        {screenshots && screenshots.length > 0 ? (
          <ScreenshotGallery imageList={screenshots} />
        ) : null}
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default ProjectsSection1;
