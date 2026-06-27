'use client';

import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Options = {
  margin?: number;
  amount?: number;
};

function isElementInView(el: Element, margin: number) {
  const offset = margin < 0 ? -margin : 0;
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - offset && rect.bottom > offset;
}

export function useMotionReveal({ margin = -80, amount = 0 }: Options = {}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: `${margin}px`, amount });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () => {
      if (isElementInView(el, margin)) setForced(true);
    };

    sync();
    const timers = [0, 100, 300, 600].map((ms) => window.setTimeout(sync, ms));

    window.addEventListener('hashchange', sync);
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('anchorscroll', sync);

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('scroll', sync);
      window.removeEventListener('anchorscroll', sync);
    };
  }, [margin]);

  return {
    ref,
    show: Boolean(reduced) || inView || forced,
    reduced: Boolean(reduced)
  };
}
