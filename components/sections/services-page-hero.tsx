'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { getContactUrl } from '@/lib/site-config';
import { SERVICE_MAGENTA } from '@/lib/service-brand';

export function ServicesPageHero() {
  const t = useTranslations('servicesPage.hero');

  return (
    <section className="relative z-[1] overflow-hidden pt-14 md:pt-20">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge text={t('eyebrow')} />
            <h1 className="h-display mt-5 text-3xl leading-tight text-[#F8FAFC] md:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#94A3B8] md:text-lg">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex justify-center">
              <MaskUpButton href={getContactUrl()} label={t('cta')} className="w-full max-w-sm sm:w-auto" />
            </div>
          </div>
        </Reveal>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-72 w-[min(900px,92vw)] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${SERVICE_MAGENTA}33, transparent 58%)`
        }}
      />
    </section>
  );
}
