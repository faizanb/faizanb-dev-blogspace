import { JSX } from 'react';
import styles from './Heading.module.scss';

type HeadingType = 'H2' | 'H3' | 'H4' | 'H5' | 'H6';
interface HeadingProps {
  text: string;
  type: HeadingType;
  anchor?: string;
}

const Heading = ({ text, type, anchor }: HeadingProps) => {
  const HeadingTag = type.toLowerCase() as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag id={anchor} className={styles.heading}>
      {text}
    </HeadingTag>
  );
};

export default Heading;
