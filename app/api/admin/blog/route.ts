import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth/session';
import { createPost, getAllPosts } from '@/lib/blog/store';
import type { CreateBlogPostInput } from '@/lib/blog/types';

function getSessionToken(request: Request) {
  return request.headers.get('cookie')?.match(/admin_session=([^;]+)/)?.[1];
}

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
}

export async function GET(request: Request) {
  if (!verifySessionToken(getSessionToken(request))) return unauthorized();

  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!verifySessionToken(getSessionToken(request))) return unauthorized();

  const body = (await request.json()) as CreateBlogPostInput;

  if (!body.title?.trim() || !body.content?.trim()) {
    return NextResponse.json({ error: 'Título y contenido son obligatorios.' }, { status: 400 });
  }

  const post = await createPost(body);
  return NextResponse.json(post, { status: 201 });
}
