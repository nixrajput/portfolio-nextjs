import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MdExpandMore } from "react-icons/md";
import Dropdown from "@/components/navbar/Dropdown";

const MenuItems = (props) => {
  const { items, depthLevel, mobileNav, handleCloseMobileMenu } = props;

  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
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
      className="menu-items"
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
            className={
              pathname === items.path ||
              (items.path !== "/" && pathname.includes(items.path))
                ? `selected`
                : ""
            }
            onClick={() => setDropdown((prev) => !prev)}
          >
            <p>{items.title}</p>
            <MdExpandMore />
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
          className={
            pathname === items.path ||
            (items.path !== "/" && pathname.includes(items.path))
              ? `selected`
              : ""
          }
          onClick={() => {
            handleCloseMobileMenu();
            router.push(items.path);
          }}
        >
          <p>{items.title}</p>
        </button>
      )}{" "}
    </li>
  );
};

export default MenuItems;
