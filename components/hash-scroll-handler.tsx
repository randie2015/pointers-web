'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';

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

function isHomePath(path: string) {
  const normalized = normalizePath(path);
  return normalized === '/' || normalized === '/es' || normalized === '/en';
}

function isServiciosHash(hash: string) {
  return decodeURIComponent(hash.replace(/^#/, '')) === 'servicios';
}

export function HashScrollHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && isServiciosHash(hash) && isHomePath(window.location.pathname)) {
      router.replace('/servicios');
      return;
    }
    if (!hash) return;
    scrollToHash(hash);
  }, [pathname, router]);

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
        router.push('/servicios');
        return;
      }

      scrollToHash(url.hash);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [router]);

  useEffect(() => {
    const onHashChange = () => {
      if (isServiciosHash(window.location.hash) && isHomePath(window.location.pathname)) {
        router.replace('/servicios');
        return;
      }
      scrollToHash(window.location.hash);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [router]);

  return null;
}
