import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AppWrap, MotionWrap } from "../wrapper";

const About = () => {
  return (
    <>
      <div className="flex__row">

        <div className="profile__img">
          <img src="/profile-pic.png" alt="profile" />
        </div>

        <div className="spacer" />

        <div className="details">
          <h1 className="head-text">I am Nikhil Rajput.</h1>
          <p className="p-text"><span>•</span> Grad with Bachelor of Technology in Computer Science and Engineering.</p>
          <p className="p-text"><span>•</span> I have worked on various projects as a Flutter Developer as well as a Web Developer. Apart from that, I have also worked as a Backend Developer.</p>
          <p className="p-text"><span>•</span> Strong knowledge and understanding of object-oriented programming, functional programming, RESTful APIs.</p>

          <p className='p-text-head'>My Preferred Tools and Technologies are 👇</p>

          <div className="preferred__skills">
            {
              ["Dart / C++ / JavaScript", "Flutter / React.js / Next.js", "GetX / Provider / Redux", "MongoDB / Firebase"].map((item, index) => {
                return (
                  <div key={index} className="profile__skill">
                    <span><BsFillCheckCircleFill /></span>
                    <p className="p-text">{item}</p>
                  </div>
                )
              })
            }
          </div>

          <a className="outlined-btn"
            href='https://github.com/nixrajput' target="_blank" rel="noreferrer"
          >
            My GitHub
          </a>

        </div>

      </div>
    </>
  );
};

export default AppWrap(MotionWrap(About, "app__about"), "about");
