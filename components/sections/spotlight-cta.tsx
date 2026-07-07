'use client';

import { useTranslations } from 'next-intl';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { MobileGradientBg } from '@/components/ui/mobile-gradient-bg';
import { SERVICE_GRADIENT } from '@/lib/service-brand';

export function SpotlightCTA() {
  const t = useTranslations('aboutPage.cta');

  return (
    <section className={`relative overflow-hidden py-20 md:py-28 ${SERVICE_GRADIENT}`}>
      <MobileGradientBg />
      <div className="container-page relative z-10">
        <div className="relative overflow-hidden rounded-3xl px-6 py-16 text-center md:px-8 md:py-20">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">{t('title')}</h2>
            <p className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg">{t('subtitle')}</p>
            <div className="mt-8 flex justify-center">
              <MaskUpButton href="/contact" label={t('button')} className="w-full max-w-sm sm:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
