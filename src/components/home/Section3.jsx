import Image from "next/image";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";

const skills = [
  {
    title: "Flutter",
    level: "Expert",
    icon: "/logo/flutter.webp",
  },
  {
    title: "React.js",
    level: "Expert",
    icon: "/logo/reactjs.webp",
  },
  {
    title: "Next.js",
    level: "Expert",
    icon: "/logo/nextjs.webp",
  },
  {
    title: "Node.js",
    level: "Intermediate",
    icon: "/logo/nodejs.webp",
  },
  {
    title: "HTML",
    level: "Expert",
    icon: "/logo/html.webp",
  },
  {
    title: "CSS",
    level: "Intermediate",
    icon: "/logo/css.webp",
  },
  {
    title: "MongoDB",
    level: "Intermediate",
    icon: "/logo/mongodb.webp",
  },
  {
    title: "SASS",
    level: "Intermediate",
    icon: "/logo/sass.webp",
  },
];

const HomeSection3 = () => {
  return (
    <ResponsiveBox classNames="bg-[var(--dialogColor)]">
      <ConstraintedBox classNames="p-4 py-12">
        <h2 className="text-center mx-auto">
          Skills <span className="text-[var(--primaryColor)]">I Know</span>
        </h2>

        <WrappedBox classes="justify-items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-8">
          {skills.map((service, index) => {
            return (
              <Column
                key={`service-${index}`}
                classes="bg-[var(--bgColor)] p-4 px-8 rounded-lg items-center text-center min-w-[10rem]"
              >
                <Image
                  src={service.icon}
                  alt={`service-${index}`}
                  width={100}
                  height={100}
                  sizes="100%"
                  priority
                  placeholder="blur"
                  blurDataURL={service.icon}
                  style={{
                    objectFit: "cover",
                    width: "4rem",
                    height: "4rem",
                    aspectRatio: "1 / 1",
                  }}
                />

                <h5 className="font-bold mt-4">{service.title}</h5>

                <small className="mt-4 flex flex-row items-center">
                  <span
                    style={{
                      marginRight: "0.25rem",
                    }}
                  >
                    ⭐
                  </span>
                  {service.level}
                </small>
              </Column>
            );
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection3;
