'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  ChartNoAxesCombined,
  Sparkles,
  Target,
  Zap,
  type LucideIcon
} from 'lucide-react';
import { Reveal } from '@/components/reveal';

const PILLAR_ICONS: LucideIcon[] = [Target, Zap, ChartNoAxesCombined];
const VALUE_ICONS: LucideIcon[] = [Sparkles, ArrowRight, Briefcase, Target];

export function MissionVisionCards({
  missionTitle,
  missionBody,
  visionTitle,
  visionBody
}: {
  missionTitle: string;
  missionBody: string;
  visionTitle: string;
  visionBody: string;
}) {
  return (
    <div className="mt-14 grid gap-8 md:grid-cols-2">
      <Reveal delay={0.05}>
        <motion.article
          className="group rounded-3xl bg-[#BC2656] p-8 shadow-md shadow-[#BC2656]/25 md:p-10"
          whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(188, 38, 86, 0.35)' }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-white/90">{missionTitle}</p>
          <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">{missionBody}</p>
        </motion.article>
      </Reveal>
      <Reveal delay={0.1}>
        <motion.article
          className="group rounded-3xl bg-[#5E549D] p-8 shadow-md shadow-[#5E549D]/25 md:p-10"
          whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(94, 84, 157, 0.35)' }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-white/90">{visionTitle}</p>
          <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">{visionBody}</p>
        </motion.article>
      </Reveal>
    </div>
  );
}

export function PillarCard({
  title,
  description,
  color,
  index
}: {
  title: string;
  description: string;
  color: string;
  index: number;
}) {
  const Icon = PILLAR_ICONS[index] ?? Target;

  return (
    <Reveal delay={index * 0.04}>
      <motion.article
        className="group h-full rounded-3xl border border-border/70 bg-white p-7 shadow-sm"
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        variants={{
          rest: { y: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.06)' },
          hover: {
            y: -10,
            boxShadow: `0 16px 36px ${color}33`,
            transition: { type: 'spring', stiffness: 340, damping: 22 }
          }
        }}
      >
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${color}1F`, color }}
          variants={{
            rest: { scale: 1, rotate: 0 },
            hover: { scale: 1.08, rotate: 8, transition: { duration: 0.35 } }
          }}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </motion.div>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-[#BC2656]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">{description}</p>
      </motion.article>
    </Reveal>
  );
}

export function ValueCard({
  title,
  description,
  color,
  index
}: {
  title: string;
  description: string;
  color: string;
  index: number;
}) {
  const Icon = VALUE_ICONS[index] ?? Sparkles;

  return (
    <Reveal delay={index * 0.06} y={20}>
      <motion.article
        className="rounded-3xl border border-border/70 bg-white p-7 shadow-sm"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px', amount: 0.2 }}
        transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{
          y: -8,
          boxShadow: `0 14px 32px ${color}22`,
          transition: { type: 'spring', stiffness: 300, damping: 22 }
        }}
      >
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.08 + 0.05 }}
        >
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${color}1F`, color }}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">{title}</h3>
        </motion.div>
        <motion.p
          className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.08 + 0.12 }}
        >
          {description}
        </motion.p>
      </motion.article>
    </Reveal>
  );
}
