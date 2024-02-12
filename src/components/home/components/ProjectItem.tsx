import type { IProjectItem } from "@/types";
import { Balancer } from "react-wrap-balancer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import Column from "@/components/core/Column";
import Row from "@/components/core/Row";
import CardBox from "@/components/core/CardBox";

const ProjectItem = ({ project }: { project: IProjectItem }) => {
  return (
    <CardBox classNames="p-4 items-center justify-between text-center bg-[var(--textColor10)] group slide_in">
      <Column classNames="w-full items-center justify-center">
        <Row classNames="w-[2.5rem] md:w-[3rem] aspect-square items-center justify-center">
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

        <p className="text-lg/6 font-semibold mt-4">{project.title}</p>

        <div
          className={`flex flex-row items-center justify-center rounded-full py-[0.05] px-[0.5rem] mt-4 capitalize text-center border ${
            project.repoType.toLowerCase() === "private"
              ? "text-[var(--errorColor)] border-[var(--errorColor50)]"
              : "text-[var(--successColor)] border-[var(--successColor50)]"
          }`}
        >
          <p className="text-xs/6 font-semibold">{project.repoType}</p>
        </div>

        <Row classNames="w-full items-center justify-center mt-4 gap-2">
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

      <Column classNames="w-full mt-8 items-center">
        <p className="text-center text-base/6">
          <Balancer>{project.description}</Balancer>
        </p>

        <Row classNames="w-full items-center justify-center flex-wrap mt-4">
          {project.tags.map((tag, i) => {
            return (
              <p
                key={`tag-${i}`}
                className="rounded-[var(--borderRadius)] border border-[var(--textColor50)] py-[.125rem] px-2 mr-2 mb-2 text-xs/6 font-normal"
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
