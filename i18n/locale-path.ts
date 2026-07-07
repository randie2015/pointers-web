import type { AppLocale } from '@/i18n/routing';

const LOCALE_SEGMENT_RE = /^\/(es|en)(?=\/|$)/;

/**
 * Rebuilds the current path by swapping only the locale segment.
 * /es/nosotros -> /en/nosotros
 */
export function swapLocaleInPath(pathname: string, nextLocale: AppLocale): string {
  if (LOCALE_SEGMENT_RE.test(pathname)) {
    return pathname.replace(LOCALE_SEGMENT_RE, `/${nextLocale}`);
  }

  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return normalized === '/' ? `/${nextLocale}` : `/${nextLocale}${normalized}`;
}

/**
 * Builds a locale-prefixed path from a locale-free pathname.
 * /nosotros + en -> /en/nosotros
 */
export function buildLocalizedPath(pathname: string, locale: AppLocale): string {
  const normalized = pathname === '/' ? '' : pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `/${locale}${normalized}`;
}
