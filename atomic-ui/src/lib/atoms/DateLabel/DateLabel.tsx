import styles from './DateLabel.module.scss';

const DateLabel = ({
  labelPrefix = '',
  dateString,
}: {
  labelPrefix?: string;
  dateString: string;
}) => (
  <div className={styles.dateLabel}>
    {labelPrefix && <span>{`${labelPrefix} `}</span>}
    {new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
  </div>
);

export default DateLabel;
