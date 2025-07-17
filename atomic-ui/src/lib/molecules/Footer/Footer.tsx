import {
  faLinkedin,
  faGithub,
  faDev,
  faSquareTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss';

const socialIconMap: Record<string, any> = {
  LinkedIn: faLinkedin,
  GitHub: faGithub,
  'Dev.to': faDev,
  Twitter: faSquareTwitter,
  Instagram: faInstagram,
};

const Footer = ({
  footerArray,
}: {
  footerArray: Array<{ link: string; platform: string }>;
}) => {
  const copyrightTxt = '© # Faiza N B. All rights reserved.';
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinksSection}>
        {footerArray.map((content, index) => (
          <a
            key={index}
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={`${content.platform} Profile`}
          >
            <FontAwesomeIcon icon={socialIconMap[content.platform]} />
          </a>
        ))}
      </div>
      <p className={styles.copyRight}>
        {copyrightTxt.replace('#', new Date().getFullYear().toString())}
      </p>
    </footer>
  );
};

export default Footer;
