import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Column from "@/components/common/Column";
import Row from "@/components/common/Row";
import CardBox from "@/components/common/CardBox";

const ProjectItem = ({ project }) => {
  return (
    <CardBox classes="p-4 items-center justify-between text-center bg-[var(--textColor10)] group">
      <Column classes="w-full items-center justify-center">
        <Row classes="w-[2.5rem] md:w-[3rem] aspect-square items-center justify-center">
          <Image
            src={project.icon}
            alt={`project-${project.title}`}
            width={100}
            height={100}
            sizes="100%"
            loading="lazy"
            placeholder="blur"
            blurDataURL={project.icon}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              aspectRatio: "1 / 1",
            }}
          />
        </Row>

        <p className="text-lg/6 font-bold mt-4">{project.title}</p>

        <div
          className={`flex flex-row items-center justify-center rounded-full py-[0.05] px-[0.5rem] mt-4 capitalize text-center ${
            project.repoType.toLowerCase() === "private"
              ? "text-[var(--errorColor)]"
              : "text-[var(--successColor)]"
          }`}
          style={{
            border: `1px solid ${
              project.repoType.toLowerCase() === "private"
                ? "var(--errorColor50)"
                : "var(--successColor50)"
            }`,
          }}
        >
          <p className="text-xs/6 font-semibold">{project.repoType}</p>
        </div>

        <Row classes="w-full items-center justify-center mt-4 gap-2">
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              aria-label={`${project.title} GitHub URL`}
              target="_blank"
              className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-[var(--textColor)]"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="text-base/6 text-[var(--textColor)]"
              />
            </Link>
          ) : null}

          {project.url ? (
            <Link
              href={project.url}
              aria-label={`${project.title} Project URL`}
              target="_blank"
              className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-[var(--textColor)]"
            >
              <FontAwesomeIcon
                icon={faEye}
                className="text-base/6 text-[var(--textColor)]"
              />
            </Link>
          ) : null}
        </Row>
      </Column>

      <Column classes="w-full mt-8 items-center">
        <p className="text-center text-base/6">{project.description}</p>

        <Row classes="w-full items-center justify-center flex-wrap mt-4">
          {project.tags.map((tag, i) => {
            return (
              <p
                key={`tag-${i}`}
                className="bg-[var(--textColor10)] rounded-lg py-[0.45rem] px-[0.9rem] mr-2 mb-2 text-sm/6 font-medium"
              >
                {tag}
              </p>
            );
          })}
        </Row>
      </Column>
    </CardBox>
  );
};

export default ProjectItem;
