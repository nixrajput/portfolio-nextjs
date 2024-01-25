import Image from "next/image";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";
import skills from "@/data/skills";

const HomeSection4 = ({ id }) => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--bgColor)] min-h-[100vh] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-12">
        <h2 className="text-center mx-auto">
          Skills <span className="text-[var(--primaryColor)]">I Know</span>
        </h2>

        <WrappedBox classes="justify-items-center grid-cols-2 sm:grid-cols-3 mt-12">
          {skills.map((service, index) => {
            return (
              <Column
                key={`skill-${index}`}
                classes="bg-[var(--textColor10)] p-4 px-8 rounded-[var(--borderRadius)] items-center text-center min-w-[10rem]"
              >
                <Image
                  src={service.icon}
                  alt={`service-${index}`}
                  width={100}
                  height={100}
                  sizes="100%"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={service.icon}
                  style={{
                    objectFit: "cover",
                    width: "4rem",
                    height: "auto",
                    aspectRatio: "1 / 1",
                  }}
                />

                <h5 className="font-bold mt-4">{service.title}</h5>

                <p className="mt-4 flex flex-row items-center">
                  {service.level}
                </p>
              </Column>
            );
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection4;
