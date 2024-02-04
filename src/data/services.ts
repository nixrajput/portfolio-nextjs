import {
  faMobileButton,
  faLaptopCode,
  faServer,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import { ServiceItem } from "@/types";

const services: ServiceItem[] = [
  {
    title: "Mobile App Development",
    icon: faMobileButton,
    shortDescription:
      "I specialize in creating captivating mobile applications that engage your audience.",
    description:
      "I specialize in creating captivating mobile applications that engage your audience. From concept to deployment, I develop native and cross-platform apps for iOS and Android. With cutting-edge technologies, I ensure seamless performance, intuitive interfaces, and robust functionality that aligns perfectly with your business goals.",
  },
  {
    title: "Web Development",
    icon: faLaptopCode,
    shortDescription:
      "I deliver visually stunning and user-friendly websites to help you establish a strong online presence.",
    description:
      "I deliver visually stunning and user-friendly websites to help you establish a strong online presence. Whether it's a simple informational site or a complex e-commerce platform, I provide tailored web development solutions. Using the latest frameworks and technologies, I create responsive, SEO-friendly websites that offer a seamless browsing experience on all devices.",
  },
  {
    title: "Backend Development",
    icon: faServer,
    shortDescription:
      "I enhance your digital applications with a robust and scalable backend infrastructure.",
    description:
      "I enhance your digital applications with a robust and scalable backend infrastructure. With expertise in backend development, I create efficient database structures, develop APIs, and configure servers to ensure optimal performance, security, and scalability. My solutions empower your applications to seamlessly handle high traffic and complex data management.",
  },
  {
    title: "Product Strategy",
    icon: faBrain,
    shortDescription:
      "I collaborate with you to define clear goals, target audiences, and a roadmap for success.",
    description:
      "I collaborate with you to define clear goals, target audiences, and a roadmap for success. My expertise in product ideation and market analysis ensures that your product not only meets user needs but also aligns with your business strategy for long-term growth and full potential of your digital products with effective product strategy.",
  },
];

export default services;
