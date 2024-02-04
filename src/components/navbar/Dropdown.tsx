import MenuItems from "@/components/navbar/MenuItems";
import { DropdownMenuProps } from "@/types";

const Dropdown = (props: DropdownMenuProps) => {
  let {
    submenus,
    dropdown,
    depthLevel,
    mobileNav,
    handleCloseMobileMenu,
    ...others
  } = props;

  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? " dropdown-submenu" : "";
  return (
    <ul
      className={`dropdown${dropdownClass}${dropdown ? " show" : ""}`}
      {...others}
    >
      {submenus.map((submenu, index) => (
        <MenuItems
          items={submenu}
          key={index}
          depthLevel={depthLevel}
          mobileNav={mobileNav}
          handleCloseMobileMenu={handleCloseMobileMenu}
        />
      ))}
    </ul>
  );
};

export default Dropdown;
