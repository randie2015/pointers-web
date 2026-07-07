'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SERVICE_MAGENTA, SERVICE_PURPLE, SERVICE_PURPLE_DARK } from '@/lib/service-brand';

const FRAMES = [
  `linear-gradient(to bottom right, ${SERVICE_PURPLE} 0%, ${SERVICE_MAGENTA} 100%)`,
  `linear-gradient(135deg, ${SERVICE_PURPLE} 0%, ${SERVICE_MAGENTA} 55%, ${SERVICE_PURPLE_DARK} 100%)`,
  `linear-gradient(225deg, ${SERVICE_PURPLE_DARK} 0%, ${SERVICE_MAGENTA} 45%, ${SERVICE_PURPLE} 100%)`,
  `linear-gradient(to bottom right, ${SERVICE_PURPLE} 0%, ${SERVICE_MAGENTA} 100%)`
];

const STATIC = `linear-gradient(to bottom right, ${SERVICE_PURPLE} 0%, ${SERVICE_MAGENTA} 100%)`;

/** Degradado animado violeta ↔ magenta — todas las pantallas. */
export function VioletMagentaGradientBg({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{ background: STATIC }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      animate={{ background: FRAMES }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
    />
  );
}
