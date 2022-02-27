import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import axios from "axios";
import LoadingWidget from "../LoadingWidget/LoadingWidget";


const Work = () => {

  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWorks, setFilterWorks] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchWorksFromServer = async () => {
    setLoading(true);
    const url = `https://portfolioapi.nixlab.co.in/api/v1/works`;
    const { data } = await axios.get(url);
    setWorks(data.results);
    setFilterWorks(data.results);
    setLoading(false);
  }

  useEffect(() => {
    fetchWorksFromServer();
    return () => { }
  }, [])

  return (
    <>

      <motion.div
        whileInView={{ x: [-300, 0] }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h2 className="head-text">
          My <span>Works</span> and <span>Projects</span>
        </h2>
      </motion.div>


      <motion.div
        whileInView={{ x: [300, 0] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="app__work-filter"
      >
        {
          ["All", "Flutter", "ReactJS", "NodeJS", "Python", "NextJS", "Express", "MERN", "Django"].map((item, index) => (
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
        transition={{ duration: 1, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {
          loading ?
            (
              <LoadingWidget thickness={3} />
            ) :
            filterWorks.map((work, index) => (
              <motion.div key={index}
                whileInView={{ x: [-300, 0] }}
                transition={{ duration: 1, delayChildren: 0.5 }}
                className="app__work-item app__flex"
              >
                <div className="app__work-img app__flex">
                  <img
                    src={work.image.url}
                    alt={work.title}
                  />

                  <motion.div
                    whileHover={{ opacity: [0, 1] }}
                    transition={{ duration: 0.3, ease: "easeInOut", staggerChildren: 0.5 }}
                    className="app__work-hover app__flex"
                  >

                    <a href={work.projectLink}
                      target='_blank'
                      rel="noreferrer"
                    >
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        whileTap={{ scale: [1, 0.9] }}
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
                        whileTap={{ scale: [1, 0.9] }}
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

                  <p className="p-text" style={{ marginTop: 10 }}>{work.desc}</p>

                  <div className="app__work-tags app__flex">
                    {
                      work.tags.map((tag) => (
                        <p key={tag} className="p-text">{`#${tag}`}</p>
                      ))
                    }
                  </div>

                  <div className="app__work-tag app__flex">
                    <p className="p-text">{work.tags[0]}</p>
                  </div>

                </div>

              </motion.div>
            ))
        }
      </motion.div>
    </>
  )
}


export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'works',
  'app__primarybg'
);