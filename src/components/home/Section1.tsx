import Column from "@/components/core/Column";
import ConstraintedBox from "@/components/core/ConstraintedBox";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import { TypewriterEffectSmooth } from "@/components/common/TypewriterEffect";
import HeroButtons from "./ui/HeroButtons";
import HeroSocialIcons from "./ui/HeroSocialIcons";

const HomeSection1 = ({ id }: Readonly<{ id: string }>) => {
  const text_1 = [
    {
      text: "Hi",
    },
    {
      text: "there,",
    },
    {
      text: "I",
    },
    {
      text: "am",
    },
    {
      text: "Nikhil",
      className: "text-[var(--primaryColor)] dark:text-[var(--primaryColor)]",
    },
    {
      text: "Rajput",
      className: "text-[var(--primaryColor)] dark:text-[var(--primaryColor)]",
    },
  ];

  const text_2 = [
    {
      text: "Software",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal font-medium text-[var(--textColorLight)] dark:text-[var(--textColorLight)]",
    },
    {
      text: "Enginner",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal font-medium text-[var(--textColorLight)] dark:text-[var(--textColorLight)]",
    },
    {
      text: "&",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal text-[var(--textColorLight)] dark:text-[var(--textColorLight)]",
    },
    {
      text: "Full",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal text-[var(--textColorLight)] dark:text-[var(--textColorLight)]",
    },
    {
      text: "Stack",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal text-[var(--textColorLight)] dark:text-[var(--textColorLight)]",
    },
    {
      text: "Developer",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal text-[var(--textColorLight)] dark:text-[var(--textColorLight)]",
    },
  ];

  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-screen items-center justify-center relative overflow-hidden rounded-md"
      id={id}
    >
      <ConstraintedBox classNames="px-4 py-8 z-10 w-full items-center justify-center">
        <Column classNames="w-full items-center justify-center">
          <TypewriterEffectSmooth words={text_1} delay={0.5} />
          <TypewriterEffectSmooth words={text_2} delay={3} className="-mt-3 sm:-mt-4 md:-mt-6 lg:-mt-9 xl:-mt-12" />

          <HeroButtons />
        </Column>

        <HeroSocialIcons />
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection1;
