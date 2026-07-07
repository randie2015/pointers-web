import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth/session';
import {
  deleteAdminPost,
  getAdminPostById,
  toLegacyBlogPost,
  updateAdminPost
} from '@/lib/cms/posts-admin';
import type { UpdateBlogPostInput } from '@/lib/blog/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  try {
    const post = await getAdminPostById(id);

    if (!post) {
      return NextResponse.json({ error: 'Artículo no encontrado.' }, { status: 404 });
    }

    return NextResponse.json(toLegacyBlogPost(post));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar el artículo.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  if (!verifySessionToken(getSessionToken(request))) return unauthorized();

  const { id } = await params;
  const body = (await request.json()) as UpdateBlogPostInput;

  if (body.title !== undefined && !body.title.trim()) {
    return NextResponse.json({ error: 'El título no puede estar vacío.' }, { status: 400 });
  }

  try {
    const post = await updateAdminPost(id, body);

    if (!post) {
      return NextResponse.json({ error: 'Artículo no encontrado.' }, { status: 404 });
    }

    revalidateBlogPages();
    return NextResponse.json(toLegacyBlogPost(post));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al actualizar el artículo.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  if (!verifySessionToken(getSessionToken(request))) return unauthorized();

  const { id } = await params;

  try {
    const deleted = await deleteAdminPost(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Artículo no encontrado.' }, { status: 404 });
    }

    revalidateBlogPages();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al eliminar el artículo.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
