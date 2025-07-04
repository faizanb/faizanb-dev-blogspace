import styles from './Paragraph.module.scss';

const Paragraph = ({
  content,
  type,
}: {
  content: string;
  type: 'html' | 'plainText';
}) => {
  if (type === 'html') {
    return (
      <p
        className={styles.paragraph}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
  return <p className={styles.paragraph}>{content}</p>;
};

export default Paragraph;
