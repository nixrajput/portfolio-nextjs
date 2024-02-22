import { ReactNode } from "react";

const ProjectsLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <section>{children}</section>;
};

export default ProjectsLayout;
