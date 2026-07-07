'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter as useIntlRouter } from '@/i18n/routing';
import { stripLocaleFromPath } from '@/i18n/locale-path';
import { isLocaleSwitchInProgress, LOCALE_SWITCH_EVENT } from '@/i18n/locale-switch';

function dispatchAnchorScroll() {
  window.dispatchEvent(new CustomEvent('anchorscroll'));
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

function scrollToHash(hash: string, behavior: ScrollBehavior = 'auto') {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  el.scrollIntoView({ behavior, block: 'start' });
  dispatchAnchorScroll();
  return true;
}

function scrollToHashWithRetry(hash: string, attempts = 12) {
  if (scrollToHash(hash)) return;

  let count = 0;
  const timer = window.setInterval(() => {
    count += 1;
    if (scrollToHash(hash) || count >= attempts) {
      window.clearInterval(timer);
    }
  }, 100);
}

function normalizePath(path: string) {
  return path.replace(/\/$/, '') || '/';
}

function isHomePath(path: string) {
  const normalized = normalizePath(stripLocaleFromPath(path));
  return normalized === '/';
}

function isServiciosHash(hash: string) {
  return decodeURIComponent(hash.replace(/^#/, '')) === 'servicios';
}

export function HashScrollHandler() {
  const pathname = usePathname();
  const intlRouter = useIntlRouter();
  const prevRouteRef = useRef<string | null>(null);
  const skipScrollRef = useRef(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const onLocaleSwitch = () => {
      skipScrollRef.current = isLocaleSwitchInProgress();
    };

    window.addEventListener(LOCALE_SWITCH_EVENT, onLocaleSwitch);
    return () => window.removeEventListener(LOCALE_SWITCH_EVENT, onLocaleSwitch);
  }, []);

  useEffect(() => {
    if (skipScrollRef.current || isLocaleSwitchInProgress()) {
      skipScrollRef.current = false;
      return;
    }

    const routeWithoutLocale = stripLocaleFromPath(pathname);
    if (prevRouteRef.current === routeWithoutLocale) return;
    prevRouteRef.current = routeWithoutLocale;

    const hash = window.location.hash;
    if (hash && isServiciosHash(hash) && isHomePath(pathname)) {
      intlRouter.replace('/servicios', { scroll: false });
      return;
    }
    if (hash) {
      scrollToHashWithRetry(hash);
      return;
    }
    scrollToTop();
    requestAnimationFrame(scrollToTop);
  }, [pathname, intlRouter]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest('a[href*="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href?.includes('#')) return;

      const url = new URL(href, window.location.origin);
      const samePath =
        normalizePath(url.pathname) === normalizePath(window.location.pathname);

      if (!samePath || !url.hash) return;

      if (isServiciosHash(url.hash)) {
        event.preventDefault();
        intlRouter.push('/servicios', { scroll: false });
        return;
      }

      event.preventDefault();
      scrollToHashWithRetry(url.hash);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [intlRouter]);

  useEffect(() => {
    const onHashChange = () => {
      if (isServiciosHash(window.location.hash) && isHomePath(window.location.pathname)) {
        intlRouter.replace('/servicios', { scroll: false });
        return;
      }
      scrollToHashWithRetry(window.location.hash);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [intlRouter]);

  return null;
}
