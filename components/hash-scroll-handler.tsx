'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/routing';

function dispatchAnchorScroll() {
  window.dispatchEvent(new CustomEvent('anchorscroll'));
}

function scrollToHash(hash: string, behavior: ScrollBehavior = 'auto') {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  el.scrollIntoView({ behavior, block: 'start' });
  dispatchAnchorScroll();
  if (behavior === 'smooth') {
    window.setTimeout(dispatchAnchorScroll, 400);
  }
  return true;
}

function normalizePath(path: string) {
  return path.replace(/\/$/, '') || '/';
}

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    scrollToHash(hash);
  }, [pathname]);

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

      scrollToHash(url.hash);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      scrollToHash(window.location.hash);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return null;
}
