"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconDownload,
  IconMail,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";

interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  external?: boolean;
}

interface ProfileCardProps {
  name?: string;
  title?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  socialLinks?: SocialLink[];
}

const defaultSocialLinks: SocialLink[] = [
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

const ProfileCard = ({
  name = "Nikhil Rajput",
  title = "Full Stack Developer",
  avatarSrc = "/images/profile.png",
  avatarAlt = "Nikhil Rajput",
  socialLinks = defaultSocialLinks,
}: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="lg:col-span-4"
    >
      <Card className="overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="relative h-48 w-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <Avatar className="h-32 w-32 border-4 border-white dark:border-neutral-900 shadow-lg">
                <AvatarImage src={avatarSrc} alt={avatarAlt} />
                <AvatarFallback>NR</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="pt-20 pb-6 px-6 text-center">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-1">
              {name}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              {title}
            </p>

            <div className="flex justify-center gap-2 mb-6">
              {socialLinks.map((link, idx) => (
                <Button
                  key={`social-link-${idx}`}
                  size="icon"
                  variant="outline"
                  asChild
                >
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                  >
                    <link.icon className="w-5 h-5" />
                  </Link>
                </Button>
              ))}
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 hover:opacity-90 transition-opacity text-white">
              <IconDownload className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
