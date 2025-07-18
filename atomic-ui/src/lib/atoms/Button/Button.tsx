import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Button.module.scss';

const Button = ({
  children,
  showIcon = false,
  icon = '',
  withBg = false,
  url,
}: {
  children: React.ReactNode;
  showIcon?: boolean;
  icon?: any;
  withBg?: boolean;
  url: string;
}) => (
  <Link
    className={`${styles.button} ${withBg ? styles.buttonBg : ''}`}
    href={url}
    aria-label="Button"
    role="button"
  >
    {showIcon && icon && (
      <FontAwesomeIcon icon={icon} className={styles.icon} />
    )}
    {children}
  </Link>
);

export default Button;
