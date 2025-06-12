import type { SocialLink } from "@/types";
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandX,
    IconMail,
} from "@tabler/icons-react";

export const defaultSocialLinks: SocialLink[] = [
  {
    href: "https://github.com/nixrajput",
    icon: IconBrandGithub,
    label: "GitHub",
    external: true,
  },
  {
    href: "https://linkedin.com/in/nixrajput",
    icon: IconBrandLinkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    href: "https://x.com/nixrajput07",
    icon: IconBrandX,
    label: "X",
    external: true,
  },
  {
    href: "mailto:nixrajput@gmail.com",
    icon: IconMail,
    label: "Email",
    external: true,
  },
];
