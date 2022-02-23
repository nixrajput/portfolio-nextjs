import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import images from '../../assets';
import ReactTooltip from "react-tooltip";

const skillItems = [
  {
    title: "ReactJS",
    icon: images.react,
    bgColor: "#edf2f8"
  },
  {
    title: "Flutter",
    icon: images.flutter,
    bgColor: "#edf2f8"
  },
  {
    title: "NodeJS",
    icon: images.node,
    bgColor: "#edf2f8"
  },
  {
    title: "JavaScript",
    icon: images.javascript,
    bgColor: "#edf2f8"
  },
  {
    title: "GraphQL",
    icon: images.graphql,
    bgColor: "#edf2f8"
  },
]

// const experienceItems = [
//   {
//     title: "Full Stack Developer",
//     comapany: "TECHOX LLP",
//     desc: "I worked as a full stack mobile app development intern."
//   },
//   {
//     title: "Web App Developer",
//     comapany: "Career Corner Solution Pvt Ltd",
//     desc: "I worked as a web development intern."
//   },
// ]

const experienceItems = [
  {
    year: "2021",
    works: [
      {
        title: "Full Stack Developer",
        company: "TECHOX LLP",
        desc: "I worked as a full stack mobile app development intern."
      }
    ]
  },
  {
    year: "2020",
    works: [
      {
        title: "Web App Developer",
        company: "Career Corner Solution Pvt Ltd",
        desc: "I worked as a web development intern."
      }
    ]
  },
]

const Skills = () => {

  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {

    setSkills(skillItems);
    setExperiences(experienceItems);

    return () => { }
  }, [])

  return (
    <>
      <h2 className="head-text">
        Skills & Experiences
      </h2>

      <div className="app__skills-container">

        <motion.div
          className="app__skills-list"
        >
          {
            skills.map((skill) => (
              <motion.div key={skill.title}
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
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
          className="app__skills-exp"
        >
          {
            experiences.map((experience) => (
              <motion.div key={experience.year}
                className="app__skills-exp-item"
              >

                <div className="app__skills-exp-year">
                  <p className="bold-text">{experience.year}</p>
                </div>

                <motion.div
                  className="app__skills-exp-works"
                >
                  {
                    experience.works.map((work) => (
                      <>
                        <motion.div key={work.title}
                          whileInView={{ opacity: [0, 1] }}
                          transition={{ duration: 0.5 }}
                          className="app__skills-exp-work"
                          data-tip
                          data-for={work.title}
                        >

                          <h4 className="bold-text">{work.title}</h4>
                          <p className="p-text">{work.company}</p>
                        </motion.div>
                        <ReactTooltip
                          id={work.title}
                          effect="solid"
                          arrowColor="#fff"
                          className="skills-tooltip"
                        >
                          {work.desc}
                        </ReactTooltip>
                      </>
                    ))
                  }
                </motion.div>
              </motion.div>
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
