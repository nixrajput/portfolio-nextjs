import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export interface navMenuItem {
  id: string
  title: string
  path: string
  section: string
  submenu?: navMenuItem[]
}

export interface MenutItemProps {
  items: navMenuItem
  depthLevel: number
  mobileNav: boolean
  handleCloseMobileMenu: () => void
  current?: string
}

export interface DropdownMenuProps extends Omit<MenutItemProps, "items" | "current"> {
  submenus: navMenuItem[]
  dropdown: boolean
}

export interface ExperienceItem {
  designation: string
  company: string
  startDate: string
  endDate: string
  isCurrentJob: boolean
  location: string
  shortDescription: string
  description: string
}

export interface ProjectItem {
  title: string
  description: string
  icon: string
  sceenshots: string[]
  githubUrl: string
  url: string
  repoType: string
  tags: string[]
}

export interface ServiceItem {
  title: string
  icon: IconDefinition
  shortDescription: string
  description: string
}

export interface SkillItem {
  title: string
  level: string
  icon: string
}

export interface SocialLinkItem {
  name: string
  url: string
  icon: IconDefinition
  text: string
}