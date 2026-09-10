'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SERVICE_MAGENTA } from '@/lib/service-brand';

const STATIC = `radial-gradient(circle at 20% 20%, rgba(188,38,86,0.35) 0%, transparent 42%), linear-gradient(160deg, #13161F 0%, #0c0e14 55%, ${SERVICE_MAGENTA} 160%)`;

const FRAMES = [
  STATIC,
  `radial-gradient(circle at 80% 30%, rgba(188,38,86,0.28) 0%, transparent 46%), linear-gradient(200deg, #13161F 0%, #0c0e14 50%, ${SERVICE_MAGENTA} 170%)`,
  `radial-gradient(circle at 40% 80%, rgba(188,38,86,0.22) 0%, transparent 48%), linear-gradient(140deg, #13161F 0%, #0c0e14 58%, ${SERVICE_MAGENTA} 165%)`,
  STATIC
];

/** Dark surface with a restrained crimson radial — no pastel washes. */
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
      transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
    />
  );
}
