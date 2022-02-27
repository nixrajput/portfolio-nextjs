import { useState } from 'react';
import images from '../../assets';
import { AppWrap, MotionWrap } from '../../wrapper';
import { motion } from 'framer-motion';
import axios from 'axios';

const Footer = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChageInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async () => {
    setLoading(true);
    const url = `https://portfolioapi.nixlab.co.in/api/v1/contact/create`;
    await axios.post(url, {
      name,
      email,
      message
    });
    setLoading(false);
    setIsFormSubmitted(true);
  }

  return (
    <>
      <motion.div
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
          <img
            src={images.email.src}
            alt='email'
          />
          <a href='mailto:nkr.nikhil.nkr@gmail.com'
            className='p-text'>
            nkr.nikhil.nkr@gmail.com
          </a>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="app__footer-card"
        >
          <img
            src={images.mobile.src}
            alt='email'
          />
          <a href='tel:+91 8302364750'
            className='p-text'>
            +91 8302364750
          </a>
        </motion.div>
      </motion.div>

      {
        !isFormSubmitted ?
          (
            <motion.div
              whileInView={{ y: [300, 0] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="app__footer-form app__flex">
              <div className="app__flex">
                <input className='p-text'
                  type='text'
                  placeholder='Your Name'
                  name='name'
                  value={name}
                  onChange={handleChageInput}
                />
              </div>

              <div className="app__flex">
                <input className='p-text'
                  type='email'
                  placeholder='Your Email'
                  name='email'
                  value={email}
                  onChange={handleChageInput}
                />
              </div>

              <div>
                <textarea className='p-text'
                  placeholder='Your Message'
                  name='message'
                  value={message}
                  onChange={handleChageInput}
                />
              </div>

              <button type='button'
                className='p-text'
                onClick={handleSubmit}
              >{
                  loading ? "Sending..." : "Send Message"
                }</button>
            </motion.div>
          )
          :
          (
            <div>
              <h3 className="head-text"
                style={{
                  color: "green"
                }}
              >Thank you for getting in touch.</h3>
            </div>
          )
      }

    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg'
)
