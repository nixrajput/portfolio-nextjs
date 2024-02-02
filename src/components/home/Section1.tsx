import Image from "next/image";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";
import Row from "@/components/common/Row";
import socialLinks from "@/data/socialLinks";
import About from "@/data/about";
import TalkButton from "./components/TalkButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeSection1 = ({ id }: {id: string}) => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="px-4 py-8">
        <WrappedBox classes="justify-items-stretch !gap-16 lg:!gap-8">
          <Column classes="justify-center max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
            <Column classes="max-w-full">
              <p className="text-base/6 drop_in">{About.welcomeText}</p>

              <p className="text-4xl/normal md:text-5xl/normal font-bold text-[var(--primaryColor)] drop_in">
                {About.fullName}
              </p>

              <p className="text-base/6 font-medium text-[var(--textColorLight)] drop_in">
                {About.designation}
              </p>

              <p className="text-base/normal mt-8 drop_in">
                <Balancer>{About.description}</Balancer>
              </p>

              <TalkButton />
            </Column>

            <Column classes="mt-8 md:mt-16 drop_out">
              <p className="text-base/6 font-semibold">{About.followText}</p>

              <Row classes="mt-2 gap-2">
                {socialLinks.slice(0, 5).map((link, index) => {
                  return (
                    <Link
                      key={`social-link-${index}`}
                      href={link.url}
                      target="_blank"
                      className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-[var(--textColor)]"
                      aria-label={`${link.name}`}
                    >
                      <span className="text-base/6 text-[var(--whiteColor)]">
                        <FontAwesomeIcon icon={link.icon} />
                      </span>
                    </Link>
                  );
                })}
              </Row>
            </Column>
          </Column>

          <Row classes="w-[20rem] h-[20rem] lg:w-[25rem] lg:h-[25rem] pointer-events-none justify-self-center sm:justify-self-end items-center justify-center rounded-full bg-transparent border-2 border-[var(--primaryColor60)] aspect-sqaure overflow-hidden my-auto drop_out">
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
