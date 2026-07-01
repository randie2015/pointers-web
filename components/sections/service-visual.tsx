'use client';

import dynamic from 'next/dynamic';
import { useMotionReveal } from '@/lib/use-motion-reveal';

type Variant = 'branding' | 'web' | 'content' | 'ads';

const BrandingPainter = dynamic(
  () => import('@/components/services/BrandingPainter').then((m) => ({ default: m.BrandingPainter })),
  { loading: () => <VisualSkeleton /> }
);
const WebBuilderSimulator = dynamic(
  () => import('@/components/services/WebBuilderSimulator').then((m) => ({ default: m.WebBuilderSimulator })),
  { loading: () => <VisualSkeleton /> }
);
const SocialViralSimulator = dynamic(
  () => import('@/components/services/SocialViralSimulator').then((m) => ({ default: m.SocialViralSimulator })),
  { loading: () => <VisualSkeleton /> }
);
const StrategyDashboard = dynamic(
  () => import('@/components/services/StrategyDashboard').then((m) => ({ default: m.StrategyDashboard })),
  { loading: () => <VisualSkeleton /> }
);

function VisualSkeleton() {
  return <div className="min-h-[280px] animate-pulse rounded-2xl bg-muted/60 md:min-h-[340px]" />;
}

function VisualFrame({ children }: { children: React.ReactNode }) {
  const { ref, show, reduced } = useMotionReveal({ margin: -60, amount: 0 });

  return (
    <div
      ref={ref}
      className="min-h-[280px] transition-opacity duration-300 md:min-h-[340px]"
      style={{ opacity: reduced || show ? 1 : 0 }}
    >
      {children}
    </div>
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
