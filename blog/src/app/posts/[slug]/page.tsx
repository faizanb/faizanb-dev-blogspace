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
  const res = await fetch(`${process.env.BASE_URL}/api/posts/${slug}`, {
    next: { revalidate: 60 }, // ISR (regenerate every 60 seconds)
  });

  if (!res.ok) return null;
  return res.json();
}

// ⛳ SEO metadata using the same API call
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const post = await getBlogPost(params.slug);
//   if (!post) return {};

//   return {
//     title: post.metaTitle || post.title,
//     description: post.metaDescription,
//     openGraph: {
//       title: post.metaTitle || post.title,
//       description: post.metaDescription,
//       images: post.metaImage ? [post.metaImage] : [],
//     },
//     twitter: {
//       title: post.metaTitle || post.title,
//       description: post.metaDescription,
//       card: 'summary_large_image',
//     },
//   };
// }

// 🔽 Page rendering logic
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return notFound();

  return <>Content here</>;
}
