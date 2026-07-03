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
import { SERVICE_GRADIENT, SERVICE_PURPLE, SERVICE_TEAL } from '@/lib/service-brand';
import { SERVICE_DELIVERABLE_ICONS, type ServicePageContent } from '@/lib/service-page';
import type { ServiceSlug } from '@/lib/services';
import { getServiceWhatsAppUrl } from '@/lib/site-config';

const TIERS: PricingTierKey[] = ['pro', 'premium', 'pointers'];

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
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-white px-1 pt-12 sm:pt-14 md:pt-20">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <SectionBadge text={content.badge} variant="purple" />
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
            background: `radial-gradient(circle at 30% 40%, ${SERVICE_PURPLE}33, transparent 55%), radial-gradient(circle at 70% 55%, ${SERVICE_TEAL}24, transparent 55%)`
          }}
        />
      </section>

      {/* 2. Problema y Solución — lado a lado en desktop */}
      <section className="bg-muted/40 py-12 sm:py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow={t('problemSolutionEyebrow')}
              title={t('problemSolutionTitle')}
              subtitle={t('problemSolutionSubtitle')}
            />
          </Reveal>

          <div className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 md:gap-8">
            <Reveal delay={0.05}>
              <article className="mobile-surface h-full rounded-2xl border border-border/60 bg-white p-5 sm:rounded-3xl sm:p-7 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{t('problemLabel')}</p>
                {content.problem.title ? (
                  <h3 className="mt-3 font-display text-xl font-semibold text-gray-900 sm:text-2xl">
                    {content.problem.title}
                  </h3>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:mt-4 md:text-base">
                  {content.problem.body}
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.1}>
              <article
                className="mobile-surface h-full rounded-2xl border border-[#5E549D]/20 p-5 text-white sm:rounded-3xl sm:p-7 md:p-9"
                style={{ backgroundColor: SERVICE_PURPLE }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-white/75">{t('solutionLabel')}</p>
                <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">{content.solution.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/90 sm:mt-4 md:text-base">
                  {content.solution.body}
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Qué incluye */}
      <section className="bg-white py-12 sm:py-16 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow={t('deliverablesEyebrow')}
              title={t('deliverablesTitle')}
              subtitle={t('deliverablesSubtitle')}
            />
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6">
            {content.deliverables.map((item, i) => {
              const Icon = DeliverableIcons[i] ?? DeliverableIcons[0];
              return (
                <Reveal key={item.title} delay={i * 0.05}>
                  <article className="mobile-surface group h-full rounded-2xl border border-border/60 bg-white p-5 transition-all duration-500 ease-in-out active:shadow-md sm:p-6 md:p-7 md:hover:-translate-y-1 md:hover:shadow-lg">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12"
                      style={{ backgroundColor: `${SERVICE_PURPLE}14`, color: SERVICE_PURPLE }}
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

      {/* 4. Planes */}
      <section className="overflow-hidden bg-muted/30 py-12 sm:py-16 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow={t('pricingEyebrow')}
              title={t('pricingTitle')}
              subtitle={t('pricingSubtitle')}
            />
          </Reveal>
          <Reveal delay={0.05}>
            <ServicePricingCarousel
              slug={slug}
              pricing={content.pricing}
              tierMeta={tierMeta}
              ctaLabel={t('pricingCta')}
              customNote={t('customNote')}
            />
          </Reveal>
        </div>
      </section>

      {/* 5. CTA intermedio */}
      <section className="bg-white py-12 sm:py-16 md:py-24">
        <div className="container-page">
          <div
            className={`relative overflow-hidden rounded-2xl px-5 py-12 text-center sm:rounded-3xl sm:px-6 sm:py-16 md:px-10 md:py-20 ${SERVICE_GRADIENT}`}
          >
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

      {/* 6. FAQ */}
      <FaqSection
        sectionId={`faq-${slug}`}
        eyebrow={t('faqEyebrow')}
        title={t('faqTitle')}
        subtitle={t('faqSubtitle')}
        items={content.faq}
      />

      {/* 7. Footer de acción */}
      <section className={`relative overflow-hidden py-12 sm:py-16 md:py-24 ${SERVICE_GRADIENT}`}>
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
