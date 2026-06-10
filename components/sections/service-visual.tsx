'use client';

import { motion } from 'framer-motion';
import { BrandingPainter } from '@/components/services/BrandingPainter';
import { WebBuilderSimulator } from '@/components/services/WebBuilderSimulator';
import { SocialViralSimulator } from '@/components/services/SocialViralSimulator';
import { StrategyDashboard } from '@/components/services/StrategyDashboard';

type Variant = 'branding' | 'web' | 'content' | 'ads';

export function ServiceVisual({ variant }: { variant: Variant }) {
  if (variant === 'branding') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-[280px] md:min-h-[340px]"
      >
        <BrandingPainter />
      </motion.div>
    );
  }

  if (variant === 'web') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-[280px] md:min-h-[340px]"
      >
        <WebBuilderSimulator />
      </motion.div>
    );
  }

  if (variant === 'content') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-[280px] md:min-h-[340px]"
      >
        <SocialViralSimulator />
      </motion.div>
    );
  }

  if (variant === 'ads') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-[280px] md:min-h-[340px]"
      >
        <StrategyDashboard />
      </motion.div>
    );
  }

  return null;
}
