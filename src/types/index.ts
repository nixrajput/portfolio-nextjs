import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type {
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from "react";

export interface navMenuItem {
  id: string;
  title: string;
  path: string;
  section: string;
  submenu?: navMenuItem[];
}

export interface MenutItemProps {
  items: navMenuItem;
  depthLevel: number;
  mobileNav: boolean;
  handleCloseMobileMenu: () => void;
  current?: string;
}

export interface DropdownMenuProps
  extends Omit<MenutItemProps, "items" | "current"> {
  submenus: navMenuItem[];
  dropdown: boolean;
}

export interface ExperienceItem {
  designation: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  location: string;
  shortDescription: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  icon: string;
  sceenshots: string[];
  githubUrl: string;
  url: string;
  repoType: string;
  tags: string[];
}

export interface ServiceItem {
  title: string;
  icon: IconDefinition;
  shortDescription: string;
  description: string;
}

export interface SkillItem {
  title: string;
  level: string;
  icon: string;
}

export interface SocialLinkItem {
  url: string;
  icon: IconDefinition;
  text: string;
  name?: string;
}

export interface ButtonComponentProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  name?: string;
}

export interface ComponentsCommonProps {
  children: ReactNode;
  classes?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  id?: string;
  elementRef?: RefObject<HTMLDivElement>;
}

export interface ViewportProps {
  root?: null | undefined;
  rootMargin?: string | undefined;
  threshold?: number | undefined;
}
