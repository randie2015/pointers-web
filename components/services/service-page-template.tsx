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
      <section className="relative overflow-hidden bg-white pt-14 md:pt-20">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <SectionBadge text={content.badge} />
              <h1 className="h-display mt-5 text-3xl leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                {content.title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                {content.subtitle}
              </p>
              <div className="mt-8 flex justify-center">
                <MaskUpButton href={whatsappUrl} label={t('heroCta')} tone="brand" />
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
      <section className="bg-muted/40 py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow={t('problemSolutionEyebrow')}
              title={t('problemSolutionTitle')}
              subtitle={t('problemSolutionSubtitle')}
            />
          </Reveal>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <Reveal delay={0.04}>
              <article className="mobile-surface h-full rounded-3xl border border-border/60 bg-white p-7 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {t('problemLabel')}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-gray-900">{content.problem.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">{content.problem.body}</p>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="mobile-surface h-full rounded-3xl border border-[#BC2656]/20 bg-[#BC2656] p-7 text-white md:p-9">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/75">{t('solutionLabel')}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold">{content.solution.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">{content.solution.body}</p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 hidden lg:block">
              <ServiceVisual variant={variant} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Entregables */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow={t('deliverablesEyebrow')}
              title={t('deliverablesTitle')}
              subtitle={t('deliverablesSubtitle')}
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.deliverables.map((item, i) => {
              const Icon = DeliverableIcons[i] ?? DeliverableIcons[0];
              return (
                <Reveal key={item.title} delay={i * 0.05}>
                  <article className="mobile-surface group h-full rounded-2xl border border-border/60 bg-white p-6 transition-shadow hover:shadow-lg md:p-7">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: `${MAGENTA}14`, color: MAGENTA }}
                    >
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Planes (carrusel) */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow={t('pricingEyebrow')}
              title={t('pricingTitle')}
              subtitle={t('pricingSubtitle')}
            />
          </Reveal>
          <Reveal delay={0.06}>
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
      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-[#BC2656] px-6 py-16 text-center max-md:bg-transparent md:px-10 md:py-20">
            <MobileGradientBg />
            <Reveal>
              <div className="relative z-10 mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                  {content.cta.title}
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                  {content.cta.subtitle}
                </p>
                <div className="mt-8 flex justify-center">
                  <MaskUpButton href={whatsappUrl} label={t('heroCta')} />
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
