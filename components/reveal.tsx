'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMotionReveal } from '@/lib/use-motion-reveal';
import { useMediaQuery } from '@/lib/use-media-query';

export function Reveal({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { ref, show, reduced } = useMotionReveal({ margin: isMobile ? -40 : -80, amount: 0 });
  const offsetY = isMobile ? 16 : y;

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: offsetY }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: offsetY }}
      transition={
        isMobile
          ? { duration: 0.5, delay, ease: 'easeOut' }
          : { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
