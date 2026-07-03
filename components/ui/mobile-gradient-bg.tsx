'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/lib/use-media-query';

const MAGENTA = '#BC2656';
const VIOLET = '#5E549D';

/** Animated magenta ↔ violet gradient — mobile only. Desktop uses static background from parent. */
export function MobileGradientBg({ className = '' }: { className?: string }) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const reduced = useReducedMotion();

  if (!isMobile) return null;

  if (reduced) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{ background: `linear-gradient(135deg, ${MAGENTA} 0%, ${VIOLET} 100%)` }}
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
      animate={{
        background: [
          `linear-gradient(135deg, ${MAGENTA} 0%, ${VIOLET} 55%, ${MAGENTA} 100%)`,
          `linear-gradient(225deg, ${VIOLET} 0%, ${MAGENTA} 50%, ${VIOLET} 100%)`,
          `linear-gradient(315deg, ${MAGENTA} 10%, ${VIOLET} 60%, ${MAGENTA} 100%)`,
          `linear-gradient(135deg, ${MAGENTA} 0%, ${VIOLET} 55%, ${MAGENTA} 100%)`
        ]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
    />
  );
}
