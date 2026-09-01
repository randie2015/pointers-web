'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { SectionBadge } from '@/components/ui/section-badge';

export function NotFoundContent() {
  const t = useTranslations('notFound');
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[calc(100dvh-68px)] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center md:min-h-[calc(100dvh-76px)] md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="font-sans text-[clamp(7rem,26vw,16rem)] font-bold leading-none tracking-tightest text-brand/[0.08]">
          404
        </span>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-w-2xl flex-col items-center"
      >
        <SectionBadge text={t('badge')} variant="brand" size="compact" />

        <h1 className="mt-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          {t('title')}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">{t('description')}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MaskUpButton href="/" label={t('homeCta')} />
          <Link
            href="/servicios"
            className="touch-press inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-900 px-6 text-sm font-semibold text-gray-900 transition-colors duration-300 hover:bg-gray-900 hover:text-white"
          >
            {t('servicesCta')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
