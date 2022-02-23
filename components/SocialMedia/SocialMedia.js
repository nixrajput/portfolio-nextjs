import { BsTwitter, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

const SocialMedia = () => {
    return (
        <div className='app__social'>

            <a href='https://linkedin.com/in/nixrajput'
                target='_blank'
            >
                <BsLinkedin />
            </a>

            <a href='https://instagram.com/nixrajput'
                target='_blank'
            >
                <BsInstagram />
            </a>

            <a href='https://twitter.com/nixrajput07'
                target='_blank'
            >
                <BsTwitter />
            </a>

            <a href='https://facebook.com/nixrajput07'
                target='_blank'
            >
                <FaFacebookF />
            </a>

        </div>
    )
}

export default SocialMedia;
