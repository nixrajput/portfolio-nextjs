import { motion } from 'framer-motion';
import Image from 'next/image';
import images from '../../assets';

import AppWrap from '../../wrapper/AppWrap';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
}

const Header = () => {
  return (
    <div id='home' className='app__header app__flex'>

      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 2 }}
        className='app__header-info'
      >

        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hi there, I am</p>
              <h1 className="head-text">Nikhil Rajput</h1>
            </div>
          </div>

          <div className="tag-cmp app__flex">
            <p className="p-text">Full Stack Developer</p>
            <p className="p-text">Freelancer</p>
          </div>
        </div>

      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 2.5, delayChildren: 0.5 }}
        className='app__header-img'
      >
        <Image
          src={images.profile}
          alt='profile'
          objectFit='cover'
          priority
        />

        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle.src}
          alt='profile_circle'
          className='overlay_circle'
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={{ opacity: scaleVariants.whileInView }}
        className='app__header-circles'
      >

        {
          [images.flutter, images.redux, images.python]
            .map((circle, index) => (
              <div key={`circle-${index}`}
                className='circle-cmp app__flex'
              >
                <img
                  src={circle.src}
                  alt='icon'
                />
              </div>
            ))
        }

      </motion.div>

    </div>
  )
}

export default AppWrap(Header, 'home')
