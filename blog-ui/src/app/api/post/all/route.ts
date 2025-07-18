import { NextRequest, NextResponse } from 'next/server';
import handler from '../../apiHandler';

export async function GET(request: Request): Promise<any> {
  const response = await handler({
    method: 'GET',
    query: {
      endpoint: `/posts?fields[0]=slug&fields[1]=excerpt&populate=featuredImage`,
    },
  });
  if (response.status !== 200) {
    return NextResponse.json(
      { error: 'No posts not found' },
      { status: response.status }
    );
  }

  const allPosts = response.data?.data || [];

  return NextResponse.json({ ...allPosts });
}
