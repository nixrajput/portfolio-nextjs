import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import SkillItem from "./components/SkillItem";
import skills from "@/data/skills";

const HomeSection4 = ({ id }: {id: string}) => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--bgColor)] min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <p className="text-center mx-auto text-3xl/6 md:text-4xl/6 font-semibold">
          Skills
        </p>

        <WrappedBox classes="justify-items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-16">
          {skills.map((skill, index) => {
            return <SkillItem key={`skill-${index}`} item={skill} />;
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection4;
