import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type BlogPost = {
  title: string;
  slug: string;
  content: string;
  author: string;
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
};

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${process.env.API_URL}/api/blogs/${slug}`, {
    next: { revalidate: 60 }, // ISR (regenerate every 60 seconds)
  });

  if (!res.ok) return null;
  return res.json();
}

// ⛳ SEO metadata using the same API call
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      images: post.metaImage ? [post.metaImage] : [],
    },
    twitter: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      card: 'summary_large_image',
    },
  };
}

// 🔽 Page rendering logic
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);
  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        By {post.author} · {new Date(post.publishedAt).toDateString()}
      </p>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
