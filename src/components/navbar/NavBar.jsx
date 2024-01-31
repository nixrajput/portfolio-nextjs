"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import navMenus from "@/data/navMenus";
import MenuItems from "@/components/navbar/MenuItems";
import useVisibleSection from "@/hooks/useVisibleSection";
import useScrolled from "@/hooks/useScrolled";

const NavBar = () => {
  const mobileMenuRef = useRef(null);
  const navRef = useRef();

  const visibleSection = useVisibleSection();
  const isScrolled = useScrolled();

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
    <div
      className={`fixed w-screen h-[5rem] z-[1000] top-0 ${
        isScrolled ? "bg-[var(--dialogColor50)]" : "bg-[var(--dialogColor)]"
      } ${isScrolled ? "backdrop-blur-sm" : "backdrop-blur-0"} ${
        isScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.1)]" : "shadow-none"
      }`}
      ref={navRef}
    >
      <div className="h-full flex mx-auto px-4 py-6 constrained-width">
        <div className="w-full flex justify-between items-center">
          <Link
            href="/"
            className="w-fit h-fit flex flex-row items-center justify-center"
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
          </Link>

          <div className="flex justify-end lg:relative">
            <button
              type="button"
              name="menu-btn"
              aria-label="menu button"
              className="outline-none menu-button"
              onClick={(_) => toggleMenu()}
            >
              {mobileMenuVisible ? (
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-2xl xs:text-xl hover:scale-110 transition duration-300 ease-in-out"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faBars}
                  className="text-2xl xs:text-xl hover:scale-110 transition duration-300 ease-in-out"
                />
              )}
            </button>

            {/*  Menu Items */}

            <div
              className="flex-col justify-center lg:justify-start items-center m-0 p-4 text-center bg-[var(--dialogColor)] w-screen lg:max-w-xs h-screen lg:max-h-[50vh] absolute top-full lg:top-[calc(100%+1rem)] right-0 transition duration-300 ease-in-out drop_out hidden opacity-0 z-0 invisible overflow-hidden lg:border-[1px] lg:rounded-[var(--borderRadius)]"
              ref={mobileMenuRef}
            >
              <div className="w-full flex flex-col list-none justify-center lg:justify-start items-center gap-4">
                {navMenus.map((menu, index) => {
                  const depthLevel = 0;
                  return (
                    <MenuItems
                      items={menu}
                      key={`mobile-menu-item-${index}`}
                      depthLevel={depthLevel}
                      mobileNav={mobileMenuVisible}
                      handleCloseMobileMenu={hideMobileMenu}
                      current={visibleSection}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
