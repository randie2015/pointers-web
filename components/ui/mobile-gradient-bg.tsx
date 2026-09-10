'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/lib/use-media-query';

const MAGENTA = '#BC2656';

/** Subtle crimson wash — mobile only. */
export function MobileGradientBg({ className = '' }: { className?: string }) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const reduced = useReducedMotion();

  if (!isMobile) return null;

  const background = `radial-gradient(circle at 30% 20%, ${MAGENTA}55 0%, transparent 55%), linear-gradient(160deg, #13161F 0%, #090A0F 70%)`;

  if (reduced) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{ background }}
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
          background,
          `radial-gradient(circle at 70% 30%, ${MAGENTA}40 0%, transparent 58%), linear-gradient(200deg, #13161F 0%, #090A0F 72%)`,
          background
        ]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
    />
  );
}
