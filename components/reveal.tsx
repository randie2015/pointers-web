'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
