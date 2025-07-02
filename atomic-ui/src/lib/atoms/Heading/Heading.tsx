import { JSX } from 'react';
import styles from './Heading.module.scss';

type HeadingType = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';
interface HeadingProps {
  text: string;
  type: HeadingType;
}

const Heading = ({ text, type }: HeadingProps) => {
  const HeadingTag = type.toLowerCase() as keyof JSX.IntrinsicElements;

  return <HeadingTag className={styles.heading}>{text}</HeadingTag>;
};

export default Heading;
