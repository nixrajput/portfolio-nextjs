"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";
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
    <ResponsiveBox classNames="bg-[var(--dialogColor)] min-h-[90vh] items-center justify-center">
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
              <Row classes="mt-2 gap-2">
                {socialLinks.map((link, index) => {
                  return (
                    <Link
                      key={`social-link-${index}`}
                      href={link.url}
                      target="_blank"
                      className="app__icon_btn"
                    >
                      {link.icon}
                    </Link>
                  );
                })}
              </Row>
            </Column>
          </Column>

          <Row classes="w-[20rem] h-[20rem] lg:w-[25rem] lg:h-[25rem] pointer-events-none justify-self-center sm:justify-self-end items-center justify-center rounded-full bg-transparent border-2 border-[var(--primaryColor60)] aspect-sqaure overflow-hidden my-auto">
            <Row classes="w-full h-auto items-center justify-center rounded-full bg-transparent border-[0.8rem] border-[var(--primaryColor30)] aspect-sqaure overflow-hidden pointer-events-none">
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
            </Row>
          </Row>
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection1;
