import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/roles';
import { verifySessionToken } from '@/lib/auth/session';

function getSessionToken(request: Request) {
  return request.headers.get('cookie')?.match(/admin_session=([^;]+)/)?.[1];
}

export async function GET(request: Request) {
  const session = verifySessionToken(getSessionToken(request));

  if (!session) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  return NextResponse.json({
    authorId: session.username,
    username: session.username,
    isAdmin: isAdmin(session.username),
    role: isAdmin(session.username) ? 'admin' : 'author'
  });
}
