"use client";

import ThemeModeToggle from "@/components/theme-mode-toggle";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

const CustomNavBar = ({ className }: { className?: string }) => {
  const navItems = [
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Experiences",
      link: "/experiences",
    },
    {
      name: "Skills",
      link: "/skills",
    },
    {
      name: "Projects",
      link: "/projects",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar className={className}>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo logoSrc="/icon.png" logoText="Nikhil Rajput" />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <NavbarButton href="/book-a-call" variant="primary">
            Book a call
          </NavbarButton>
          <NavbarButton variant="primary" className="p-0">
            <ThemeModeToggle />
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo logoSrc="/icon.png" logoText="Nikhil Rajput" />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              href="/book-a-call"
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Book a call
            </NavbarButton>

            <NavbarButton variant="primary" className="w-full p-0">
              <ThemeModeToggle />
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default CustomNavBar;
