import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import ExperienceItem from "./components/ExperienceItem";
import experiences from "@/data/experiences";

const HomeSection3 = ({ id }) => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[100vh] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-8">
        <h2 className="text-center mx-auto">Experiences</h2>

        <WrappedBox classes="justify-items-center grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8">
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
