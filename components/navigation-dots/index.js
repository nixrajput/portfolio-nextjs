import Link from "next/link";
import usePath from "../../hooks/usePath";

const menuItems = ["home", "about", "projects", "experiences", "contact"];

const NavigationDots = () => {

  const path = usePath();

  return (
    <div className="app__navigation">
      {menuItems.map((item, index) => (
        <div key={item + index}
          className={path === `#${item}` ? "app__navigation-dot active" : "app__navigation-dot"}>
          <Link href={`#${item}`}>{item}</Link>
        </div>
      ))}
    </div>
  );
};

export default NavigationDots;
