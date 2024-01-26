import Image from "next/image";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import ReadMoreText from "@/components/common/ReadMoreText";
import WrappedBox from "@/components/common/WrappedBox";
import CardBox from "@/components/common/CardBox";
import services from "@/data/services";

const HomeSection2 = ({ id }) => {
  return (
    <ResponsiveBox
      classNames="bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 min-h-[100vh] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <h2 className="text-center mx-auto">
          My Services
        </h2>

        <WrappedBox classes="justify-items-center sm:grid-cols-2 mt-12">
          {services.map((service, index) => {
            return (
              <CardBox
                key={`service-${index}`}
                classes="p-4 items-center text-center bg-[var(--textColor10)]"
              >
                <Image
                  src={service.image}
                  alt={`service-${index}`}
                  width={100}
                  height={100}
                  sizes="100%"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={service.image}
                  style={{
                    width: "5rem",
                    height: "auto",
                    aspectRatio: "1 / 1",
                  }}
                />

                <h5 className="font-bold">{service.title}</h5>

                <span className="w-[3rem] h-[0.125rem] bg-[var(--primaryColor)] mx-auto"></span>

                <ReadMoreText visibleTextCount={120}>
                  {service.description}
                </ReadMoreText>
              </CardBox>
            );
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection2;
