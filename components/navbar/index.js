import Link from "next/link";
import { HiX } from 'react-icons/hi';
import { RiMenu3Fill } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import usePath from "../../hooks/usePath";

const menuItems = ['home', 'about', 'projects', 'experiences', 'contact'];

const Navbar = () => {

  const [toggle, setToggle] = useState(false);
  const [scolled, setScolled] = useState(false);

  const path = usePath();

  useEffect(() => {

    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) { setScolled(true) } else { setScolled(false) }
    });

    return () => {
      window.removeEventListener("scroll", () => { });
    }
  }, []);

  return (
    <nav className={scolled ? 'app__navbar scrolled' : 'app__navbar'}>

      <a href='#home' className='app__navbar-logo'>
        <p>Nikhil</p>
      </a>

      <ul className='app__navbar-links'>

        {
          menuItems.map((item) => (
            <li key={`link-${item}`}
              className={path == `#${item}` ? 'app__flex p-text active' : 'app__flex p-text'} >
              <div />
              <Link href={`#${item}`}>{item}</Link>
            </li>
          ))
        }

      </ul>

      <div className='app__navbar-menu'>

        <RiMenu3Fill onClick={() => setToggle(true)} />

        <div className={toggle ? 'app__navbar-mobile app__navbar-mobile-active' : 'app__navbar-mobile'}>
          <div onClick={() => setToggle(false)}><HiX /></div>
          <ul>
            {
              menuItems.map((item) => (
                <li key={item}
                  className={path == `#${item}` ? 'active' : ''}
                  onClick={() => setToggle(false)}
                >
                  <Link href={`#${item}`}
                  >
                    {item}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

      </div>

    </nav>
  )
}

export default Navbar;
