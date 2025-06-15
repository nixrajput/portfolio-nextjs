"use client";

import ThemeModeToggle from "@/components/theme/theme-mode-toggle";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavItems,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  name: string;
  link: string;
}

interface CustomNavBarProps {
  className?: string;
  navItems?: NavItem[];
  logoSrc?: string;
  logoText?: string;
}

const defaultNavItems: NavItem[] = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Services", link: "/services" },
  { name: "Projects", link: "/projects" },
  { name: "Contact", link: "/contact" },
];

const CustomNavBar = ({
  className,
  navItems = defaultNavItems,
  logoSrc = "/icon.png",
}: CustomNavBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar className={className}>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo logoSrc={logoSrc} logoSize={32} showLogoText={false} />
        <NavItems items={navItems} activePath={pathname} />
        <div className="relative hidden flex-row items-center transition duration-200 lg:flex ml-4">
          <ThemeModeToggle onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo logoSrc={logoSrc} logoSize={32} showLogoText={false} />

          <div className="flex items-center gap-4">
            <ThemeModeToggle onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <MobileNavItems
            items={navItems}
            activePath={pathname}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default CustomNavBar;
