"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import ConstraintedBox from "@/components/core/ConstraintedBox";
import Row from "@/components/core/Row";
import Column from "@/components/core/Column";
import AppBar from "@/components/common/AppBar";
import ScreenshotGallery from "./components/ScreenshotGallery";
import { getProjectDetails } from "@/data/projects";
import { ProjectType } from "@/types";

const ProjectsSection1 = ({ id }: Readonly<{ id?: string }>) => {
  const searchParams = useSearchParams();
  const project = getProjectDetails(searchParams.get("id")!);

  const renderProjectType = (type?: ProjectType) => {
    switch (type) {
      case ProjectType.Personal:
        return "Personal Project";

      case ProjectType.JobWork:
        return "Job Work";

      case ProjectType.Freelance:
        return "Freelance Project";

      default:
        return null;
    }
  };

  return (
    <ResponsiveBox classNames="bg-[var(--dialogColor)]" id={id}>
      <ConstraintedBox classNames="p-4">
        <AppBar>
          {project ? (
            <Row classNames="items-center gap-2">
              <Row classNames="w-[3rem] md:w-[3.5rem] p-2 aspect-square items-center justify-center border border-[var(--textColor30)] rounded-full overflow-hidden">
                <Image
                  src={project.icon}
                  alt={`project-${project.title}`}
                  width={100}
                  height={100}
                  sizes="100%"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                  className="w-full h-full object-cover aspect-square"
                />
              </Row>

              <Column>
                <p className="text-lg/6 font-semibold">{project?.title}</p>
                <p className="text-base/6 text-[var(--textColorLight)]">
                  {renderProjectType(project.projectType)}
                </p>
              </Column>
            </Row>
          ) : null}
        </AppBar>

        {project && project.sceenshots && project.sceenshots.length > 0 ? (
          <ScreenshotGallery imageList={project.sceenshots} />
        ) : null}
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default ProjectsSection1;
