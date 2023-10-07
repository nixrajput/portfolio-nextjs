import Image from "next/image";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";

const services = [
  {
    title: "Mobile App Development",
    image: "/icons/mobile-dev.webp",
    description:
      "I specialize in creating captivating mobile applications that engage your audience. From concept to deployment, I develop native and cross-platform apps for iOS and Android. With cutting-edge technologies, I ensure seamless performance, intuitive interfaces, and robust functionality that aligns perfectly with your business goals.",
  },
  {
    title: "Web Development",
    image: "/icons/web-dev.webp",
    description:
      "I deliver visually stunning and user-friendly websites to help you establish a strong online presence. Whether it's a simple informational site or a complex e-commerce platform, I provide tailored web development solutions. Using the latest frameworks and technologies, I create responsive, SEO-friendly websites that offer a seamless browsing experience on all devices.",
  },
  {
    title: "Backend Development",
    image: "/icons/backend-dev.webp",
    description:
      "I enhance your digital applications with a robust and scalable backend infrastructure. With expertise in backend development, I create efficient database structures, develop APIs, and configure servers to ensure optimal performance, security, and scalability. My solutions empower your applications to seamlessly handle high traffic and complex data management.",
  },
  {
    title: "Product Strategy",
    image: "/icons/backend-dev.webp",
    description:
      "I collaborate with you to define clear goals, target audiences, and a roadmap for success. My expertise in product ideation and market analysis ensures that your product not only meets user needs but also aligns with your business strategy for long-term growth and full potential of your digital products with effective product strategy.",
  },
];

const HomeSection2 = () => {
  return (
    <ResponsiveBox
      classNames="bg-[var(--bgColor)] min-h-[100vh] items-center justify-center"
      animateReverse
      id="services"
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
                    objectFit: "cover",
                    width: "5rem",
                    height: "5rem",
                    aspectRatio: "1 / 1",
                  }}
                />

                <h5 className="font-bold mt-4">{service.title}</h5>

                <span className="w-[3rem] h-[0.125rem] bg-[var(--primaryColor)] mx-auto mt-4"></span>

                <p className="mt-8">{service.description}</p>
              </Column>
            );
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection2;
