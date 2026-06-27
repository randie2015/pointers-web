'use client';

import { motion } from 'framer-motion';
import { BrandingPainter } from '@/components/services/BrandingPainter';
import { WebBuilderSimulator } from '@/components/services/WebBuilderSimulator';
import { SocialViralSimulator } from '@/components/services/SocialViralSimulator';
import { StrategyDashboard } from '@/components/services/StrategyDashboard';
import { useMotionReveal } from '@/lib/use-motion-reveal';

type Variant = 'branding' | 'web' | 'content' | 'ads';

function VisualFrame({ children }: { children: React.ReactNode }) {
  const { ref, show, reduced } = useMotionReveal({ margin: -60, amount: 0 });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, scale: 0.98 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[280px] md:min-h-[340px]"
    >
      {children}
    </motion.div>
  );
}

export function ServiceVisual({ variant }: { variant: Variant }) {
  if (variant === 'branding') {
    return (
      <VisualFrame>
        <BrandingPainter />
      </VisualFrame>
    );
  }

  if (variant === 'web') {
    return (
      <VisualFrame>
        <WebBuilderSimulator />
      </VisualFrame>
    );
  }

  if (variant === 'content') {
    return (
      <VisualFrame>
        <SocialViralSimulator />
      </VisualFrame>
    );
  }

  if (variant === 'ads') {
    return (
      <VisualFrame>
        <StrategyDashboard />
      </VisualFrame>
    );
  }

  return null;
}
