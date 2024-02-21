import ConstraintedBox from "@/components/core/ConstraintedBox";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import SectionTitle from "@/components/common/SectionTitle";
import ProjectList from "./components/ProjectList";
import projects from "@/data/projects";

const HomeSection5 = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <SectionTitle>Recent Works</SectionTitle>

        <ProjectList projects={projects} />
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection5;
