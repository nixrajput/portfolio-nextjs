import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTelegram,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://www.github.com/nixrajput",
    icon: <FontAwesomeIcon icon={faGithub} />,
    text: "nixrajput",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/nixrajput",
    icon: <FontAwesomeIcon icon={faLinkedin} />,
    text: "nixrajput",
  },
  {
    name: "Telegram",
    url: "https://telegram.me/nixrajput",
    icon: <FontAwesomeIcon icon={faTelegram} />,
    text: "nixrajput",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/nixrajput",
    icon: <FontAwesomeIcon icon={faInstagram} />,
    text: "nixrajput",
  },
  {
    name: "Twitter",
    url: "https://www.twitter.com/nixrajput07",
    icon: <FontAwesomeIcon icon={faXTwitter} />,
    text: "nixrajput07",
  },
];

export default socialLinks;
