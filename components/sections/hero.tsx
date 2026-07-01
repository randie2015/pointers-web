'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { bindCenterAttractor, heroParticlesOptions } from '@/lib/hero-particles';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { AdminAccessIcon } from '@/components/admin/admin-access-icon';

const MAGENTA = '#BC2656';

export function Hero() {
  const t = useTranslations('hero');
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
      id="nosotros"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0b] text-center"
    >
      <Particles
        id="hero-particles"
        className="absolute inset-0 z-0"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(110vw, 720px)',
          height: 'min(110vw, 720px)',
          backgroundColor: MAGENTA,
          filter: 'blur(180px)',
          opacity: 0.72
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
          opacity: 0.9
        }}
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center px-6 py-24 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-sans text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[64px]"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <MaskUpButton href="/contact" label={t('cta')} />
        </motion.div>
      </div>

      <AdminAccessIcon />
    </section>
  );
}
