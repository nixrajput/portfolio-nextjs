import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import SkillItem from "./components/SkillItem";
import skills from "@/data/skills";

const HomeSection4 = ({ id }) => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--bgColor)] min-h-[100vh] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-8">
        <h2 className="text-center mx-auto">
          Skills
        </h2>

        <WrappedBox classes="justify-items-center grid-cols-2 sm:grid-cols-3 mt-8">
          {skills.map((skill, index) => {
            return <SkillItem key={`skill-${index}`} item={skill} />;
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection4;
