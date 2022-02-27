import images from '../../assets';

import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useState } from 'react';

const menuItems = ['home', 'about', 'works', 'skills', 'contact'];

const Navbar = () => {

  const [toggle, setToggle] = useState(false);

  return (
    <nav className='app__navbar'>

      <a href='#home' className='app__navbar-logo'>
        <img
          src={images.logo.src}
          alt='logo'
        />
      </a>

      <ul className='app__navbar-links'>

        {
          menuItems.map((item) => (
            <li key={`link-${item}`}
              className='app__flex p-text' >
              <div />
              <a href={`#${item}`} >{item}</a>
            </li>
          ))
        }

      </ul>

      <div className='app__navbar-menu'>

        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ y: [400, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut" }} >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {
                menuItems.map((item) => (
                  <li key={item} >
                    <a href={`#${item}`}
                      onClick={() => setToggle(false)} >
                      {item}
                    </a>
                  </li>
                ))
              }
            </ul>
          </motion.div>
        )}

      </div>

    </nav>
  )
}

export default Navbar
