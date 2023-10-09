"use client";

import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";
import Row from "@/components/common/Row";
import socialLinks from "@/data/socialLinks";
import useIsInViewport from "@/hooks/useIsInViewport";

const HomeSection5 = ({ current, setCurrent }) => {
  const contactRef = useRef(null);

  const isInView = useIsInViewport(contactRef);

  const onHandleClickUrl = (url) => {
    if (typeof window === "undefined" || !url) return;

    window.open(url, "_blank");
  };

  useEffect(() => {
    if (isInView && current !== "contact") setCurrent("contact");

    return () => {
      if (isInView && current === "contact") setCurrent(null);
    };
  }, [isInView, current, setCurrent]);

  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[90vh] items-center justify-center"
      id="contact"
      elementRef={contactRef}
    >
      <ConstraintedBox classNames="p-4 py-12">
        <h2 className="text-center mx-auto">
          Contact <span className="text-[var(--primaryColor)]">Me</span>
        </h2>

        <Column classes="mt-12 w-full">
          <WrappedBox classes="sm:grid-cols-2 w-full mx-auto gap-4">
            <Row
              classes="bg-[var(--textColor10)] p-4 rounded-[var(--borderRadius)] items-center text-center justify-center cursor-pointer animated__hover"
              onClick={() =>
                onHandleClickUrl("mailto:nkr.nikhil.nkr@gmail.com")
              }
            >
              <span className="text-xl">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>

              <p className="text-lg font-semibold ml-2">
                nkr.nikhil.nkr@gmail.com
              </p>
            </Row>

            {socialLinks.map((link, index) => {
              return (
                <Row
                  classes="bg-[var(--textColor10)] p-4 rounded-[var(--borderRadius)] items-center text-center justify-center cursor-pointer animated__hover"
                  key={`social-link-${index}`}
                  onClick={() => onHandleClickUrl(link.url)}
                >
                  <span className="text-xl">{link.icon}</span>

                  <p className="text-lg font-semibold ml-2">{link.text}</p>
                </Row>
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

export default HomeSection5;
