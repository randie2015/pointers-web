'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { ServicePricingCarousel, type PricingTierKey } from '@/components/services/service-pricing-carousel';
import { ServiceProblemSolutionSection } from '@/components/services/service-problem-solution';
import { ServiceDeliverablesSection } from '@/components/services/service-deliverables-section';
import { FaqSection } from '@/components/sections/faq-section';
import { GradientCtaContent, GradientCtaSection } from '@/components/ui/gradient-cta-section';
import { SectionHeader } from '@/components/ui/section-header';
import { SERVICE_PURPLE, SERVICE_TEAL } from '@/lib/service-brand';
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

      {/* 2. Problema vs. Solución */}
      <ServiceProblemSolutionSection
        eyebrow={t('problemSolutionEyebrow')}
        title={t('problemSolutionTitle')}
        subtitle={t('problemSolutionSubtitle')}
        problemLabel={t('problemEyebrow')}
        problemHeading={t('problemTitle')}
        problemTitle={content.problem.title}
        problemBody={content.problem.body}
        solutionLabel={t('solutionLabel')}
        solutionTitle={content.solution.title}
        solutionBody={content.solution.body}
      />

      {/* 3. Lo que recibes */}
      <ServiceDeliverablesSection
        eyebrow={t('deliverablesEyebrow')}
        title={t('deliverablesTitle')}
        subtitle={t('deliverablesSubtitle')}
        items={content.deliverables}
        icons={DeliverableIcons}
      />

      {/* 4. Planes */}
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

      {/* 5. FAQ */}
      <FaqSection
        sectionId={`faq-${slug}`}
        eyebrow={t('faqEyebrow')}
        title={t('faqTitle')}
        subtitle={t('faqSubtitle')}
        items={content.faq}
      />

      {/* 6. CTA final */}
      <GradientCtaSection>
        <Reveal>
          <GradientCtaContent title={content.cta.title} subtitle={content.cta.subtitle}>
            <MaskUpButton href={contactUrl} label={t('heroCta')} className="w-full max-w-sm sm:w-auto" />
          </GradientCtaContent>
        </Reveal>
      </GradientCtaSection>
    </>
  );
}
