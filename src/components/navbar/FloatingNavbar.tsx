"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { INavItem } from "@/types";

const FloatingNavbar = ({
  navItems,
  className,
}: {
  navItems: INavItem[];
  className?: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-4 inset-x-0 mx-auto border border-white/[0.25] rounded-full bg-[var(--dialogColor50)] backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: INavItem, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1 text-neutral-50 hover:text-neutral-300"
            )}
          >
            <span className="block sm:hidden">
              <FontAwesomeIcon
                id={`nav-item-icon${idx}`}
                icon={navItem.icon}
                title={navItem.name}
              />
            </span>
            <span className="hidden sm:block text-sm/6 lg:text-base">
              {navItem.name}
            </span>
          </Link>
        ))}
        <Link
          href="https://github.com/sponsors/nixrajput"
          target="_blank"
          className="border text-xs/none sm:text-sm/none font-medium relative border-white/[0.2] text-white hover:text-[var(--primaryColor)] px-4 py-2 rounded-full"
        >
          <span className="block sm:hidden">
            <FontAwesomeIcon icon={faHandHoldingDollar} title="Support Me" />
          </span>
          <span className="hidden sm:block">Support Me</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-[var(--primaryColor)] to-transparent  h-px" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNavbar;
