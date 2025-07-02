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
  return NextResponse.json(response.data);
}
