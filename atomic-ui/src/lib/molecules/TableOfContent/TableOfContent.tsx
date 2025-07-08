import styles from './TableOfContent.module.scss';

type TocItem = {
  id: number;
  text: string;
  level: string;
  anchor: string;
};

const TableOfContent = ({ toc }: { toc: TocItem[] }) => (
  <nav className={styles.tocNav} aria-label="Table of Contents">
    <h3 className={styles.title}>Table of Contents</h3>
    <ul className={styles.tocList}>
      {toc.map((item) => (
        <li
          key={item.id}
          className={styles[`level${item.level}`] || styles.tocItem}
        >
          <a href={`#${item.anchor}`} className={styles.tocLink}>
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default TableOfContent;
