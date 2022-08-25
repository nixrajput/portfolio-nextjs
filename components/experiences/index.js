import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AppWrap, MotionWrap } from "../wrapper";

const ExperienceList = [
  {
    title: "Full Stack Development Intern",
    company: "TECHOX LLP",
    duration: "May 2021 - July 2022",
    desc: "I worked as a Full Stack Developer Intern at TECHOX LLP, a startup company to build and delivers a number of mobile applications as well as APIs.",
    tags: ["Flutter", "Dart", "React.js", "Node.js", "Redux", "MongoDB", "Express.js", "JavaScript", "Python", "Django"],
  },
  {
    title: "Web Development Intern",
    company: "Career Corner Education Pvt. Ltd.",
    duration: "July 2021 - Nov 2021",
    desc: "I worked as a Web Development Intern at Career Corner Education Pvt. Ltd. to build and deploy static as well as dynamic websites.",
    tags: ["React.js", "Firebase", "Redux", "HTML", "CSS", "JavaScript", "Bootstrap"],
  }
];

const Experiences = () => {

  return (
    <>
      <h2>Experiences</h2>

      <div className="app__experiences">
        {
          ExperienceList.map((item, index) => (
            <div key={index} className="app__experiences__item">

              <h3 className="app__experiences__item__title">
                {item.title}
              </h3>

              <div className="app__experiences__item__company">
                {item.company}
              </div>

              <div className="app__experiences__item__duration">
                {item.duration}
              </div>

              <div className="app__experiences__item__description">
                {item.desc}
              </div>

              <div className="app__experiences__item__tags">
                {
                  item.tags.map((tag, index) => {
                    return (
                      <div key={index} className="app__experiences__item__tag">
                        <span><BsFillCheckCircleFill /></span>
                        <p className="p-text">{tag}</p>
                      </div>
                    )
                  })
                }
              </div>

            </div>
          ))
        }
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Experiences, "app__skills"), "experiences");
