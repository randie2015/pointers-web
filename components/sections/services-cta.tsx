'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';
import { MaskUpButton } from '@/components/ui/mask-up-button';

export function ServicesCta() {
  const t = useTranslations('servicesPage.cta');
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, rgba(94, 84, 157, 0.8) 0%, transparent 50%)`;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl bg-[#BC2656] px-6 py-20 text-center"
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          onMouseMove={(e) => {
            if (reduced) return;
            const rect = cardRef.current?.getBoundingClientRect();
            if (!rect) return;
            x.set(e.clientX - rect.left);
            y.set(e.clientY - rect.top);
          }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ background }}
            initial={false}
            animate={{ opacity: active && !reduced ? 1 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">{t('title')}</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">{t('subtitle')}</p>
            <div className="mt-8 flex justify-center">
              <MaskUpButton href="/contact" label={t('button')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
