import { motion } from 'framer-motion';
import images from '../../assets';

import { AppWrap, MotionWrap } from '../../wrapper';

const aboutItems = [
  {
    title: "Web Development",
    description: "I am a well trained and experienced web developer specialized in ReactJS and NextJS.",
    imgUrl: images.about01
  },
  {
    title: "Mobile App Development",
    description: "I am a pioneer native mobile application developer specialized in Flutter.",
    imgUrl: images.about02
  },
  {
    title: "Backend Development",
    description: "I am an experienced backend developer specialized in NodeJS, ExpressJS & Django.",
    imgUrl: images.about03
  },
  {
    title: "Blockchain Development",
    description: "I have a great curiosity to know about blockchain technlology and I am learning and implementing blockchain development currently.",
    imgUrl: images.about04
  },
]

const About = () => {
  return (
    <>

      <h2 className="head-text"
        style={{
          textTransform: "none"
        }}>
        I am a <span>Software Engineer</span> specialized
        in both <span>front-end</span> and <span>back-end</span> development
        across multiple platforms.
      </h2>

      <div className="app__profiles">
        {
          aboutItems.map((about, index) => (
            <motion.div key={about.title + index}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, type: "tween" }}
              className='app__profile-item'
            >

              <img
                src={about.imgUrl.src}
                alt={about.title}
              />

              <h2 className="bold-text"
                style={{
                  marginTop: 20,
                  textAlign: "center"
                }}>
                {about.title}
              </h2>

              <p className="p-text"
                style={{
                  marginTop: 10,
                  textAlign: "center"
                }}>
                {about.description}
              </p>

            </motion.div>
          ))
        }
      </div>

    </>
  )
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg'
);
