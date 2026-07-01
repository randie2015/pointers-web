'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMotionReveal } from '@/lib/use-motion-reveal';

export function Reveal({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  const { ref, show, reduced } = useMotionReveal({ margin: -80, amount: 0 });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
