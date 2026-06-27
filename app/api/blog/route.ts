import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/blog/store';

export async function GET() {
  const posts = await getPublishedPosts();
  return NextResponse.json(posts);
}
