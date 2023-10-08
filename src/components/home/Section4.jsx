"use client";

import { useRef, useEffect } from "react";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import Carousel from "@/components/common/carousel/Carousel";
import ProjectItem from "@/components/common/ProjectItem";
import useIsInViewport from "@/hooks/useIsInViewport";

const projects = [
  {
    title: "Social Media App",
    description:
      "A social media mobile application developed using Flutter, GetX, Firebase Notifications and Hive.",
    icon: "/logo/flutter.webp",
    sceenshots: [],
    githubUrl: "https://github.com/nixrajput/social-media-app-flutter",
    url: "https://www.nixlab.co.in/projects/com.nixlab.rippl",
    repoType: "public",
    tags: ["Flutter", "Dart", "GetX", "Hive"],
  },
  {
    title: "E-commerce App",
    description:
      "An e-commerce web application developed using React.js, Material UI, Redux, and Stripe.",
    icon: "/logo/reactjs.webp",
    sceenshots: [],
    githubUrl: "https://github.com/nixrajput/ecommerce-web-reactjs",
    url: "https://nixlab-shop.cyclic.app",
    repoType: "public",
    tags: ["React.js", "Redux", "Material UI", "Stripe"],
  },
  {
    title: "Video Calling App",
    description:
      "A video calling mobile application developed using Flutter and Agora SDK that allows users to call each other face to face.",
    icon: "/logo/flutter.webp",
    sceenshots: [],
    githubUrl: "https://github.com/nixrajput/video-calling-app-flutter",
    url: "https://www.nixlab.co.in/projects/livebox-app",
    repoType: "public",
    tags: ["Flutter", "Dart", "GetX", "Agora SDK"],
  },
  {
    title: "Social Media API",
    description:
      "An RESTful API developed using Node.js, Express.js and MongoDB to integrate backend and frontend with ease.",
    icon: "/logo/nodejs.webp",
    sceenshots: [],
    githubUrl: "https://github.com/nixrajput/social-media-api-nodejs",
    repoType: "private",
    tags: ["Node.js", "Express.js", "MongoDB", "WebSocket"],
  },
  {
    title: "Grocery List Maker App",
    description:
      "A grocery list maker mobile application developed using Flutter, BloC, Hive DB and PDF.",
    icon: "/logo/flutter.webp",
    sceenshots: [],
    githubUrl: "https://github.com/nixrajput/grocery-list-maker-flutter",
    url: "https://github.com/nixrajput/grocery-list-maker-flutter/releases/latest",
    repoType: "public",
    tags: ["Flutter", "Dart", "BLoC", "PDF", "Hive"],
  },
  {
    title: "E-commerce API",
    description:
      "An RESTful API developed using Node.js, Express.js, MongoDB, and Stripe to integrate e-commerce backend.",
    icon: "/logo/nodejs.webp",
    sceenshots: [],
    githubUrl: "https://github.com/nixrajput/ecommerce-api-nodejs",
    repoType: "public",
    tags: ["Node.js", "Express.js", "MongoDB", "Stripe"],
  },
];

const HomeSection4 = ({ current, setCurrent }) => {
  const projectsRef = useRef(null);

  const isInView = useIsInViewport(projectsRef);

  useEffect(() => {
    if (isInView && current !== "projects") setCurrent("projects");

    return () => {
      if (isInView && current === "projects") setCurrent(null);
    };
  }, [isInView, current, setCurrent]);

  return (
    <ResponsiveBox
      classNames="bg-[var(--bgColor)] min-h-[100vh] items-center justify-center"
      animateReverse
      id="projects"
      elementRef={projectsRef}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <h2 className="text-center mx-auto">
          Recent <span className="text-[var(--primaryColor)]">Projects</span>
        </h2>

        <Carousel classes="mt-12 w-full">
          {projects.map((project, index) => {
            return <ProjectItem key={`service-${index}`} project={project} />;
          })}
        </Carousel>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection4;
