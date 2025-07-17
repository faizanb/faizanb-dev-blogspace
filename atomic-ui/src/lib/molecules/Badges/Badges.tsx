import styles from './Badges.module.scss';

type BadgeItem = {
  id: number;
  name: string;
};

const Badges = ({ badges }: { badges: BadgeItem[] }) => (
  <div className={styles.badges}>
    {badges.map((badge) => (
      <div key={badge.id} className={styles.badgeItem} aria-hidden="true">
        {badge.name}
      </div>
    ))}
  </div>
);

export default Badges;
