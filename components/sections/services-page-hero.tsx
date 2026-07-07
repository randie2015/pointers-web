'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { WhiteParticlesSection } from '@/components/hero/white-particles-section';
import { SERVICE_PURPLE, SERVICE_TEAL } from '@/lib/service-brand';

export function ServicesPageHero() {
  const t = useTranslations('servicesPage.hero');

  return (
    <WhiteParticlesSection className="pt-14 md:pt-20" particlesId="services-page-hero-particles">
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
              <MaskUpButton href="/contact" label={t('cta')} className="w-full max-w-sm sm:w-auto" />
            </div>
          </div>
        </Reveal>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-72 w-[min(900px,92vw)] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 30% 40%, ${SERVICE_PURPLE}33, transparent 55%), radial-gradient(circle at 70% 55%, ${SERVICE_TEAL}24, transparent 55%)`
        }}
      />
    </WhiteParticlesSection>
  );
}
