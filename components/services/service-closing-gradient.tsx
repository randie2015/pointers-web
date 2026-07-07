'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SERVICE_MAGENTA, SERVICE_PURPLE, SERVICE_TEAL } from '@/lib/service-brand';

const FRAMES = [
  `linear-gradient(135deg, ${SERVICE_MAGENTA} 0%, ${SERVICE_TEAL} 42%, ${SERVICE_PURPLE} 100%)`,
  `linear-gradient(210deg, ${SERVICE_TEAL} 0%, ${SERVICE_MAGENTA} 48%, ${SERVICE_TEAL} 100%)`,
  `linear-gradient(300deg, ${SERVICE_PURPLE} 0%, ${SERVICE_MAGENTA} 40%, ${SERVICE_TEAL} 88%)`,
  `linear-gradient(135deg, ${SERVICE_MAGENTA} 0%, ${SERVICE_TEAL} 42%, ${SERVICE_PURPLE} 100%)`
];

/** Fondo dinámico magenta ↔ turquesa para el cierre de páginas de servicio. */
export function ServiceClosingGradient() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${SERVICE_MAGENTA} 0%, ${SERVICE_TEAL} 50%, ${SERVICE_PURPLE} 100%)`
        }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      animate={{ background: FRAMES }}
      transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
    />
  );
}
