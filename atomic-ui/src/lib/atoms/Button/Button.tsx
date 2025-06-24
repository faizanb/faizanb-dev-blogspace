import React from 'react';
import styles from './Button.module.scss';

export const Button = ({
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
