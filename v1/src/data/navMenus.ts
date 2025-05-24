import { INavItem } from "@/types";
import {
  faHome,
  faUser,
  faBriefcase,
  faTimeline,
  faAward,
  faLaptopCode,
  faEnvelope,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

export const navMenus: INavItem[] = [
  // {
  //   name: "Home",
  //   link: "/#hero",
  //   icon: faHome,
  // },
  {
    name: "About",
    link: "/#about",
    icon: faUser,
  },
  {
    name: "Services",
    link: "/#services",
    icon: faBriefcase,
  },
  {
    name: "Experiences",
    link: "/#experiences",
    icon: faTimeline,
  },
  {
    name: "Skills",
    link: "/#skills",
    icon: faAward,
  },
  {
    name: "Projects",
    link: "/#projects",
    icon: faLaptopCode,
  },
  {
    name: "Contact",
    link: "/#contact",
    icon: faEnvelope,
  },
  {
    name: "Payment",
    link: "/payment",
    icon: faCreditCard,
  },
];
