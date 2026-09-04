import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { DEMO_SLUGS, isDemoSlug } from './lib/clinic-demo/demo-catalog';

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

function rewriteClinicDemo(request: NextRequest, slug: string, rest = '') {
  return NextResponse.rewrite(new URL(`/clinic-demo/${slug}${rest}`, request.url));
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localizedDemoMatch = pathname.match(/^\/(es|en)\/([^/]+)(\/.*)?$/);
  if (localizedDemoMatch && isDemoSlug(localizedDemoMatch[2])) {
    return rewriteClinicDemo(request, localizedDemoMatch[2], localizedDemoMatch[3] ?? '');
  }

  const demoMatch = pathname.match(/^\/([^/]+)(\/.*)?$/);
  if (demoMatch && isDemoSlug(demoMatch[1])) {
    return rewriteClinicDemo(request, demoMatch[1], demoMatch[2] ?? '');
  }

  const localizedMagrassMatch = pathname.match(/^\/(es|en)(\/magrass-lagree(?:\/.*)?)$/);
  if (localizedMagrassMatch) {
    return NextResponse.rewrite(new URL(localizedMagrassMatch[2], request.url));
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

  if (pathname.startsWith('/clinic-demo')) {
    return NextResponse.next();
  }

  if (DEMO_SLUGS.some((slug) => pathname === `/${slug}` || pathname.startsWith(`/${slug}/`))) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/magrass-lagree')) {
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
