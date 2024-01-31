import Image from "next/image";
import Link from "next/link";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";
import Row from "@/components/common/Row";
import socialLinks from "@/data/socialLinks";
import About from "@/data/about";
import TalkButton from "./components/TalkButton";

// from-zinc-900 via-zinc-400/10 to-zinc-900
const HomeSection1 = ({ id }) => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="px-4 py-8">
        <WrappedBox classes="justify-items-stretch">
          <Column classes="justify-center max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
            <p className="text-base/6">{About.welcomeText}</p>

            <p className="text-[var(--primaryColor)] text-4xl/6 md:text-5xl/6 font-semibold my-2">
              {About.fullName}
            </p>

            <p className="text-base/6 font-medium">{About.designation}</p>

            <p className="mt-8 text-base/6">{About.description}</p>

            <TalkButton />

            <Column classes="mt-8 md:mt-16">
              <p className="text-base font-semibold">{About.followText}</p>

              <Row classes="mt-2 gap-2">
                {socialLinks.slice(0, 5).map((link, index) => {
                  return (
                    <Link
                      key={`social-link-${index}`}
                      href={link.url}
                      target="_blank"
                      className="app__outlined_btn !rounded-full !p-3 lg:!p-4 !aspect-square !border-[var(--textColor)]"
                      aria-label={`${link.name}`}
                    >
                      <span className="text-xl text-[var(--whiteColor)]">
                        {link.icon}
                      </span>
                    </Link>
                  );
                })}
              </Row>
            </Column>
          </Column>

          <Row classes="w-[20rem] h-[20rem] lg:w-[25rem] lg:h-[25rem] pointer-events-none justify-self-center sm:justify-self-end items-center justify-center rounded-full bg-transparent border-2 border-[var(--primaryColor60)] aspect-sqaure overflow-hidden my-auto">
            <Row classes="w-full h-auto items-center justify-center rounded-full bg-transparent border-[0.8rem] border-[var(--primaryColor30)] aspect-sqaure overflow-hidden pointer-events-none">
              <Image
                src={About.avatarUrl}
                alt="profile"
                width={400}
                height={400}
                sizes="100%"
                priority
                fetchPriority="high"
                placeholder="blur"
                blurDataURL={About.avatarUrl}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  aspectRatio: "1 / 1",
                }}
              />
            </Row>
          </Row>
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection1;
