import Image from "next/image";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";

const services = [
  {
    title: "Mobile App Development",
    image: "/icons/mobile-dev.png",
    description:
      "I specialize in creating captivating mobile applications that engage your audience. From concept to deployment, I develop native and cross-platform apps for iOS and Android. With cutting-edge technologies, I ensure seamless performance, intuitive interfaces, and robust functionality that aligns perfectly with your business goals.",
  },
  {
    title: "Web Development",
    image: "/icons/web-dev.png",
    description:
      "I deliver visually stunning and user-friendly websites to help you establish a strong online presence. Whether it's a simple informational site or a complex e-commerce platform, I provide tailored web development solutions. Using the latest frameworks and technologies, I create responsive, SEO-friendly websites that offer a seamless browsing experience on all devices.",
  },
  {
    title: "Backend Development",
    image: "/icons/backend-dev.png",
    description:
      "I enhance your digital applications with a robust and scalable backend infrastructure. With expertise in backend development, I create efficient database structures, develop APIs, and configure servers to ensure optimal performance, security, and scalability. My solutions empower your applications to seamlessly handle high traffic and complex data management.",
  },
];

const HomeSection2 = () => {
  return (
    <ResponsiveBox classNames="bg-[var(--bgColor)]">
      <ConstraintedBox classNames="p-4 py-16">
        <h2 className="text-center mx-auto">
          What <span className="text-[var(--primaryColor)]">I Do</span>
        </h2>

        <WrappedBox classes="justify-items-center sm:grid-cols-3 mt-12">
          {services.map((service, index) => {
            return (
              <Column
                key={`service-${index}`}
                classes="bg-[var(--dialogColor)] p-4 rounded-lg items-center text-center"
              >
                <Image
                  src={service.image}
                  alt="profile"
                  width={100}
                  height={100}
                  sizes="100%"
                  priority
                  placeholder="blur"
                  blurDataURL={service.image}
                  style={{
                    objectFit: "cover",
                    width: "5rem",
                    height: "5rem",
                    aspectRatio: "1 / 1",
                  }}
                />

                <h5 className="font-bold mt-4">{service.title}</h5>

                <small className="mt-4">{service.description}</small>
              </Column>
            );
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection2;
