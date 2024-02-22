import { Suspense } from "react";
import PageBox from "@/components/core/PageBox";
import AppBar from "@/components/common/AppBar";
import ProjectsSection1 from "@/components/projects/Section1";

const ProjectDetails = () => {
  return (
    <PageBox>
      <Suspense>
        <AppBar>Project</AppBar>
        <ProjectsSection1 />
      </Suspense>
    </PageBox>
  );
};

export default ProjectDetails;
