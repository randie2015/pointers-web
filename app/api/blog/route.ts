import { NextResponse } from 'next/server';
import { getPublicPosts } from '@/lib/cms/posts-reader';

export async function GET() {
  const posts = await getPublicPosts();
  return NextResponse.json(posts);
}
