import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import type { MouseEventHandler, ReactNode, RefObject } from "react";

export interface INavMenuItem {
  id: string;
  title: string;
  path: string;
  section: string;
  submenu?: INavMenuItem[];
}

export interface INavItem {
  name: string;
  link: string;
  icon: IconProp;
}

export interface IExperienceItem {
  designation: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  location: string;
  shortDescription?: string;
  description: string[];
}

export enum RepoType {
  Public,
  Private,
}

export enum ProjectType {
  Personal,
  JobWork,
  Freelance,
}

export interface IProjectItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  repoType: RepoType;
  projectType?: ProjectType;
  githubUrl?: string;
  url?: string;
  tags?: string[];
  screenshots?: string[];
  about?: string;
}

export type IServiceItem = {
  id: number | string;
  title: string;
  icon?: IconDefinition;
  shortDescription: string;
  description: string;
  icons: string[];
};

export interface ISkillListItem {
  title: string;
  items: ISkillItem[];
}

export enum SkillLevel {
  Expert,
  Intermediate,
  Beginner,
}

export interface ISkillItem {
  title: string;
  level?: SkillLevel;
  icon?: string;
}

export interface ISocialLinkItem {
  url: string;
  icon: IconDefinition | string;
  text: string;
  name?: string;
}

export interface MenuItemProps {
  items: INavMenuItem;
  depthLevel: number;
  mobileNav: boolean;
  handleCloseMobileMenu: () => void;
  current?: string;
}

export interface DropdownMenuProps
  extends Omit<MenuItemProps, "items" | "current"> {
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

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export interface BulletedTextProps {
  children: ReactNode;
  classNames?: string;
  iconSize?: string | number;
  bulletColor?: string;
}
