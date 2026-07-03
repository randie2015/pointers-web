'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { getWhatsAppUrl } from '@/lib/site-config';

export function ServicesPageHero() {
  const t = useTranslations('servicesPage.hero');
  const locale = useLocale() as 'es' | 'en';

  return (
    <section className="relative overflow-hidden bg-white pt-14 md:pt-20">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge text={t('eyebrow')} />
            <h1 className="h-display mt-5 text-3xl leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex justify-center">
              <MaskUpButton href={getWhatsAppUrl(locale)} label={t('cta')} />
            </div>
          </div>
        </Reveal>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-72 w-[min(900px,92vw)] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 30% 40%, rgba(188,38,86,0.22), transparent 55%), radial-gradient(circle at 70% 55%, rgba(57,184,173,0.18), transparent 55%), radial-gradient(circle at 55% 20%, rgba(94,84,157,0.18), transparent 55%)'
        }}
      />
    </section>
  );
}
