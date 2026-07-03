'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMotionReveal } from '@/lib/use-motion-reveal';

export function Reveal({ children, delay = 0, y = 20 }: { children: ReactNode; delay?: number; y?: number }) {
  const { ref, show, reduced } = useMotionReveal({ margin: -20, amount: 0.04 });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y }}
      animate={show || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.5, delay, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
