export interface navMenuItem {
  id: string
  title: string
  path: string
  section: string
  submenu?: navMenuItem[]
}