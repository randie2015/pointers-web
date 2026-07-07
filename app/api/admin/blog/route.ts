import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth/session';
import { getAdminPosts, toLegacyBlogPost } from '@/lib/cms/posts-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getSessionToken(request: Request) {
  return request.headers.get('cookie')?.match(/admin_session=([^;]+)/)?.[1];
}

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
}

export async function GET(request: Request) {
  if (!verifySessionToken(getSessionToken(request))) return unauthorized();

  try {
    const posts = await getAdminPosts();
    return NextResponse.json(posts.map(toLegacyBlogPost));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar artículos.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Usa el formulario "Nuevo artículo" para crear publicaciones en Supabase.' },
    { status: 400 }
  );
}
