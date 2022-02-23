import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import images from '../../assets';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';

const workItems = [
  {
    title: "Web App",
    description: "Sample Web App",
    projectLink: "https://github.com/nixrajput",
    codeLink: "https://github.com/nixrajput",
    imgUrl: images.about01,
    tags: ["Web App", "reactjs"]
  },
  {
    title: "Web App 2",
    description: "Sample Web App",
    projectLink: "https://github.com/nixrajput",
    codeLink: "https://github.com/nixrajput",
    imgUrl: images.about02,
    tags: ["Mobile App"]
  },
]

const Work = () => {

  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWorks, setFilterWorks] = useState([]);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterWorks(works);
      }
      else {
        setFilterWorks(works.filter((work) => work.tags.includes(item)))
      }
    }, 500);
  }

  useEffect(() => {
    setWorks(workItems);
    setFilterWorks(workItems);
    return () => { }
  }, [])

  return (
    <>

      <motion.div
        whileInView={{ x: [-300, 0] }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h2 className="head-text">
          My Creative <span>Portfolio</span> Section
        </h2>
      </motion.div>


      <motion.div
        whileInView={{ x: [300, 0] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="app__work-filter"
      >
        {
          ["All", "Web Apps", "Mobile Apps", "APIs"].map((item, index) => (
            <div key={index}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${activeFilter === item ? "item-active" : ""}`}
            >
              {item}
            </div>
          ))
        }
      </motion.div>

      <motion.div
        animate={animateCard}
        whileInView={{ x: [300, 0] }}
        transition={{ duration: 1, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {
          filterWorks.map((work, index) => (
            <div key={index}
              className="app__work-item app__flex"
            >
              <div className="app__work-img app__flex">
                <img
                  src={work.imgUrl.src}
                  alt={work.title}
                />

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: "easeInOut", staggerChildren: 0.5 }}
                  className="app__work-hover app__flex"
                >

                  <a href={work.projectLink}
                    target='_blank'
                    rel="noreferrer"
                  >
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>

                  <a href={work.codeLink}
                    target='_blank'
                    rel="noreferrer"
                  >
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                </motion.div>
              </div>

              <div className="app__work-content app__flex">

                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

                <div className="app__work-tag app__flex">
                  <p className="p-text">{work.tags[0]}</p>
                </div>

              </div>

            </div>
          ))
        }
      </motion.div>
    </>
  )
}


export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg'
);
