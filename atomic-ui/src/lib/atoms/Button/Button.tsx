import styles from './Button.module.scss';

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);

export default Button;
