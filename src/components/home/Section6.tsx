import ResponsiveBox from "@/components/core/ResponsiveBox";
import ConstrainedBox from "@/components/core/constrained-box";
import GridBox from "@/components/core/GridBox";
import Column from "@/components/core/Column";
import SectionTitle from "@/components/common/SectionTitle";
import SocialButton from "./ui/SocialButton";
import socialLinks from "@/data/socialLinks";

const HomeSection6 = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--dialogColor)] bg-[var(--dialogColor)] min-h-screen items-center justify-center dark:bg-dot-white/[0.15] bg-dot-white/[0.15] items-center justify-center"
      id={id}
    >
      <ConstrainedBox classNames="p-4 py-16">
        <SectionTitle>Get in Touch</SectionTitle>

        <Column classNames="mt-16 w-full">
          <GridBox classNames="sm:grid-cols-2 w-full mx-auto gap-4">
            {socialLinks.map((link, index) => {
              return (
                <SocialButton
                  key={`social-link-${index}`}
                  text={link.text}
                  icon={link.icon}
                  url={link.url}
                />
              );
            })}
          </GridBox>

          <p className="text-center mx-auto mt-16 text-2xl/6 font-semibold">
            I&apos;m{" "}
            <span className="text-[var(--primaryColor)]">available</span> for
            freelancing.
          </p>
        </Column>
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default HomeSection6;
