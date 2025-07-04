import styles from './DateLabel.module.scss';

const DateLabel = ({ dateString }: { dateString: string }) => (
  <div className={styles.dateLabel}>
    {new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
  </div>
);

export default DateLabel;
