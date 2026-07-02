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
const TEAL = '#39B8AD';
const VIOLET = '#5E549D';

type CardTheme = {
  titleColor: string;
  iconBg: string;
  hoverShadow: string;
};

const THEMES: CardTheme[] = [
  {
    titleColor: MAGENTA,
    iconBg: 'rgba(188, 38, 86, 0.12)',
    hoverShadow: '0px 10px 30px rgba(188, 38, 86, 0.22)'
  },
  {
    titleColor: TEAL,
    iconBg: 'rgba(57, 184, 173, 0.12)',
    hoverShadow: '0px 10px 30px rgba(57, 184, 173, 0.28)'
  },
  {
    titleColor: VIOLET,
    iconBg: 'rgba(94, 84, 157, 0.12)',
    hoverShadow: '0px 10px 30px rgba(94, 84, 157, 0.22)'
  },
  {
    titleColor: MAGENTA,
    iconBg: 'rgba(188, 38, 86, 0.12)',
    hoverShadow: '0px 10px 30px rgba(188, 38, 86, 0.22)'
  },
  {
    titleColor: TEAL,
    iconBg: 'rgba(57, 184, 173, 0.12)',
    hoverShadow: '0px 10px 30px rgba(57, 184, 173, 0.28)'
  },
  {
    titleColor: VIOLET,
    iconBg: 'rgba(94, 84, 157, 0.12)',
    hoverShadow: '0px 10px 30px rgba(94, 84, 157, 0.22)'
  }
];

const ICONS: LucideIcon[] = [Sparkles, Heart, Clock, TrendingUp, Brain, Rocket];

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

const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: 15,
    scale: [1, 1.12, 1.05],
    transition: { duration: 0.45, ease: 'easeOut' as const }
  }
};

function WhyCard({
  title,
  description,
  theme,
  Icon,
  index
}: {
  title: string;
  description: string;
  theme: CardTheme;
  Icon: LucideIcon;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        className="mobile-surface h-full rounded-2xl bg-white p-7 shadow-md md:p-8"
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
        variants={{
          rest: cardVariants.rest,
          hover: cardVariants.hover(theme)
        }}
      >
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: theme.iconBg, color: theme.titleColor }}
          variants={iconVariants}
        >
          <Icon size={22} strokeWidth={2} aria-hidden />
        </motion.div>

        <h3
          className="mt-6 font-display text-xl font-semibold tracking-tight md:text-2xl"
          style={{ color: theme.titleColor }}
        >
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">{description}</p>
      </motion.article>
    </Reveal>
  );
}

export function WhySection() {
  const t = useTranslations('why');
  const items = t.raw('items') as { title: string; description: string }[];

  return (
    <section id="por-que" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
            titleClassName="font-semibold text-gray-900"
            subtitleClassName="text-gray-600"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {items.map((item, i) => (
            <WhyCard
              key={item.title}
              title={item.title}
              description={item.description}
              theme={THEMES[i % THEMES.length]}
              Icon={ICONS[i % ICONS.length]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
