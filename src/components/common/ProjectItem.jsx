import Image from "next/image";
import Link from "next/link";
import Column from "@/components/common/Column";
import Row from "@/components/common/Row";
import { FaGithub, FaEye } from "react-icons/fa";

const ProjectItem = ({ project }) => {
  return (
    <Column classes="carousel__slide">
      <Column classes="w-full bg-[var(--textColor10)] p-4 rounded-[var(--borderRadius)] items-center justify-between text-center">
        <Column classes="w-full items-center justify-center">
          <Row classes="w-[5rem] aspect-square bg-[var(--textColor10)] rounded-full p-[1rem] items-center justify-center">
            <Image
              src={project.icon}
              alt={`project-${project.title}`}
              width={100}
              height={100}
              sizes="100%"
              priority
              placeholder="blur"
              blurDataURL={project.icon}
              style={{
                objectFit: "cover",
                width: "100%",
                aspectRatio: "1 / 1",
              }}
            />
          </Row>

          <h4 className="font-bold mt-4">{project.title}</h4>

          <small
            className="rounded-lg py-[0.15rem] px-[0.5rem] mt-2 font-normal capitalize text-center"
            style={{
              backgroundColor:
                project.repoType.toLowerCase() === "private"
                  ? "var(--errorColor30)"
                  : "var(--successColor30)",
              border: `1px solid ${
                project.repoType.toLowerCase() === "private"
                  ? "var(--errorColor50)"
                  : "var(--successColor50)"
              }`,
              color:
                project.repoType.toLowerCase() === "private"
                  ? "var(--errorColor)"
                  : "var(--successColor)",
            }}
          >
            {project.repoType}
          </small>

          <Row classes="w-full items-center justify-center mt-4">
            {project.githubUrl ? (
              <Link
                href={project.githubUrl}
                target="_blank"
                className="text-white bg-[var(--primaryColor80)] p-2 rounded-full flex items-center justify-center mr-2 last:mr-0 hover:bg-[var(--primaryColor50)] transition duration-500 ease-in-out"
              >
                <FaGithub />
              </Link>
            ) : null}

            {project.url ? (
              <Link
                href={project.url}
                target="_blank"
                className="text-white bg-[var(--primaryColor)] p-2 rounded-full flex items-center justify-center mr-2 last:mr-0 hover:bg-[var(--primaryColor50)] transition duration-500 ease-in-out"
              >
                <FaEye />
              </Link>
            ) : null}
          </Row>
        </Column>

        <Column classes="w-full mt-12">
          <p>{project.description}</p>

          <Row classes="w-full items-center justify-center flex-wrap mt-4">
            {project.tags.map((tag, i) => {
              return (
                <small
                  key={`tag-${i}`}
                  className="bg-[var(--textColor10)] rounded-lg py-[0.45rem] px-[0.75rem] mr-2 mb-2 font-medium"
                >
                  {tag}
                </small>
              );
            })}
          </Row>
        </Column>
      </Column>
    </Column>
  );
};

export default ProjectItem;
