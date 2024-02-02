"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Dropdown from "@/components/navbar/Dropdown";
import { MenutItemProps } from "@/types";

const MenuItems = (props: MenutItemProps) => {
  const { items, depthLevel, mobileNav, handleCloseMobileMenu, current } =
    props;

  const [dropdown, setDropdown] = useState(false);

  let ref = useRef<HTMLLIElement>(null);

  const handleScroll = (id: string) => {
    if (!id) return;
    const element = document.getElementById(id);
    if (!element) return;
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition;

    window.scroll({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (dropdown && ref.current && !ref.current.contains((event.target as Node))) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 900 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 900 && setDropdown(false);
  };

  return (
    <li
      className="menu-items w-full"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            className={current === items.id ? `selected` : ""}
            onClick={() => setDropdown((prev) => !prev)}
          >
            <p>{items.title}</p>

            <FontAwesomeIcon icon={faCaretDown} />
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
            mobileNav={mobileNav}
            handleCloseMobileMenu={handleCloseMobileMenu}
          />
        </>
      ) : (
        <button
          type="button"
          className={current === items.id ? `selected` : ""}
          onClick={() => {
            handleCloseMobileMenu();
            handleScroll(items.id);
          }}
        >
          <p>{items.title}</p>
        </button>
      )}{" "}
    </li>
  );
};

MenuItems.propTypes = {
  items: PropTypes.any.isRequired,
  current: PropTypes.string,
  depthLevel: PropTypes.number,
  mobileNav: PropTypes.bool.isRequired,
  handleCloseMobileMenu: PropTypes.func.isRequired,
};

export default MenuItems;
