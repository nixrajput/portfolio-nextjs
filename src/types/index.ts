export interface navMenuItem {
  id: string
  title: string
  path: string
  section: string
  submenu?: navMenuItem[]
}

export interface MenutItemProps {
  items: navMenuItem,
  depthLevel: number,
  mobileNav: boolean,
  handleCloseMobileMenu: () => void,
  current?: string
}

export interface DropdownMenuProps extends Omit<MenutItemProps, "items" | "current"> {
  submenus: navMenuItem[],
  dropdown: boolean
}