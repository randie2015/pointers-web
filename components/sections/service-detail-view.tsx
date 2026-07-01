'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';
import { SectionHeader } from '@/components/ui/section-header';
import { ServiceVisual } from '@/components/sections/service-visual';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { serviceSlugToVariant, type ServiceSlug } from '@/lib/services';
import { cn } from '@/lib/utils';

const TIERS = ['pro', 'premium', 'pointers'] as const;

type TierKey = (typeof TIERS)[number];

type TierData = {
  price: string;
  description: string;
  features: string[];
};

type ServiceData = {
  badge: string;
  title: string;
  subtitle: string;
  overview: string[];
  highlights: string[];
  pricing: Record<TierKey, TierData>;
};

export function ServiceDetailView({ slug }: { slug: ServiceSlug }) {
  const t = useTranslations('serviceDetail');
  const service = t.raw(slug) as ServiceData;
  const variant = serviceSlugToVariant(slug);

  return (
    <>
      <section className="relative overflow-hidden bg-white pt-14 md:pt-20">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <SectionBadge text={service.badge} />
              <h1 className="h-display mt-5 text-3xl leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                {service.subtitle}
              </p>
            </div>
          </Reveal>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-72 w-[min(900px,92vw)] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 30% 40%, rgba(188,38,86,0.18), transparent 55%), radial-gradient(circle at 70% 55%, rgba(57,184,173,0.14), transparent 55%)'
          }}
        />
      </section>

      <section className="bg-muted/40 py-16 md:py-24">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {service.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-8 space-y-3">
                {service.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground md:text-base">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#39B8AD]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <ServiceVisual variant={variant} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow={t('pricingEyebrow')}
              title={t('pricingTitle')}
              subtitle={t('pricingSubtitle')}
            />
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {TIERS.map((tier, i) => {
              const tierMeta = t.raw(`tiers.${tier}`) as { name: string; tagline: string };
              const plan = service.pricing[tier];
              const featured = tier === 'pointers';

              return (
                <Reveal key={tier} delay={i * 0.06}>
                  <article
                    className={cn(
                      'flex h-full flex-col rounded-3xl border p-8 shadow-sm transition-shadow hover:shadow-lg md:p-9',
                      featured
                        ? 'border-[#BC2656] bg-[#BC2656] text-white shadow-md shadow-[#BC2656]/20'
                        : 'border-border/70 bg-white'
                    )}
                  >
                    <div>
                      <p
                        className={cn(
                          'text-sm font-semibold uppercase tracking-widest',
                          featured ? 'text-white/80' : 'text-[#BC2656]'
                        )}
                      >
                        {tierMeta.name}
                      </p>
                      <p
                        className={cn(
                          'mt-2 text-sm',
                          featured ? 'text-white/75' : 'text-muted-foreground'
                        )}
                      >
                        {tierMeta.tagline}
                      </p>
                      <p className="mt-6 font-display text-4xl font-bold tracking-tight">{plan.price}</p>
                      <p
                        className={cn(
                          'mt-3 text-sm leading-relaxed',
                          featured ? 'text-white/80' : 'text-muted-foreground'
                        )}
                      >
                        {plan.description}
                      </p>
                    </div>

                    <ul className="mt-8 flex flex-1 flex-col gap-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check
                            className={cn(
                              'mt-0.5 h-4 w-4 shrink-0',
                              featured ? 'text-white' : 'text-[#39B8AD]'
                            )}
                            aria-hidden
                          />
                          <span className={featured ? 'text-white/90' : 'text-gray-700'}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <MaskUpButton href="/contact" label={t('pricingCta')} />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">{t('customNote')}</p>
        </div>
      </section>
    </>
  );
}
