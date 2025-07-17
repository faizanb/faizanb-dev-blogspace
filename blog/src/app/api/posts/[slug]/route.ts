import { NextRequest, NextResponse } from 'next/server';
import handler from '../../apiHandler';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
): Promise<any> {
  const { slug } = await params;
  const response = await handler({
    method: 'GET',
    query: { endpoint: `/posts?filters[slug][$eq]=${slug}&populate=*` },
  });
  if (response.status !== 200) {
    return NextResponse.json(
      { error: 'Blog post not found' },
      { status: response.status }
    );
  }

  // Process the response to include a table of contents (TOC)
  const post = response.data?.data?.[0];
  const postContent = post?.content || [];

  const toc = postContent
    .filter((block: any) => block.__component === 'blocks.heading')
    .map((block: any) => ({
      id: block.id,
      text: block.text,
      level: block.level,
      // Generate an anchor slug for linking to the heading
      anchor: block.text
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    }));

  // Calculate reading time (average reading speed: 200 words/minute)
  const getTextFromBlock = (block: any) => {
    if (block.__component === 'blocks.paragraph') {
      if (block.type === 'html') {
        return block.text
          .map((t: any) => t.children?.[0]?.text || '')
          .join(' ');
      }
      if (block.type === 'plainText') {
        return block.text
          .map((t: any) => t.children?.[0]?.text || '')
          .join(' ');
      }
    }
    if (block.__component === 'blocks.heading') {
      return block.text;
    }
    return '';
  };

  const allText = postContent.map(getTextFromBlock).join(' ');
  const wordCount = allText.trim().split(/\s+/).length;
  const minutesToRead = Math.max(1, Math.round(wordCount / 200));
  return NextResponse.json({ ...post, toc, minutesToRead });
}
