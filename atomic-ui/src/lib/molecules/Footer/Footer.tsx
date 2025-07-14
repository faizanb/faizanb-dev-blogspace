import {
  faLinkedin,
  faGithub,
  faDev,
  faSquareTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const socialIconMap: Record<string, any> = {
  LinkedIn: faLinkedin,
  GitHub: faGithub,
  'Dev.to': faDev,
  Twitter: faSquareTwitter,
  Instagram: faInstagram,
};

import './Footer.module.scss';
const Footer = ({
  footerArray,
}: {
  footerArray: Array<{ link: string; platform: string }>;
}) => {
  const copyrightTxt = '© # Faiza N B. All rights reserved.';
  return (
    <>
      <div className="social-links">
        {footerArray.map((content, index) => (
          <a
            key={index}
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${content.platform} Profile`}
          >
            <FontAwesomeIcon icon={socialIconMap[content.platform]} />
          </a>
        ))}
      </div>
      <p className="copyright">
        {copyrightTxt.replace('#', new Date().getFullYear().toString())}
      </p>
    </>
  );
};

export default Footer;
