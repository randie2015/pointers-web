import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const SESSION_COOKIE = 'admin_session';

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

async function verifyAdminSession(token: string | undefined) {
  if (!token) return null;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const secret = process.env.ADMIN_SESSION_SECRET ?? 'pointers-dev-session-secret';
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expected = Array.from(new Uint8Array(sigBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  if (expected !== signature) return null;

  try {
    const data = JSON.parse(decodeBase64Url(payload)) as { sub: string; exp: number };
    if (!data.sub || data.exp < Date.now()) return null;
    return { username: data.sub };
  } catch {
    return null;
  }
}

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localizedReyDentalMatch = pathname.match(/^\/(es|en)(\/rey-dental(?:\/.*)?)$/);
  if (localizedReyDentalMatch) {
    return NextResponse.rewrite(new URL(localizedReyDentalMatch[2], request.url));
  }

  const localizedOrthozentMatch = pathname.match(/^\/(es|en)(\/orthozent(?:\/.*)?)$/);
  if (localizedOrthozentMatch) {
    return NextResponse.rewrite(new URL(localizedOrthozentMatch[2], request.url));
  }

  const localizedAlejandraMatch = pathname.match(/^\/(es|en)(\/alejandracusirramos(?:\/.*)?)$/);
  if (localizedAlejandraMatch) {
    return NextResponse.rewrite(new URL(localizedAlejandraMatch[2], request.url));
  }

  const localeAdminMatch = pathname.match(/^\/(es|en)(\/admin(?:\/.*)?)$/);
  if (localeAdminMatch) {
    return NextResponse.redirect(new URL(localeAdminMatch[2], request.url));
  }

  if (pathname === '/contacto' || pathname === '/contacto/') {
    return NextResponse.redirect(new URL('/es/contact#formulario', request.url));
  }

  const localizedContactoMatch = pathname.match(/^\/(es|en)\/contacto\/?$/);
  if (localizedContactoMatch) {
    return NextResponse.redirect(
      new URL(`/${localizedContactoMatch[1]}/contact#formulario`, request.url)
    );
  }

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      const session = await verifyAdminSession(request.cookies.get(SESSION_COOKIE)?.value);
      if (session) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    const session = await verifyAdminSession(request.cookies.get(SESSION_COOKIE)?.value);
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (pathname.startsWith('/rey-dental')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/orthozent')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/alejandracusirramos')) {
    return NextResponse.next();
  }

  const response = intlMiddleware(request);
  response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  response.headers.set('Vary', 'Accept-Language');
  return response;
}

export const config = {
  matcher: ['/', '/(es|en)/:path*', '/admin/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
