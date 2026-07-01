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
const TEAL = '#39B8AD';
const VIOLET = '#5E549D';

type CardTheme = {
  titleColor: string;
  badgeBg: string;
  badgeText: string;
  hoverShadow: string;
};

const THEMES: CardTheme[] = [
  {
    titleColor: MAGENTA,
    badgeBg: 'rgba(188, 38, 86, 0.12)',
    badgeText: MAGENTA,
    hoverShadow: '0px 10px 30px rgba(188, 38, 86, 0.22)'
  },
  {
    titleColor: VIOLET,
    badgeBg: 'rgba(94, 84, 157, 0.12)',
    badgeText: VIOLET,
    hoverShadow: '0px 10px 30px rgba(94, 84, 157, 0.22)'
  },
  {
    titleColor: TEAL,
    badgeBg: 'rgba(57, 184, 173, 0.12)',
    badgeText: TEAL,
    hoverShadow: '0px 10px 30px rgba(57, 184, 173, 0.28)'
  },
  {
    titleColor: MAGENTA,
    badgeBg: 'rgba(188, 38, 86, 0.12)',
    badgeText: MAGENTA,
    hoverShadow: '0px 10px 30px rgba(188, 38, 86, 0.22)'
  }
];

const cardVariants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)'
  },
  hover: (theme: CardTheme) => ({
    y: -10,
    scale: 1.02,
    boxShadow: theme.hoverShadow,
    transition: { type: 'spring' as const, stiffness: 320, damping: 22 }
  })
};

const badgeVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: 15,
    scale: [1, 1.12, 1.05],
    transition: { duration: 0.45, ease: 'easeOut' as const }
  }
};

function ProcessCard({
  step,
  title,
  description,
  theme,
  visual,
  index
}: {
  step: string;
  title: string;
  description: string;
  theme: CardTheme;
  visual: ReactNode;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        className="flex h-full flex-col items-center rounded-2xl border border-border/60 bg-white p-6 text-center md:p-7"
        initial="rest"
        whileHover="hover"
        variants={{
          rest: cardVariants.rest,
          hover: cardVariants.hover(theme)
        }}
      >
        <motion.span
          className="inline-block rounded-full px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
          variants={badgeVariants}
        >
          {step}
        </motion.span>

        <h3
          className="mt-5 w-full font-display text-xl font-semibold tracking-tight md:text-2xl"
          style={{ color: theme.titleColor }}
        >
          {title}
        </h3>
        <p className="mt-3 w-full text-sm leading-relaxed text-gray-600">{description}</p>
        {visual}
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
    <section id={sectionId} className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <ProcessCard
              key={step.title}
              step={step.step}
              title={step.title}
              description={step.description}
              theme={THEMES[i % THEMES.length]}
              visual={VISUALS[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
