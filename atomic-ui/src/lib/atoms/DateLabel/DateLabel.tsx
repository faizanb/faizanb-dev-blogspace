import styles from './DateLabel.module.scss';

const DateLabel = ({
  labelPrefix = '',
  dateString,
  minutesToReadLabel,
}: {
  labelPrefix?: string;
  dateString: string;
  minutesToReadLabel?: string;
}) => (
  <div className={styles.dateLabel}>
    {labelPrefix && <span>{`${labelPrefix} `}</span>}
    {new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
    {minutesToReadLabel && ` • ${minutesToReadLabel}`}
  </div>
);

export default DateLabel;
