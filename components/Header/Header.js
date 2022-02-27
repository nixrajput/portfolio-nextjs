import { motion } from 'framer-motion';
import images from '../../assets';

import { AppWrap, MotionWrap } from '../../wrapper';

const Header = () => {
  return (
    <div className='app__header app__flex'>

      <motion.div
        whileInView={{ x: [-300, 0], opacity: [0, 1] }}
        transition={{ duration: 1, ease: "circInOut" }}
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
        transition={{ duration: 2, delayChildren: 0.5 }}
        className='app__header-img'
      >

        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          src={images.profile.src}
          alt='profile'
        />

        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          src={images.circle.src}
          alt='profile_circle'
          className='overlay_circle'
        />
      </motion.div>

      <motion.div
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className='app__header-circles'
      >

        {
          [images.react, images.flutter, images.python, images.node, images.django]
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

export default AppWrap(
  MotionWrap(Header),
  'home'
)
