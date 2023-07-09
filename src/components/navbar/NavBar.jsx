"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import navMenus from "@/data/navMenus";
import MenuItems from "@/components/navbar/MenuItems";

const NavBar = () => {
  const mobileMenuRef = useRef(null);
  const navRef = useRef();

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const toggleMenu = () => {
    const cList = mobileMenuRef.current.classList;

    if (
      cList.contains("flex") &&
      cList.contains("opacity-1") &&
      cList.contains("z-[1000]") &&
      cList.contains("visible")
    ) {
      hideMobileMenu();
    } else {
      showMobileMenu();
    }
  };

  const showMobileMenu = () => {
    const cList = mobileMenuRef.current.classList;

    if (
      cList.contains("hidden") &&
      cList.contains("opacity-0") &&
      cList.contains("z-0") &&
      cList.contains("invisible")
    ) {
      cList.remove("hidden");
      cList.remove("opacity-0");
      cList.remove("z-0");
      cList.remove("invisible");
    }

    cList.add("flex");
    cList.add("opacity-1");
    cList.add("z-[1000]");
    cList.add("visible");
    setMobileMenuVisible(true);
  };

  const hideMobileMenu = () => {
    const cList = mobileMenuRef.current.classList;

    if (
      cList.contains("flex") &&
      cList.contains("opacity-1") &&
      cList.contains("z-[1000]") &&
      cList.contains("visible")
    ) {
      cList.remove("flex");
      cList.remove("opacity-1");
      cList.remove("z-[1000]");
      cList.remove("visible");
    }

    cList.add("hidden");
    cList.add("opacity-0");
    cList.add("z-0");
    cList.add("invisible");
    setMobileMenuVisible(false);
  };

  useOnClickOutside(navRef, hideMobileMenu);

  return (
    <nav
      className="fixed w-screen h-auto z-[1000] top-0 bg-[var(--dialogColor)]"
      ref={navRef}
    >
      <div className="h-full flex mx-auto px-4 py-6 constrained-width">
        <div className="w-full flex justify-between items-center">
          <Link
            href="/"
            className="w-fit h-fit text-2xl lg:text-3xl font-bold text-white flex flex-row items-center"
          >
            <Image
              src="/icon.png"
              alt="profile"
              width={80}
              height={80}
              sizes="100%"
              priority
              placeholder="blur"
              blurDataURL="/icon.png"
              className="w-8 lg:w-10 h-auto mr-1"
            />
            Portfolio
          </Link>

          <div className="w-full hidden lg:flex items-center justify-end flex-1 list-none">
            {navMenus.map((menu, index) => {
              const depthLevel = 0;
              return (
                <MenuItems
                  items={menu}
                  key={index}
                  mobileNav={mobileMenuVisible}
                  depthLevel={depthLevel}
                  handleCloseMobileMenu={hideMobileMenu}
                />
              );
            })}
          </div>

          <div className="lg:hidden flex justify-end">
            <button
              type="button"
              name="menu-btn"
              className="outline-none menu-button"
              onClick={(_) => toggleMenu()}
            >
              {mobileMenuVisible ? (
                <IoMdClose className="text-3xl xs:text-2xl hover:scale-110 transition duration-300 ease-in-out" />
              ) : (
                <HiMenuAlt3 className="text-3xl xs:text-2xl hover:scale-110 transition duration-300 ease-in-out" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}

        <div
          className="mobile-menu text-center flex-col m-0 w-[50%] md:w-[30%] bg-[var(--dialogColor)] h-screen absolute top-full right-0 transition duration-300 ease-in-out drop_out hidden opacity-0 z-0 invisible box-shadow lg:hidden"
          ref={mobileMenuRef}
        >
          <div className="flex flex-col list-none">
            {navMenus.map((menu, index) => {
              const depthLevel = 0;
              return (
                <MenuItems
                  items={menu}
                  key={index}
                  mobileNav={mobileMenuVisible}
                  depthLevel={depthLevel}
                  handleCloseMobileMenu={hideMobileMenu}
                />
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
