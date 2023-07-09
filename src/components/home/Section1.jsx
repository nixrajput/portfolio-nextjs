import Image from "next/image";
import Link from "next/link";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";
import CircleBox from "@/components/common/CircleBox";
import Row from "@/components/common/Row";
import socialLinks from "@/data/socialLinks";

const HomeSection1 = () => {
  return (
    <ResponsiveBox classNames="bg-[var(--dialogColor)]">
      <ConstraintedBox classNames="p-4 py-16">
        <WrappedBox classes="justify-items-center">
          <Column classes="justify-center">
            <p>
              Hi 👋,{" "}
              <span className="text-[var(--primaryColor)]">I&apos;m</span>
            </p>

            <h1 className="text-[var(--primaryColor)]">Nikhil Rajput</h1>

            <p className="font-medium">
              Software Enginner & Fullstack Developer
            </p>

            <p className="mt-8">
              An inquisitive software developer specialized in both front-end
              and back-end development across platforms.
            </p>

            <button
              name="talk-btn"
              type="button"
              className="app__filled_btn mt-10"
            >
              Let&apos;s Talk
            </button>

            <Column classes="mt-8">
              <p>Follow me here</p>
              <Row classes="mt-2">
                {socialLinks.map((link, index) => {
                  return (
                    <Link
                      key={`social-link-${index}`}
                      href={link.url}
                      target="_blank"
                      className="text-white bg-[var(--primaryColor)] p-2 rounded-full flex items-center justify-center mr-2 last:mr-0 hover:bg-[var(--primaryColor50)] transition duration-300 ease-in-out"
                    >
                      {link.icon}
                    </Link>
                  );
                })}
              </Row>
            </Column>
          </Column>

          <CircleBox classes="w-[20rem] h-[20rem] lg:w-[25rem] lg:h-[25rem] mx-auto pointer-events-none">
            <Image
              src="/profile.webp"
              alt="profile"
              width={400}
              height={400}
              sizes="100%"
              priority
              placeholder="blur"
              blurDataURL="/profile.webp"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                aspectRatio: "1 / 1",
              }}
            />
          </CircleBox>
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection1;
