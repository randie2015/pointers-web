'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { useLocale } from 'next-intl';

type Options = {
  margin?: number;
  amount?: number;
};

function isElementInView(el: Element, margin: number) {
  const offset = margin < 0 ? -margin : 0;
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - offset && rect.bottom > offset;
}

export function useMotionReveal({ margin = -40, amount = 0.12 }: Options = {}) {
  const reduced = useReducedMotion();
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: `${margin}px`, amount });
  const [forced, setForced] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () => {
      if (isElementInView(el, margin)) setForced(true);
    };

    sync();
    requestAnimationFrame(sync);

    window.addEventListener('hashchange', sync);
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('anchorscroll', sync);

    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('scroll', sync);
      window.removeEventListener('anchorscroll', sync);
    };
  }, [margin, locale]);

  return {
    ref,
    show: Boolean(reduced) || inView || forced,
    reduced: Boolean(reduced)
  };
}
