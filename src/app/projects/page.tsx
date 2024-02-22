import { Suspense } from "react";
import PageBox from "@/components/core/PageBox";
import ProjectsSection1 from "@/components/projects/Section1";

const ProjectDetails = () => {
  return (
    <PageBox>
      <Suspense>
        <ProjectsSection1 />
      </Suspense>
    </PageBox>
  );
};

export default ProjectDetails;
