'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';
import { SectionHeader } from '@/components/ui/section-header';
import { ServiceSectionBadge } from '@/components/services/service-section-badge';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { ServicePricingCarousel, type PricingTierKey } from '@/components/services/service-pricing-carousel';
import { FaqSection } from '@/components/sections/faq-section';
import { GradientCtaContent, GradientCtaSection } from '@/components/ui/gradient-cta-section';
import { SERVICE_MAGENTA, SERVICE_PURPLE, SERVICE_TEAL } from '@/lib/service-brand';
import { SERVICE_DELIVERABLE_ICONS, type ServicePageContent } from '@/lib/service-page';
import type { ServiceSlug } from '@/lib/services';
import { getContactUrl } from '@/lib/site-config';

const TIERS: PricingTierKey[] = ['pro', 'premium', 'pointers'];

type ServicePageTemplateProps = {
  slug: ServiceSlug;
};

export function ServicePageTemplate({ slug }: ServicePageTemplateProps) {
  const t = useTranslations('serviceDetail');
  const content = t.raw(slug) as ServicePageContent;
  const contactUrl = getContactUrl({ service: slug });
  const DeliverableIcons = SERVICE_DELIVERABLE_ICONS[slug];

  const tierMeta = useMemo(
    () =>
      Object.fromEntries(
        TIERS.map((tier) => {
          const base = t.raw(`tiers.${tier}`) as { name: string; tagline: string };
          const override = content.tiers?.[tier];
          return [tier, { ...base, ...override }];
        })
      ) as Record<PricingTierKey, { name: string; tagline: string }>,
    [t, content.tiers]
  );

  return (
    <>
      {/* 1. Hero */}
      <section className="relative z-[1] overflow-hidden px-1 pt-12 sm:pt-14 md:pt-20">
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
                <MaskUpButton href={contactUrl} label={t('heroCta')} className="w-full max-w-sm sm:w-auto" />
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

      {/* 2. El problema */}
      <section className="relative z-[1] py-14 sm:py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <ServiceSectionBadge label={t('problemEyebrow')} />
              <h2 className="h-display text-2xl text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                {t('problemTitle')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-5 md:text-lg">
                {t('problemSolutionSubtitle')}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <article className="mobile-surface mx-auto mt-8 max-w-3xl rounded-2xl border border-border/60 bg-white p-6 sm:mt-10 sm:rounded-3xl sm:p-8 md:p-10">
              {content.problem.title ? (
                <h3 className="font-display text-xl font-semibold text-gray-900 sm:text-2xl">
                  {content.problem.title}
                </h3>
              ) : null}
              <p
                className={`text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg md:leading-relaxed ${content.problem.title ? 'mt-3 sm:mt-4' : ''}`}
              >
                {content.problem.body}
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* 3. Nuestra solución — magenta sólido (bloque intocable) */}
      <section className="solid-block py-14 sm:py-16 md:py-24" style={{ backgroundColor: SERVICE_MAGENTA }}>
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <ServiceSectionBadge label={t('solutionLabel')} tone="light" />
              <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                {content.solution.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base md:text-lg">
                {content.solution.body}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Qué incluye */}
      <section className="relative z-[1] py-14 sm:py-16 md:py-28">
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
                      style={{ backgroundColor: `${SERVICE_MAGENTA}14`, color: SERVICE_MAGENTA }}
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

      {/* 5. Planes */}
      <section className="relative z-[1] overflow-hidden py-14 sm:py-16 md:py-28">
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

      {/* 6. FAQ */}
      <FaqSection
        sectionId={`faq-${slug}`}
        eyebrow={t('faqEyebrow')}
        title={t('faqTitle')}
        subtitle={t('faqSubtitle')}
        items={content.faq}
      />

      {/* 7. CTA final */}
      <GradientCtaSection>
        <Reveal>
          <GradientCtaContent title={content.cta.title} subtitle={content.cta.subtitle}>
            <MaskUpButton
              href={contactUrl}
              label={t('heroCta')}
              className="w-full max-w-sm sm:w-auto"
            />
          </GradientCtaContent>
        </Reveal>
      </GradientCtaSection>
    </>
  );
}
