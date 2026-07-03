'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';
import { SectionHeader } from '@/components/ui/section-header';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { ServicePricingCarousel, type PricingTierKey } from '@/components/services/service-pricing-carousel';
import { ServiceVisual } from '@/components/sections/service-visual';
import { FaqSection } from '@/components/sections/faq-section';
import { MobileGradientBg } from '@/components/ui/mobile-gradient-bg';
import { SERVICE_DELIVERABLE_ICONS, type ServicePageContent } from '@/lib/service-page';
import { serviceSlugToVariant, type ServiceSlug } from '@/lib/services';
import { getServiceWhatsAppUrl } from '@/lib/site-config';

const TIERS: PricingTierKey[] = ['pro', 'premium', 'pointers'];
const MAGENTA = '#BC2656';

type ServicePageTemplateProps = {
  slug: ServiceSlug;
};

export function ServicePageTemplate({ slug }: ServicePageTemplateProps) {
  const t = useTranslations('serviceDetail');
  const content = t.raw(slug) as ServicePageContent;
  const variant = serviceSlugToVariant(slug);
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
              <SectionBadge text={content.badge} />
              <h1 className="h-display mt-4 text-[1.65rem] leading-[1.12] text-gray-900 sm:mt-5 sm:text-3xl md:text-5xl lg:text-6xl">
                {content.title}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base md:mt-5 md:text-lg">
                {content.subtitle}
              </p>
              <div className="mt-7 flex justify-center sm:mt-8">
                <MaskUpButton
                  href={whatsappUrl}
                  label={t('heroCta')}
                  tone="brand"
                  className="w-full max-w-sm sm:w-auto"
                />
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

      {/* 2. Problema / Solución */}
      <section className="bg-muted/40 py-12 sm:py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow={t('problemSolutionEyebrow')}
              title={t('problemSolutionTitle')}
              subtitle={t('problemSolutionSubtitle')}
            />
          </Reveal>

          <div className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2 lg:gap-12">
            <Reveal delay={0.04}>
              <article className="mobile-surface h-full rounded-2xl border border-border/60 bg-white p-5 sm:rounded-3xl sm:p-7 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {t('problemLabel')}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-gray-900 sm:text-2xl">
                  {content.problem.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:mt-4 md:text-base">
                  {content.problem.body}
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.06}>
              <article className="mobile-surface h-full rounded-2xl border border-[#BC2656]/20 bg-[#BC2656] p-5 text-white sm:rounded-3xl sm:p-7 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/75">{t('solutionLabel')}</p>
                <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">{content.solution.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/90 sm:mt-4 md:text-base">{content.solution.body}</p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="mt-8 sm:mt-10 lg:mt-12">
              <ServiceVisual variant={variant} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Entregables */}
      <section className="bg-white py-12 sm:py-16 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow={t('deliverablesEyebrow')}
              title={t('deliverablesTitle')}
              subtitle={t('deliverablesSubtitle')}
            />
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-1 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6">
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

      {/* 4. Planes (carrusel) */}
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

      {/* 5. CTA */}
      <section className="bg-white py-12 sm:py-16 md:py-28">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#BC2656] to-[#5E549D] px-5 py-12 text-center sm:rounded-3xl sm:px-6 sm:py-16 md:px-10 md:py-20">
            <MobileGradientBg className="opacity-80 mix-blend-soft-light md:hidden" />
            <Reveal>
              <div className="relative z-10 mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
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
    </>
  );
}
