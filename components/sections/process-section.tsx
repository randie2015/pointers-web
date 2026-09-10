'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/ui/section-header';
import { DiscoveryScanner } from '@/components/workflow/DiscoveryScanner';
import { StrategyBullseye } from '@/components/workflow/StrategyBullseye';
import { DesignDevSketch } from '@/components/workflow/DesignDevSketch';
import { LaunchRocket } from '@/components/workflow/LaunchRocket';
import type { ReactNode } from 'react';

const MAGENTA = '#BC2656';

type CardTheme = {
  titleColor: string;
  badgeBg: string;
  badgeText: string;
  hoverShadow: string;
};

const THEME: CardTheme = {
  titleColor: MAGENTA,
  badgeBg: 'rgba(188, 38, 86, 0.14)',
  badgeText: MAGENTA,
  hoverShadow: '0px 10px 30px rgba(188, 38, 86, 0.22)'
};

const cardVariants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)'
  },
  hover: {
    y: -8,
    scale: 1.015,
    boxShadow: THEME.hoverShadow,
    transition: { type: 'spring' as const, stiffness: 320, damping: 22 }
  }
};

const badgeVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: 8,
    scale: [1, 1.08, 1.04],
    transition: { duration: 0.45, ease: 'easeOut' as const }
  }
};

function ProcessCard({
  step,
  title,
  description,
  visual,
  index
}: {
  step: string;
  title: string;
  description: string;
  visual: ReactNode;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.04}>
      <motion.article
        className="mobile-surface surface-card flex h-full flex-col items-center rounded-2xl p-8 text-center md:p-10"
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
        variants={cardVariants}
      >
        <motion.span
          className="inline-block rounded-full px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: THEME.badgeBg, color: THEME.badgeText }}
          variants={badgeVariants}
        >
          {step}
        </motion.span>

        <h3 className="mt-5 w-full font-display text-2xl font-semibold tracking-tight text-[#F8FAFC] md:text-3xl">
          {title}
        </h3>
        <p className="mt-4 w-full text-base leading-relaxed text-[#94A3B8] md:text-lg">{description}</p>
        <div className="mt-6 w-full">{visual}</div>
      </motion.article>
    </Reveal>
  );
}

const VISUALS = [
  <DiscoveryScanner key="discovery" />,
  <StrategyBullseye key="strategy" />,
  <DesignDevSketch key="design" />,
  <LaunchRocket key="launch" />
];

export function ProcessSection({
  namespace = 'process',
  sectionId = 'proceso'
}: {
  namespace?: string;
  sectionId?: string;
}) {
  const t = useTranslations(namespace);
  const steps = t.raw('steps') as { step: string; title: string; description: string }[];

  return (
    <section id={sectionId} className="relative z-[1] scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2 lg:gap-12">
          {steps.map((step, i) => (
            <ProcessCard
              key={step.title}
              step={step.step}
              title={step.title}
              description={step.description}
              visual={VISUALS[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
