import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import images from '../../assets';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import axios from "axios";
import LoadingWidget from "../LoadingWidget/LoadingWidget";

const workItems = [
  {
    title: "get_time_ago",
    description: "A Flutter package to convert and format DateTime object into get_time_ago format to get String like 10 seconds ago, a minute ago, 7 hours ago, etc.",
    projectLink: "https://pub.dev/packages/get_time_ago",
    codeLink: "https://github.com/nixrajput/get-time-ago",
    imgUrl: images.about02,
    tags: ["Flutter", "package", "plugin"]
  },
  {
    title: "flutter_carousel_widget",
    description: "A customizable carousel slider widget in Flutter which supports infinite scrolling, auto scrolling, custom child widget, custom animations and pre-built indicators.",
    projectLink: "https://pub.dev/packages/flutter_carousel_widget",
    codeLink: "https://github.com/nixrajput/flutter_carousel_widget",
    imgUrl: images.about02,
    tags: ["Flutter", "package", "plugin"]
  },
  {
    title: "Ecommerce Web App",
    description: "An Ecommerce web app developed using MERN Stack.",
    projectLink: "https://nixlab-shop.herokuapp.com",
    codeLink: "https://github.com/nixrajput/ecommerce-mern",
    imgUrl: images.about01,
    tags: ["MERN", "ReactJS", "NodeJS", "Express", "MongoDB", "Web App"]
  },
  {
    title: "Grocery List Maker",
    description: "A Flutter application to easily make your grocery lists and generate PDF file.",
    projectLink: "https://github.com/nixrajput/grocery-list-maker-flutter/releases/tag/v1.0.1",
    codeLink: "https://github.com/nixrajput/grocery-list-maker-flutter",
    imgUrl: images.about02,
    tags: ["Flutter", "Mobile App", "application"]
  },
]

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
          My Creative <span>Portfolio</span> Section
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
        whileInView={{ x: [300, 0] }}
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