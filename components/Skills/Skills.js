import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import images from '../../assets';
import ReactTooltip from "react-tooltip";
import LoadingWidget from "../LoadingWidget/LoadingWidget";
import { useEffect, useState } from "react";
import axios from "axios";

const skillItems = [
  {
    title: "Python",
    icon: images.python,
    bgColor: "#edf2f8"
  },
  {
    title: "Flutter",
    icon: images.flutter,
    bgColor: "#edf2f8"
  },
  {
    title: "JavaScript",
    icon: images.javascript,
    bgColor: "#edf2f8"
  },
  {
    title: "ReactJS",
    icon: images.react,
    bgColor: "#edf2f8"
  },
  {
    title: "NodeJS",
    icon: images.node,
    bgColor: "#edf2f8"
  },
  {
    title: "Express",
    icon: images.express,
    bgColor: "#edf2f8"
  },
  {
    title: "NextJS",
    icon: images.nextjs,
    bgColor: "#edf2f8"
  },
  {
    title: "Redux",
    icon: images.redux,
    bgColor: "#edf2f8"
  },
  {
    title: "Django",
    icon: images.django,
    bgColor: "#edf2f8"
  },
  {
    title: "MongoDB",
    icon: images.mongodb,
    bgColor: "#edf2f8"
  },
  {
    title: "PostgreSQL",
    icon: images.postgresql,
    bgColor: "#edf2f8"
  },
  {
    title: "MySQL",
    icon: images.mysql,
    bgColor: "#edf2f8"
  },
  {
    title: "C++",
    icon: images.cpp,
    bgColor: "#edf2f8"
  },
  {
    title: "HTML",
    icon: images.html,
    bgColor: "#edf2f8"
  },
  {
    title: "CSS",
    icon: images.css,
    bgColor: "#edf2f8"
  },
  {
    title: "Sass",
    icon: images.sass,
    bgColor: "#edf2f8"
  },
  {
    title: "Firebase",
    icon: images.firebase,
    bgColor: "#edf2f8"
  },
  {
    title: "AWS",
    icon: images.aws,
    bgColor: "#edf2f8"
  },
]

const Skills = () => {

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDataFromServer = async () => {
    setLoading(true);
    const url = `https://portfolioapi.nixlab.co.in/api/v1/experiences`;
    const { data } = await axios.get(url);
    setExperiences(data.results);
    setLoading(false);
  }

  useEffect(() => {
    fetchDataFromServer();
    return () => { }
  }, [])

  return (
    <>
      <motion.div
        whileInView={{ x: [300, 0] }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h2 className="head-text">
          Skills & Experiences
        </h2>
      </motion.div>


      <div className="app__skills-container">

        <motion.div
          whileInView={{ x: [-300, 0] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="app__skills-list"
        >
          {
            skillItems.map((skill, index) => (
              <motion.div key={skill.title + index}
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="app__skills-item app__flex"
              >

                <div className="app__flex"
                  style={{ backgroundColor: skill.bgColor }}>
                  <img
                    src={skill.icon.src}
                    alt={skill.title}
                  />
                </div>

                <p className="p-text">{skill.title}</p>

              </motion.div>
            ))
          }
        </motion.div>

        <motion.div
          whileInView={{ x: [300, 0] }}
          transition={{ duration: 1 }}
          className="app__skills-exp"
        >
          {
            loading ?
              (
                <LoadingWidget thickness={3} />
              )
              :
              experiences.map((experience, index) => (
                <div key={experience.year + index}
                  className="app__skills-exp-item"
                >
                  <div className="app__skills-exp-year">
                    <p className="bold-text">{experience.year}</p>
                  </div>

                  <div className="app__skills-exp-works">
                    {
                      experience.works.map((work, ind) => (
                        <div key={work.title + ind}>
                          <div className="app__skills-exp-work"
                            data-tip
                            data-for={work.title}
                          >
                            <h4 className="bold-text">{work.title}</h4>
                            <p className="p-text">{work.company}</p>
                          </div>

                          {
                            work.desc &&
                            <ReactTooltip
                              id={work.title}
                              effect="solid"
                              arrowColor="rgba(0, 0, 0, 0.8)"
                              className="skills-tooltip"
                              html={false}
                            >
                              {work.desc}
                            </ReactTooltip>
                          }

                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
          }
        </motion.div>
      </div>
    </>
  )
}


export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg'
);
