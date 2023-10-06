"use client";

import Image from "next/image";
import Link from "next/link";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";
import CircleBox from "@/components/common/CircleBox";
import Row from "@/components/common/Row";
import socialLinks from "@/data/socialLinks";
import FilledButton from "../common/FilledButton";

const telegramLink = "https://telegram.me/nixrajput";

const onHandleClickTalkBtn = () => {
  if (typeof window === "undefined") return;

  window.open(telegramLink, "_blank");
};

const HomeSection1 = () => {
  return (
    <ResponsiveBox classNames="bg-[var(--dialogColor)]">
      <ConstraintedBox classNames="p-4 pb-16 pt-8 sm:pt-16">
        <WrappedBox classes="justify-items-stretch">
          <Column classes="justify-center">
            <p className="max-w-sm">
              Hi 👋,{" "}
              <span className="text-[var(--primaryColor)]">I&apos;m</span>
            </p>

            <h1 className="text-[var(--primaryColor)]">Nikhil Rajput</h1>

            <p className="font-semibold max-w-sm">
              Software Enginner & Fullstack Developer
            </p>

            <p className="mt-8 max-w-sm">
              An inquisitive software developer specialized in both front-end
              and back-end development across platforms.
            </p>

            <FilledButton
              label="Let's Talk"
              onClick={onHandleClickTalkBtn}
              className="mt-10"
            />

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

          <Row classes="justify-self-center sm:justify-self-end items-center justify-center rounded-full bg-transparent border-2 border-[var(--primaryColor60)] h-full w-auto aspect-sqaure overflow-hidden">
            <Row classes="items-center justify-center rounded-full bg-transparent border-[0.8rem] border-[var(--primaryColor30)] h-full w-auto aspect-sqaure overflow-hidden">
              <CircleBox classes="w-[20rem] h-[20rem] lg:w-[25rem] lg:h-[25rem] pointer-events-none">
                <Image
                  src="/images/profile.jpg"
                  alt="profile"
                  width={400}
                  height={400}
                  sizes="100%"
                  priority
                  placeholder="blur"
                  blurDataURL="/images/profile.jpg"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    aspectRatio: "1 / 1",
                  }}
                />
              </CircleBox>
            </Row>
          </Row>
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection1;
