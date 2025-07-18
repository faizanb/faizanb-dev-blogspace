import { PageTitle, PostBlurb, Footer } from '@atomic-ui';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

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
          <PostBlurb
            {...post}
            imageUrl={post.featuredImage?.formats?.small?.url}
            key={post.id}
          />
        ))}
      </div>
      <Footer footerArray={posts[0].socialLinks} />
    </div>
  );
}
