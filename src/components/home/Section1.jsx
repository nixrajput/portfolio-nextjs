"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import FilledButton from "@/components/common/FilledButton";
import Column from "@/components/common/Column";
import Row from "@/components/common/Row";
import socialLinks from "@/data/socialLinks";
import Strings from "@/constants/strings";
import About from "@/data/about";
import useIsInViewport from "@/hooks/useIsInViewport";

const HomeSection1 = ({ current, setCurrent }) => {
  const homeRef = useRef(null);

  const isInView = useIsInViewport(homeRef);

  const onHandleClickTalkBtn = () => {
    if (typeof window === "undefined") return;

    window.open(Strings.telegramLink, "_blank");
  };

  useEffect(() => {
    if (isInView && current !== "about") setCurrent("about");

    return () => {
      if (isInView && current === "about") setCurrent(null);
    };
  }, [isInView, current, setCurrent]);

  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[90vh] items-center justify-center"
      id="about"
      elementRef={homeRef}
    >
      <ConstraintedBox classNames="p-4 pb-16 pt-8 sm:pt-16">
        <WrappedBox classes="justify-items-stretch">
          <Column classes="justify-center">
            <p className="max-w-sm">{About.welcomeText}</p>

            <h1 className="text-[var(--primaryColor)]">{About.fullName}</h1>

            <p className="font-semibold max-w-sm">{About.designation}</p>

            <p className="mt-8 max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
              {About.description}
            </p>

            <FilledButton
              label="Let's Talk"
              onClick={onHandleClickTalkBtn}
              className="mt-8 min-w-[10rem]"
            />

            <Column classes="mt-8">
              <p className="text-md font-semibold">{About.followText}</p>
              <Row classes="mt-2 gap-2">
                {socialLinks.map((link, index) => {
                  return (
                    <Link
                      key={`social-link-${index}`}
                      href={link.url}
                      target="_blank"
                      className="app__icon_btn p-3 lg:p-4"
                      aria-label={`${link.name}`}
                    >
                      <span className="text-xl"> {link.icon}</span>
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
