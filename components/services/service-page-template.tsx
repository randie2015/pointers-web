'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';
import { SectionHeader } from '@/components/ui/section-header';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { ServicePricingCarousel, type PricingTierKey } from '@/components/services/service-pricing-carousel';
import { FaqSection } from '@/components/sections/faq-section';
import { MobileGradientBg } from '@/components/ui/mobile-gradient-bg';
import { SERVICE_DELIVERABLE_ICONS, type ServicePageContent } from '@/lib/service-page';
import type { ServiceSlug } from '@/lib/services';
import { getServiceWhatsAppUrl } from '@/lib/site-config';

const TIERS: PricingTierKey[] = ['pro', 'premium', 'pointers'];
const MAGENTA = '#BC2656';

type ServicePageTemplateProps = {
  slug: ServiceSlug;
};

export function ServicePageTemplate({ slug }: ServicePageTemplateProps) {
  const t = useTranslations('serviceDetail');
  const content = t.raw(slug) as ServicePageContent;
  const whatsappUrl = getServiceWhatsAppUrl(slug);
  const DeliverableIcons = SERVICE_DELIVERABLE_ICONS[slug];

  const tierMeta = useMemo(
    () =>
      Object.fromEntries(
        TIERS.map((tier) => [tier, t.raw(`tiers.${tier}`) as { name: string; tagline: string }])
      ) as Record<PricingTierKey, { name: string; tagline: string }>,
    [t]
  );

  return (
    <>
      {/* 1. Hero — gancho + CTA WhatsApp */}
      <section className="relative overflow-hidden bg-white px-1 pt-12 sm:pt-14 md:pt-20">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <SectionBadge text={content.badge} />
              <h1 className="h-display mt-4 text-[1.65rem] leading-[1.12] text-gray-900 sm:mt-5 sm:text-3xl md:text-5xl lg:text-6xl">
                {content.title}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base md:mt-5 md:text-lg">
                {content.subtitle}
              </p>
              <div className="mt-7 flex justify-center sm:mt-8">
                <MaskUpButton href={whatsappUrl} label={t('heroCta')} className="w-full max-w-sm sm:w-auto" />
              </div>
            </div>
          </Reveal>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-72 w-[min(900px,92vw)] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 30% 40%, rgba(188,38,86,0.2), transparent 55%), radial-gradient(circle at 70% 55%, rgba(57,184,173,0.14), transparent 55%)'
          }}
        />
      </section>

      {/* 2. El Problema — empatía */}
      <section className="bg-muted/40 py-12 sm:py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeader eyebrow={t('problemEyebrow')} title={t('problemTitle')} />
          </Reveal>
          <Reveal delay={0.05}>
            <blockquote className="mobile-surface mx-auto mt-8 max-w-3xl rounded-2xl border border-border/60 bg-white p-6 text-center sm:mt-10 sm:rounded-3xl sm:p-8 md:p-10">
              <p className="text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl md:leading-relaxed">
                {content.problem.body}
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* 3. La Solución / Qué incluye — valor + entregables */}
      <section className="bg-white py-12 sm:py-16 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow={t('solutionEyebrow')}
              title={content.solution.title}
              subtitle={content.solution.body}
            />
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6">
            {content.deliverables.map((item, i) => {
              const Icon = DeliverableIcons[i] ?? DeliverableIcons[0];
              return (
                <Reveal key={item.title} delay={i * 0.04}>
                  <article className="mobile-surface group h-full rounded-2xl border border-border/60 bg-white p-5 transition-shadow active:shadow-md sm:p-6 md:p-7 md:hover:shadow-lg">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12"
                      style={{ backgroundColor: `${MAGENTA}14`, color: MAGENTA }}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-gray-900 sm:mt-5 sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Planes — carrusel Pro / Premium / Pointers */}
      <section className="overflow-hidden bg-muted/30 py-12 sm:py-16 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow={t('pricingEyebrow')}
              title={t('pricingTitle')}
              subtitle={t('pricingSubtitle')}
            />
          </Reveal>
          <Reveal delay={0.04}>
            <ServicePricingCarousel
              pricing={content.pricing}
              tierMeta={tierMeta}
              whatsappUrl={whatsappUrl}
              ctaLabel={t('pricingCta')}
              customNote={t('customNote')}
            />
          </Reveal>
        </div>
      </section>

      {/* 5. CTA intermedio */}
      <section className="bg-white py-12 sm:py-16 md:py-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#BC2656] to-[#5E549D] px-5 py-12 text-center sm:rounded-3xl sm:px-6 sm:py-16 md:px-10 md:py-20">
            <MobileGradientBg className="opacity-80 mix-blend-soft-light md:hidden" />
            <Reveal>
              <div className="relative z-10 mx-auto max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/80">{t('midCtaEyebrow')}</p>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                  {content.cta.title}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base md:text-lg">
                  {content.cta.subtitle}
                </p>
                <div className="mt-7 flex justify-center sm:mt-8">
                  <MaskUpButton href={whatsappUrl} label={t('heroCta')} className="w-full max-w-sm sm:w-auto" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. FAQ — rompe objeciones */}
      <FaqSection
        sectionId={`faq-${slug}`}
        eyebrow={t('faqEyebrow')}
        title={t('faqTitle')}
        subtitle={t('faqSubtitle')}
        items={content.faq}
      />

      {/* 7. Footer de acción — cierre final */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#BC2656] to-[#5E549D] py-12 sm:py-16 md:py-24">
        <MobileGradientBg className="opacity-70 mix-blend-soft-light md:hidden" />
        <div className="container-page relative z-10">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                {t('closingTitle')}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base md:text-lg">
                {t('closingSubtitle')}
              </p>
              <div className="mt-8 flex justify-center sm:mt-10">
                <MaskUpButton href={whatsappUrl} label={t('heroCta')} className="w-full max-w-sm sm:w-auto" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
