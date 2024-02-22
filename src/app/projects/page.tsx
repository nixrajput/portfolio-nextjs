import { Suspense } from "react";
import PageBox from "@/components/core/PageBox";
import ProjectsSection1 from "@/components/projects/Section1";
import ProjectsSection2 from "@/components/projects/Section2";
import Modal from "@/components/core/Modal";
import GalleryImageView from "@/components/common/GalleryImageView";

const ProjectDetails = ({
  params,
  searchParams,
}: Readonly<{ params: any; searchParams: any }>) => {
  return (
    <>
      <PageBox>
        <Suspense>
          <ProjectsSection1 />
          <ProjectsSection2 />
        </Suspense>
      </PageBox>

      {!!searchParams.imgSrc ? (
        <Modal closeHref={`/projects?id=${searchParams.id}`}>
          <Suspense>
            <GalleryImageView src={searchParams.imgSrc} />
          </Suspense>
        </Modal>
      ) : null}
    </>
  );
};

export default ProjectDetails;
