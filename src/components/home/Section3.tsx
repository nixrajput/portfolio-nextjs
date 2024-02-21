import ConstraintedBox from "@/components/core/ConstraintedBox";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import GridBox from "@/components/core/GridBox";
import SectionTitle from "@/components/common/SectionTitle";
import ExperienceItem from "./components/ExperienceItem";
import experiences from "@/data/experiences";

const HomeSection3 = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <SectionTitle>Experiences</SectionTitle>

        <GridBox classNames="justify-items-center grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-16">
          {experiences.map((experience, index) => {
            return (
              <ExperienceItem key={`experience-${index}`} data={experience} />
            );
          })}
        </GridBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection3;
