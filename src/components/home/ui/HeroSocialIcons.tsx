"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Row from "@/components/core/Row";
import socialLinks from "@/data/socialLinks";

const HeroSocialIcons = () => {
  return (
    <motion.div
      className="mt-12 lg:mt-16 w-full flex flex-col items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "linear",
        delay: 6,
      }}
    >
      <p className="text-base/6 font-semibold">Follow me here</p>

      <Row classNames="mt-2 gap-2">
        {socialLinks.slice(0, 5).map((link, index) => {
          return (
            <Link
              key={`social-link-${index}`}
              href={link.url}
              target="_blank"
              className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-[var(--textColor)]"
              aria-label={`${link.name}`}
            >
              <span className="text-base/6 text-[var(--whiteColor)]">
                <FontAwesomeIcon icon={link.icon} />
              </span>
            </Link>
          );
        })}
      </Row>
    </motion.div>
  );
};

export default HeroSocialIcons;
