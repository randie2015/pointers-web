'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { bindCenterAttractor, heroParticlesOptions } from '@/lib/hero-particles';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { AdminAccessIcon } from '@/components/admin/admin-access-icon';

const MAGENTA = '#BC2656';

export function Hero() {
  const t = useTranslations('hero');
  const reduced = useReducedMotion();
  const cleanupRef = useRef<(() => void) | null>(null);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    if (!container) return;
    cleanupRef.current?.();
    cleanupRef.current = bindCenterAttractor(container);
  }, []);

  useEffect(() => {
    return () => cleanupRef.current?.();
  }, []);

  const options = useMemo(() => heroParticlesOptions, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f6f6f4] text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {!reduced && (
        <Particles
          id="hero-particles"
          className="absolute inset-0 z-0"
          init={particlesInit}
          loaded={particlesLoaded}
          options={options}
        />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(110vw, 720px)',
          height: 'min(110vw, 720px)',
          backgroundColor: MAGENTA,
          filter: 'blur(180px)',
          opacity: 0.28
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(70vw, 420px)',
          height: 'min(70vw, 420px)',
          backgroundColor: MAGENTA,
          filter: 'blur(80px)',
          opacity: 0.38
        }}
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center px-6 py-24 md:px-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-stretch overflow-hidden rounded-full border border-gray-200/90 bg-white/95 shadow-sm"
        >
          <span className="flex items-center bg-brand px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
            {t('badge')}
          </span>
          <span className="flex items-center px-4 py-2 text-sm text-gray-700">{t('badgeText')}</span>
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-sans text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-[64px]"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <MaskUpButton href="/contact" label={t('cta')} />
        </motion.div>
      </div>

      <AdminAccessIcon />
    </section>
  );
}
