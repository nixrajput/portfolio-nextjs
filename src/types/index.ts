import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { MouseEventHandler, ReactNode, RefObject } from "react";

export interface INavMenuItem {
  id: string;
  title: string;
  path: string;
  section: string;
  submenu?: INavMenuItem[];
}

export interface IExperienceItem {
  designation: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  location: string;
  shortDescription: string;
  description: string;
}

export enum RepoType {
  Public,
  Private,
}

export interface IProjectItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  repoType: RepoType;
  githubUrl?: string;
  url?: string;
  tags?: string[];
  sceenshots?: string[];
}

export interface IServiceItem {
  title: string;
  icon: IconDefinition;
  shortDescription: string;
  description: string;
}

export interface ISkillListItem {
  title: string;
  items: ISkillItem[];
}

export enum SkillLevel {
  Expert,
  Intermediate,
  Begginer,
}

export interface ISkillItem {
  title: string;
  level?: SkillLevel;
  icon?: string;
}

export interface ISocialLinkItem {
  url: string;
  icon: IconDefinition;
  text: string;
  name?: string;
}

export interface MenutItemProps {
  items: INavMenuItem;
  depthLevel: number;
  mobileNav: boolean;
  handleCloseMobileMenu: () => void;
  current?: string;
}

export interface DropdownMenuProps
  extends Omit<MenutItemProps, "items" | "current"> {
  submenus: INavMenuItem[];
  dropdown: boolean;
}

export interface ButtonComponentProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  classNames?: string;
  name?: string;
}

export interface CoreComponentsProps {
  children: ReactNode;
  classNames?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  id?: string;
  elementRef?: RefObject<HTMLDivElement>;
}

export interface ViewportProps {
  root?: null | undefined;
  rootMargin?: string | undefined;
  threshold?: number | undefined;
}

export interface ShootingStarProps {
  vw: number;
  vh: number;
}
