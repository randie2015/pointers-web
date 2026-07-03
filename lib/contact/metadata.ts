import type { NextRequest } from 'next/server';

export type RequestMetadata = {
  submittedAt: string;
  locale?: string;
  pageUrl?: string;
  referrer?: string;
  source?: string;
  ip?: string;
  userAgent?: string;
  acceptLanguage?: string;
  country?: string;
  city?: string;
};

export function buildRequestMetadata(
  request: NextRequest,
  clientMeta: ContactRequestMetadata = {}
): RequestMetadata {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || undefined;

  return {
    submittedAt: new Date().toISOString(),
    locale: clientMeta.locale,
    pageUrl: clientMeta.pageUrl,
    referrer: clientMeta.referrer || request.headers.get('referer') || undefined,
    source: clientMeta.source ?? 'contact-form',
    ip,
    userAgent: request.headers.get('user-agent') || undefined,
    acceptLanguage: request.headers.get('accept-language') || undefined,
    country: request.headers.get('x-vercel-ip-country') || undefined,
    city: request.headers.get('x-vercel-ip-city') || undefined
  };
}

type ContactRequestMetadata = {
  locale?: string;
  pageUrl?: string;
  referrer?: string;
  source?: string;
};
