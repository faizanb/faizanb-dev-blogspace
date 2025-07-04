import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Button.module.scss';

const Button = ({
  children,
  showIcon = false,
  icon = '',
  withBg = false,
  onClick,
}: {
  children: React.ReactNode;
  showIcon?: boolean;
  icon?: any;
  withBg?: boolean;
  onClick?: () => void;
}) => (
  <button
    className={`${styles.button} ${withBg ? styles.buttonBg : ''}`}
    onClick={onClick}
  >
    {showIcon && icon && (
      <FontAwesomeIcon icon={icon} className={styles.icon} />
    )}
    {children}
  </button>
);

export default Button;
