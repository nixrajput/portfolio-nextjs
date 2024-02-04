import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import ExperienceItem from "./components/ExperienceItem";
import experiences from "@/data/experiences";

const HomeSection3 = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <p className="text-center mx-auto text-3xl/6 md:text-4xl/6 font-semibold">
          Experiences
        </p>

        <WrappedBox classes="justify-items-center grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-16">
          {experiences.map((experience, index) => {
            return (
              <ExperienceItem key={`experience-${index}`} data={experience} />
            );
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection3;
