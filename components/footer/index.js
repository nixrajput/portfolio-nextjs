import { AppWrap, MotionWrap } from "../wrapper";
import { BsTwitter, BsInstagram, BsLinkedin, BsFacebook, BsEnvelopeFill } from "react-icons/bs";

const Footer = () => {

  return (
    <>
      <h2 className="head-text">Let's work together</h2>

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

      {/* <motion.div
        whileInView={{ x: [300, 0] }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h2 className="head-text">Get in touch</h2>
      </motion.div>

      <motion.div
        whileInView={{ x: [-300, 0] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="app__footer-cards"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="app__footer-card"
        >
          <img src={images.email.src} alt="email" />
          <a href="mailto:nkr.nikhil.nkr@gmail.com" className="p-text">
            nkr.nikhil.nkr@gmail.com
          </a>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="app__footer-card"
        >
          <img src={images.mobile.src} alt="email" />
          <a href="tel:+91 8302364750" className="p-text">
            +91 8302364750
          </a>
        </motion.div>
      </motion.div>

      {!isFormSubmitted ? (
        <motion.div
          whileInView={{ y: [300, 0] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="app__footer-form app__flex"
        >
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChageInput}
            />
          </div>

          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChageInput}
            />
          </div>

          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              name="message"
              value={message}
              onChange={handleChageInput}
            />
          </div>

          <button type="button" className="p-text" onClick={handleSubmit}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.div>
      ) : (
        <div>
          <h3
            className="head-text"
            style={{
              color: "green",
            }}
          >
            Thank you for getting in touch.
          </h3>
        </div>
      )} */}
    </>
  );
};

export default AppWrap(MotionWrap(Footer, "app__footer"), "contact");
