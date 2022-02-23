import { useState } from 'react';
import images from '../../assets';
import { AppWrap, MotionWrap } from '../../wrapper';

const Footer = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChageInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {
    setLoading(true);


  }

  return (
    <>
      <h2 className="head-text">Take a Coffee & Chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img
            src={images.email.src}
            alt='email'
          />
          <a href='mailto:nkr.nikhil.nkr@gmail.com'
            className='p-text'>
            nkr.nikhil.nkr@gmail.com
          </a>
        </div>

        <div className="app__footer-card">
          <img
            src={images.mobile.src}
            alt='email'
          />
          <a href='tel:+91 8302364750'
            className='p-text'>
            +91 8302364750
          </a>
        </div>
      </div>

      {
        !isFormSubmitted ?
          (
            <div className="app__footer-form app__flex">
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
            </div>
          )
          :
          (
            <div>
              <h3 className="head-text">Thank you for getting in touch.</h3>
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
