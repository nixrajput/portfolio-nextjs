import Image from "next/image";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import Column from "@/components/common/Column";
import Carousel from "@/components/common/carousel/Carousel";

const projects = [
  {
    title: "Social Media App",
    description:
      "A social media mobile application developed using Flutter, GetX, Firebase Notifications and Hive.",
    icon: "",
    sceenshots: [],
    githubLink: "https://github.com/nixrajput/social-media-app-flutter",
    repoType: "public",
  },
  {
    title: "Video Calling App",
    description:
      "A video calling mobile application developed using Flutter and Agora SDK that allows users to call each other face to face.",
    icon: "",
    sceenshots: [],
    githubLink: "https://github.com/nixrajput/video-calling-app-flutter",
    repoType: "public",
  },
  {
    title: "Social Media API",
    description:
      "An RESTful API developed using Node.js, Express.js and MongoDB to integrate backend and frontend with ease.",
    icon: "",
    sceenshots: [],
    githubLink: "https://github.com/nixrajput/social-media-api-nodejs",
    repoType: "private",
  },
  {
    title: "E-commerce App",
    description:
      "An e-commerce web application developed using React.js, Material UI, Redux, and Stripe.",
    icon: "",
    sceenshots: [],
    githubLink: "https://github.com/nixrajput/ecommerce-web-reactjs",
    repoType: "public",
  },
  {
    title: "Grocery List Maker App",
    description:
      "A grocery list maker mobile application developed using Flutter, BloC, Hive DB and PDF.",
    icon: "",
    sceenshots: [],
    githubLink: "https://github.com/nixrajput/grocery-list-maker-flutter",
    repoType: "public",
  },
  {
    title: "E-commerce API",
    description:
      "An RESTful API developed using Node.js, Express.js, MongoDB, and Stripe.",
    icon: "",
    sceenshots: [],
    githubLink: "https://github.com/nixrajput/ecommerce-api-nodejs",
    repoType: "public",
  },
];

const HomeSection4 = () => {
  return (
    <ResponsiveBox classNames="bg-[var(--bgColor)]">
      <ConstraintedBox classNames="p-4 py-16">
        <h2 className="text-center mx-auto">
          Recent <span className="text-[var(--primaryColor)]">Projects</span>
        </h2>

        <Carousel classes="mt-12">
          {projects.map((project, index) => {
            return (
              <Column
                key={`service-${index}`}
                classes="flex-[0_0_100%] min-h-[20rem] bg-[var(--dialogColor)] p-4 rounded-lg items-center text-center"
              >
                {/* <Image
                  src={project.image}
                  alt="profile"
                  width={100}
                  height={100}
                  sizes="100%"
                  priority
                  placeholder="blur"
                  blurDataURL={project.image}
                  style={{
                    objectFit: "cover",
                    width: "5rem",
                    height: "5rem",
                    aspectRatio: "1 / 1",
                  }}
                /> */}

                <h5 className="font-bold mt-4">{project.title}</h5>

                <small className="mt-4">{project.description}</small>
              </Column>
            );
          })}
        </Carousel>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection4;
