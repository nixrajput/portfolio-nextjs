import { AppWrap, MotionWrap } from "../wrapper";
import { BsTwitter, BsInstagram, BsLinkedin, BsFacebook, BsEnvelopeFill } from "react-icons/bs";

const Footer = () => {

  return (
    <>
      <h2 className="head-text">Let&lsquo;s work together</h2>

      <div className="contact__info">

        <div className="email">
          <BsEnvelopeFill />
          <a
            href="mailto:nkr.nikhil.nkr@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            nkr.nikhil.nkr@gmail.com
          </a>
        </div>

      </div>

      <div className="app__social__links">
        <a
          href="https://linkedin.com/in/nixrajput"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin />
        </a>

        <a
          href="https://instagram.com/nixrajput"
          target="_blank"
          rel="noreferrer"
        >
          <BsInstagram />
        </a>

        <a
          href="https://twitter.com/nixrajput07"
          target="_blank"
          rel="noreferrer"
        >
          <BsTwitter />
        </a>

        <a
          href="https://facebook.com/nixrajput07"
          target="_blank"
          rel="noreferrer"
        >
          <BsFacebook />
        </a>
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Footer, "app__footer"), "contact");
