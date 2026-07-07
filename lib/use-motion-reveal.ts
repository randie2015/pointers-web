'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type Options = {
  margin?: number;
  amount?: number;
};

function isElementInView(el: Element, margin: number) {
  const offset = margin < 0 ? -margin : 0;
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - offset && rect.bottom > offset;
}

export function useMotionReveal({ margin = -32, amount = 0.05 }: Options = {}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: `${margin}px`, amount });
  const [forced, setForced] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () => {
      if (isElementInView(el, margin)) setForced(true);
    };

    sync();

    const raf = requestAnimationFrame(sync);
    const t = window.setTimeout(sync, 80);
    const fallback = window.setTimeout(() => setTimedOut(true), 450);

    window.addEventListener('hashchange', sync);
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('anchorscroll', sync);
    window.addEventListener('resize', sync, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.clearTimeout(fallback);
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('scroll', sync);
      window.removeEventListener('anchorscroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [margin]);

  return {
    ref,
    show: Boolean(reduced) || inView || forced || timedOut,
    reduced: Boolean(reduced)
  };
}
