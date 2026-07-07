'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { getContactUrl } from '@/lib/site-config';
import { AdminAccessIcon } from '@/components/admin/admin-access-icon';

export function Hero() {
  const t = useTranslations('hero');
  const reduced = useReducedMotion();

  return (
    <section id="hero" className="relative z-[1] flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center px-6 py-24 md:px-10">
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-sans text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 drop-shadow-[0_1px_12px_rgba(255,255,255,0.85)] sm:text-5xl md:text-6xl lg:text-[64px]"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700 drop-shadow-[0_1px_10px_rgba(255,255,255,0.8)] md:text-lg"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <MaskUpButton href={getContactUrl()} label={t('cta')} />
        </motion.div>
      </div>

      <AdminAccessIcon />
    </section>
  );
}
