import styles from './FeaturedImage.module.scss';

const FeaturedImage = ({ imgSrc }: { imgSrc: string }) => (
  <img src={imgSrc} className={styles.featuredImage} alt="Featured Image" />
);

export default FeaturedImage;
