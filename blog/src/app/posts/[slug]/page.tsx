import { notFound } from 'next/navigation';
import { Metadata } from 'next';
//import { Heading, CodeBlock } from '../../../../../atomic-ui/src/index';

async function getBlogPost(slug: string): Promise<any> {
  const res = await fetch(`${process.env.BASE_URL}/api/posts/${slug}`, {
    next: { revalidate: 60 }, // ISR (regenerate every 60 seconds)
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

function renderContentBlock(block: any) {
  switch (block.__component) {
    case 'blocks.heading':
      return (
        <div></div>
        // <Heading key={block.id} text={block.text} type={block.level as any} />
      );
    case 'blocks.paragraph':
      // If type is html, render as HTML
      if (block.type === 'html') {
        // block.text is an array of objects with .children[0].text
        const html = block.text
          .map((t: any, i: number) =>
            t.children?.[0]?.text ? t.children[0].text : ''
          )
          .join('');
        return (
          <div
            key={block.id}
            style={{ margin: '1em 0' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      // If plainText, render as plain text
      if (block.type === 'plainText') {
        const text = block.text
          .map((t: any) => (t.children?.[0]?.text ? t.children[0].text : ''))
          .join('');
        return <p key={block.id}>{text}</p>;
      }
      return null;
    case 'blocks.code-snippet':
      return (
        // <CodeBlock key={block.id} code={block.code} lang={block.language} />
        <div></div>
      );
    default:
      return null;
  }
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
    <article>
      <h1>{data.title}</h1>
      {data.content?.map(renderContentBlock)}
    </article>
  );
}
