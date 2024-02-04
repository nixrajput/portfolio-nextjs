import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import ProjectItem from "@/components/home/components/ProjectItem";
import projects from "@/data/projects";

const HomeSection5 = ({ id }: {id: string}) => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <p className="text-center mx-auto text-3xl/6 md:text-4xl/6 font-semibold">
          Recent Works
        </p>

        <WrappedBox classes="justify-items-center sm:grid-cols-2 lg:grid-cols-3 mt-16">
          {projects.map((project, index) => {
            return <ProjectItem key={`service-${index}`} project={project} />;
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection5;
