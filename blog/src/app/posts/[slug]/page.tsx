import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Button, DateLabel } from '@atomic-ui';
import BlogPostContent from './BlogPostContent';

async function getBlogPost(slug: string): Promise<any> {
  const res = await fetch(`${process.env.BASE_URL}/api/posts/${slug}`, {
    next: { revalidate: 120 },
  });

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const apiRes = await getBlogPost(slug);
  if (!apiRes || !apiRes.data || !apiRes.data[0]) return {};

  const post = apiRes.data[0];
  const seo = post.seoMeta || {};

  return {
    title: seo.metaTitle || post.title,
    description: seo.metaDescription || post.excerpt,
    openGraph: {
      title: seo.ogTitle || seo.metaTitle || post.title,
      description: seo.ogDescription || seo.metaDescription || post.excerpt,
      images: seo.metaImage ? [seo.metaImage] : [],
    },
    twitter: {
      title: seo.twitterTitle || seo.metaTitle || post.title,
      description:
        seo.twitterDescription || seo.metaDescription || post.excerpt,
      card: 'summary_large_image',
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  const data = post?.data?.[0];
  if (!post) return notFound();

  return (
    <div>
      <section>
        <Button>View all posts</Button>
      </section>
      <article>
        <h1>{data.title}</h1>
        {data.publishedDate && <DateLabel dateString={data.publishedDate} />}
        <BlogPostContent content={data.content} />
      </article>
      <section></section>
    </div>
  );
}
