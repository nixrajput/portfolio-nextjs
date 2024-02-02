import PropTypes from "prop-types";
import MenuItems from "@/components/navbar/MenuItems";
import { navMenuItem } from "@/types";

const Dropdown = (props: {
  submenus: navMenuItem[],
  dropdown: boolean,
  depthLevel: number,
  mobileNav: boolean,
  handleCloseMobileMenu: () => void
}) => {
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

Dropdown.propTypes = {
  submenus: PropTypes.array.isRequired,
  dropdown: PropTypes.bool,
  depthLevel: PropTypes.number,
  mobileNav: PropTypes.bool.isRequired,
  handleCloseMobileMenu: PropTypes.func.isRequired,
};

export default Dropdown;
