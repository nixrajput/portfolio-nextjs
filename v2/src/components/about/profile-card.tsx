"use client";

import { LiquidGlassButton } from "@/components/common/liquid-glass-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  defaultAvatarAlt,
  defaultAvatarSrc,
  defaultName,
  defaultSocialLinks,
} from "@/data";
import type { SocialLink } from "@/types";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

interface ProfileCardProps {
  name?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  socialLinks?: SocialLink[];
}

const ProfileCard = ({
  name = defaultName,
  avatarSrc = defaultAvatarSrc,
  avatarAlt = defaultAvatarAlt,
  socialLinks = defaultSocialLinks,
}: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="min-w-full md:min-w-[20rem] h-full"
    >
      <Card className="overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm h-full p-0">
        <CardContent className="p-0 w-full h-full">
          <div className="relative h-48 w-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <Avatar className="h-40 w-40 border-4 border-white dark:border-neutral-900 shadow-lg">
                <Image
                  src={avatarSrc}
                  alt={avatarAlt}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPg=="
                  width={128}
                  height={128}
                  sizes="100%"
                  loading="lazy"
                  className="w-40 h-40 rounded-full"
                />
                <AvatarFallback>NR</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="pt-20 pb-6 px-6 text-center">
            <h3 className="text-2xl font-bold text-primary dark:text-primary mb-4">
              {name}
            </h3>

            <div className="flex justify-center gap-2 mb-6">
              {socialLinks.map((link, idx) => (
                <LiquidGlassButton key={`social-link-${idx}`} size="icon">
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                  >
                    <link.icon className="w-6 h-6" />
                  </Link>
                </LiquidGlassButton>
              ))}
            </div>

            <LiquidGlassButton size="lg">
              Let&apos;s Chat
              <IconArrowRight className="h-4 w-4 ml-2" />
            </LiquidGlassButton>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
