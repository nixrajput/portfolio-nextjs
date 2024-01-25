import ResponsiveBox from "@/components/common/ResponsiveBox";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";
import socialLinks from "@/data/socialLinks";
import SocialButton from "./components/SocialButton";

const HomeSection6 = ({ id }) => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--bgColor)] min-h-[90vh] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-12">
        <h2 className="text-center mx-auto">
          Contact <span className="text-[var(--primaryColor)]">Me</span>
        </h2>

        <Column classes="mt-12 w-full">
          <WrappedBox classes="sm:grid-cols-2 w-full mx-auto gap-4">
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
          </WrappedBox>

          <h3 className="text-center mx-auto mt-12">
            I&apos;m{" "}
            <span className="text-[var(--primaryColor)]">Available</span> for
            freelancing.
          </h3>
        </Column>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection6;
