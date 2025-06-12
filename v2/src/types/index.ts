export interface Experience {
  title: string;
  company: string;
  date: string;
  description: string;
}

export interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  external?: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  level: string;
}

export interface ISkillList {
  title: string;
  items: Skill[];
}

export interface Stat {
  label: string;
  count: number | string;
}
