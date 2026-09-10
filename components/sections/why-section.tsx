'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/ui/section-header';
import {
  Sparkles,
  Heart,
  Clock,
  TrendingUp,
  Brain,
  Rocket,
  type LucideIcon
} from 'lucide-react';

const MAGENTA = '#BC2656';

type CardTheme = {
  titleColor: string;
  iconBg: string;
  hoverShadow: string;
};

const THEME: CardTheme = {
  titleColor: MAGENTA,
  iconBg: 'rgba(188, 38, 86, 0.14)',
  hoverShadow: '0px 10px 30px rgba(188, 38, 86, 0.22)'
};

const ICONS: LucideIcon[] = [Sparkles, Heart, Clock, TrendingUp, Brain, Rocket];

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

const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: 8,
    scale: [1, 1.08, 1.04],
    transition: { duration: 0.45, ease: 'easeOut' as const }
  }
};

function WhyCard({
  title,
  description,
  Icon,
  index
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        className="mobile-surface surface-card h-full rounded-2xl p-7 md:p-8"
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
        variants={cardVariants}
      >
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: THEME.iconBg, color: THEME.titleColor }}
          variants={iconVariants}
        >
          <Icon size={22} strokeWidth={2} aria-hidden />
        </motion.div>

        <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-[#F8FAFC] md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#94A3B8] md:text-base">{description}</p>
      </motion.article>
    </Reveal>
  );
}

export function WhySection() {
  const t = useTranslations('why');
  const items = t.raw('items') as { title: string; description: string }[];

  return (
    <section id="por-que" className="relative z-[1] scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {items.map((item, i) => (
            <WhyCard
              key={item.title}
              title={item.title}
              description={item.description}
              Icon={ICONS[i % ICONS.length]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
