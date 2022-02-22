import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

const SocialMedia = () => {
    return (
        <div className='app__social'>
            <div>
                <BsInstagram />
            </div>
            <div>
                <BsTwitter />
            </div>
            <div>
                <FaFacebookF />
            </div>
        </div>
    )
}

export default SocialMedia;
