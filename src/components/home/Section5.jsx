"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import Column from "@/components/common/Column";
import Row from "@/components/common/Row";
import socialLinks from "@/data/socialLinks";
import WrappedBox from "../common/WrappedBox";

const HomeSection5 = () => {
  const onHandleClickUrl = (url) => {
    if (typeof window === "undefined" || !url) return;

    window.open(url, "_blank");
  };

  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[80vh] items-center justify-center"
      id="contact"
    >
      <ConstraintedBox classNames="p-4 py-12">
        <h2 className="text-center mx-auto">
          Contact <span className="text-[var(--primaryColor)]">Me</span>
        </h2>

        <Column classes="mt-12 w-full">
          <WrappedBox classes="sm:grid-cols-2 w-full mx-auto gap-4">
            <Row
              classes="bg-[var(--textColor10)] p-4 rounded-[var(--borderRadius)] items-center text-center justify-center cursor-pointer hover:bg-[var(--primaryColor40)] transition duration-500 ease-in-out"
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
                  classes="bg-[var(--textColor10)] p-4 rounded-[var(--borderRadius)] items-center text-center justify-center cursor-pointer hover:bg-[var(--primaryColor40)] transition duration-500 ease-in-out"
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
