import NavigationDots from "../navigation-dots";
import { default as Navbar } from "../navbar";

const AppWrap = (Component, idName, classNames) => {
  const HOC = () => {
    return (
      <div id={idName} className={`app__container ${classNames}`}>

        <Navbar />

        <div className="app__wrapper app__flex">
          <Component />
        </div>

        <NavigationDots />
      </div>
    );
  };
  return HOC;
}

export default AppWrap;
