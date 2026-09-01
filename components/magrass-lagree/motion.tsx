'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const easeOut = [0.22, 1, 0.36, 1] as const;

type MagrassRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MagrassReveal({ children, className, delay = 0 }: MagrassRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const magrassStaggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const magrassStaggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut }
  }
};

type MagrassStaggerProps = {
  children: ReactNode;
  className?: string;
};

export function MagrassStagger({ children, className }: MagrassStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      variants={magrassStaggerContainer}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MagrassStaggerChild({ children, className }: MagrassStaggerProps) {
  return (
    <motion.div variants={magrassStaggerItem} className={className}>
      {children}
    </motion.div>
  );
}

export const magrassLuxuryCard =
  'group border border-transparent transition-all duration-500 hover:-translate-y-2 hover:border-[#C5A880]/50 hover:shadow-xl hover:shadow-[#1C2331]/5';

export const magrassImageZoom =
  'transition-transform duration-700 ease-out group-hover:scale-105';

export function MagrassMotionImageWrap({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('overflow-hidden', className)}>{children}</div>;
}
