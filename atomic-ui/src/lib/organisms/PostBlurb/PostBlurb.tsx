import { DateLabel, FeaturedImage, Paragraph } from '../../../index';
import Link from 'next/link';
import styles from './PostBlurb.module.scss';

interface PostBlurbProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  imageUrl: string;
}

export default function PostBlurb(post: PostBlurbProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      key={post.id}
      className={styles.postBlurbCard}
    >
      {post.imageUrl && (
        <FeaturedImage
          imgSrc={`${process.env.NX_STRAPI_BASE_URL}${post.imageUrl}`}
        />
      )}
      <div className={styles.postBlurbContent}>
        <h2 className={styles.postBlurbTitle}>{post.title}</h2>
        <DateLabel dateString={post.publishedDate} />
        <Paragraph content={post.excerpt} type="plainText" />
      </div>
    </Link>
  );
}
