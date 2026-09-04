'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const easeOut = [0.22, 1, 0.36, 1] as const;

type AestheticRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AestheticReveal({ children, className, delay = 0 }: AestheticRevealProps) {
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

export const aestheticStaggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const aestheticStaggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut }
  }
};

type AestheticStaggerProps = {
  children: ReactNode;
  className?: string;
};

export function AestheticStagger({ children, className }: AestheticStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      variants={aestheticStaggerContainer}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AestheticStaggerChild({ children, className }: AestheticStaggerProps) {
  return (
    <motion.div variants={aestheticStaggerItem} className={className}>
      {children}
    </motion.div>
  );
}

export const aestheticLuxuryCard =
  'group border border-transparent transition-all duration-500 hover:-translate-y-2 hover:border-demo-accent/50 hover:shadow-xl hover:shadow-demo-primary/5';

export const aestheticImageZoom =
  'transition-transform duration-700 ease-out group-hover:scale-105';

export function AestheticMotionImageWrap({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('overflow-hidden', className)}>{children}</div>;
}
