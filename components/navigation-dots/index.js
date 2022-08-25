import { useRouter } from "next/router";
import Link from "next/link";
const menuItems = ["home", "about", "projects", "experiences", "contact"];

const NavigationDots = () => {

  const router = useRouter();

  return (
    <div className="app__navigation">
      {menuItems.map((item, index) => (
        <div key={item + index} className={router.asPath === `/#${item}` ? "app__navigation-dot active" : "app__navigation-dot"}>
          <Link href={`#${item}`}>{item}</Link>
        </div>
      ))}
    </div>
  );
};

export default NavigationDots;
