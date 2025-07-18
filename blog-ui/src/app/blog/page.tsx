import { PageTitle, DateLabel, FeaturedImage, Paragraph } from '@atomic-ui';
import Link from 'next/link';
import styles from './page.module.scss';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  featuredImage: any;
}

async function getAllPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/post/all`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) return [];
  const apiRes = await res.json();
  if (typeof apiRes === 'object' && apiRes !== null && !Array.isArray(apiRes)) {
    return Object.values(apiRes);
  }
  return Array.isArray(apiRes) ? apiRes : [];
}

export default async function BlogListPage() {
  const posts = await getAllPosts();

  return (
    <div className={styles.blogListContainer}>
      <PageTitle>All Blog Posts</PageTitle>
      <div className={styles.blogList}>
        {posts.length === 0 && <p>No posts found.</p>}
        {posts.map((post: BlogPost) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className={styles.blogCard}
          >
            {post.featuredImage?.formats?.thumbnail && (
              <FeaturedImage
                imgSrc={`${process.env.NX_STRAPI_BASE_URL}${post.featuredImage.formats.thumbnail.url}`}
              />
            )}
            <h2 className={styles.blogTitle}>{post.title}</h2>
            <DateLabel dateString={post.publishedDate} />
            <Paragraph content={post.excerpt} type="plainText" />
          </Link>
        ))}
      </div>
    </div>
  );
}
