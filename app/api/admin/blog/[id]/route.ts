import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth/session';
import { deletePost, getPostById, updatePost } from '@/lib/blog/store';
import type { UpdateBlogPostInput } from '@/lib/blog/types';

function revalidateBlogPages() {
  revalidatePath('/es/blog');
  revalidatePath('/en/blog');
}

type RouteContext = { params: Promise<{ id: string }> };

function getSessionToken(request: Request) {
  return request.headers.get('cookie')?.match(/admin_session=([^;]+)/)?.[1];
}

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
}

export async function GET(request: Request, { params }: RouteContext) {
  if (!verifySessionToken(getSessionToken(request))) return unauthorized();

  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return NextResponse.json({ error: 'Artículo no encontrado.' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: RouteContext) {
  if (!verifySessionToken(getSessionToken(request))) return unauthorized();

  const { id } = await params;
  const body = (await request.json()) as UpdateBlogPostInput;

  if (body.title !== undefined && !body.title.trim()) {
    return NextResponse.json({ error: 'El título no puede estar vacío.' }, { status: 400 });
  }

  const post = await updatePost(id, body);

  if (!post) {
    return NextResponse.json({ error: 'Artículo no encontrado.' }, { status: 404 });
  }

  revalidateBlogPages();
  return NextResponse.json(post);
}

export async function DELETE(request: Request, { params }: RouteContext) {
  if (!verifySessionToken(getSessionToken(request))) return unauthorized();

  const { id } = await params;
  const deleted = await deletePost(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Artículo no encontrado.' }, { status: 404 });
  }

  revalidateBlogPages();
  return NextResponse.json({ ok: true });
}
