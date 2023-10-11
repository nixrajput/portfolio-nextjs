"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import ReadMoreText from "@/components/common/ReadMoreText";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";
import useIsInViewport from "@/hooks/useIsInViewport";
import services from "@/data/services";

const HomeSection2 = ({ current, setCurrent }) => {
  const servicesRef = useRef(null);

  const isInView = useIsInViewport(servicesRef);

  useEffect(() => {
    if (isInView && current !== "services") setCurrent("services");

    return () => {
      if (isInView && current === "services") setCurrent(null);
    };
  }, [isInView, current, setCurrent]);

  return (
    <ResponsiveBox
      classNames="bg-[var(--bgColor)] min-h-[100vh] items-center justify-center"
      id="services"
      elementRef={servicesRef}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <h2 className="text-center mx-auto">
          What <span className="text-[var(--primaryColor)]">I Do</span>
        </h2>

        <WrappedBox classes="justify-items-center sm:grid-cols-2 mt-12">
          {services.map((service, index) => {
            return (
              <Column
                key={`service-${index}`}
                classes="bg-[var(--textColor10)] p-4 rounded-[var(--borderRadius)] items-center text-center"
              >
                <Image
                  src={service.image}
                  alt={`service-${index}`}
                  width={100}
                  height={100}
                  sizes="100%"
                  priority
                  placeholder="blur"
                  blurDataURL={service.image}
                  style={{
                    width: "5rem",
                    height: "5rem",
                    aspectRatio: "1 / 1",
                  }}
                />

                <h5 className="font-bold mt-4">{service.title}</h5>

                <span className="w-[3rem] h-[0.125rem] bg-[var(--primaryColor)] mx-auto mt-4"></span>

                <ReadMoreText className="mt-8" visibleTextCount={120}>
                  {service.description}
                </ReadMoreText>
              </Column>
            );
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection2;
