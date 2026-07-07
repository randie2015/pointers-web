'use client';

import { useMemo } from 'react';
import { Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { SERVICE_MAGENTA, SERVICE_TEAL } from '@/lib/service-brand';
import { formatPricingDual } from '@/lib/pricing-currency';
import { getContactUrl, type ServiceWhatsAppSlug } from '@/lib/site-config';
import { cn } from '@/lib/utils';

const TIERS = ['pro', 'premium', 'pointers'] as const;

export type PricingTierKey = (typeof TIERS)[number];

export type PricingTierData = {
  price: string;
  description: string;
  features: string[];
};

export type PricingTierMeta = {
  name: string;
  tagline: string;
};

type ServicePricingCarouselProps = {
  slug: ServiceWhatsAppSlug;
  pricing: Record<PricingTierKey, PricingTierData>;
  tierMeta: Record<PricingTierKey, PricingTierMeta>;
  ctaLabel: string;
  customNote: string;
};

function PlanCard({
  tier,
  meta,
  plan,
  ctaLabel,
  dualPrice,
  contactUrl
}: {
  tier: PricingTierKey;
  meta: PricingTierMeta;
  plan: PricingTierData;
  ctaLabel: string;
  dualPrice: { usd: string; pen: string } | null;
  contactUrl: string;
}) {
  const featured = tier === 'pointers';

  return (
    <article
      aria-label={`${meta.name} — ${dualPrice?.usd ?? plan.price}`}
      style={featured ? { backgroundColor: SERVICE_MAGENTA, borderColor: SERVICE_MAGENTA, boxShadow: `0 10px 40px ${SERVICE_MAGENTA}4d` } : undefined}
      className={cn(
        'relative flex h-full w-full min-w-0 flex-col rounded-2xl border p-6 text-left shadow-sm sm:rounded-3xl sm:p-7 md:p-8',
        'md:transition-all md:duration-300 md:ease-out md:hover:-translate-y-1 md:hover:shadow-lg',
        featured
          ? 'text-white shadow-lg'
          : 'border-border/70 bg-white md:hover:border-[#5E549D]/40'
      )}
    >
      <div>
        <p
          className={cn(
            'text-xs font-semibold uppercase tracking-widest sm:text-sm',
            featured ? 'text-white/90' : 'text-[#5E549D]'
          )}
        >
          {meta.name}
        </p>
        <p className={cn('mt-2 text-sm leading-relaxed sm:text-base', featured ? 'text-white/80' : 'text-muted-foreground')}>
          {meta.tagline}
        </p>
        <p
          className={cn(
            'mt-4 font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl',
            featured ? 'text-white' : 'text-gray-900'
          )}
        >
          {dualPrice?.usd ?? plan.price}
        </p>
        {dualPrice ? (
          <p className={cn('mt-1.5 text-sm font-medium sm:text-base', featured ? 'text-white/80' : 'text-muted-foreground')}>
            {dualPrice.pen}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-1 flex-col sm:mt-6">
        {plan.description ? (
          <p className={cn('text-sm leading-relaxed sm:text-base', featured ? 'text-white/90' : 'text-muted-foreground')}>
            {plan.description}
          </p>
        ) : null}

        <ul className={cn('flex flex-col gap-3', plan.description ? 'mt-5 sm:mt-6' : 'mt-2')}>
          {plan.features.map((feature, index) => (
            <li key={`${tier}-${index}`} className="flex items-start gap-3">
              <Check
                className={cn('mt-0.5 h-4 w-4 shrink-0', featured ? 'text-white' : 'text-[#39B8AD]')}
                style={featured ? undefined : { color: SERVICE_TEAL }}
                aria-hidden
              />
              <span
                className={cn(
                  'text-sm leading-relaxed',
                  featured ? 'text-white/90' : 'text-gray-700'
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto w-full pt-8">
          <MaskUpButton href={contactUrl} label={ctaLabel} className="block w-full" />
        </div>
      </div>
    </article>
  );
}

export function ServicePricingCarousel({
  slug,
  pricing,
  tierMeta,
  ctaLabel,
  customNote
}: ServicePricingCarouselProps) {
  const locale = useLocale() as 'es' | 'en';

  const dualPriceFor = useMemo(
    () => (priceString: string) => formatPricingDual(priceString, locale),
    [locale]
  );

  return (
    <div className="mt-8 sm:mt-10 md:mt-14">
      <p className="mb-8 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {locale === 'es'
          ? 'Precios base en USD con equivalente en soles (tipo de cambio referencial × 3.4, redondeo a S/ 50).'
          : 'Base prices in USD with PEN equivalent (reference rate × 3.4, rounded to S/ 50).'}
      </p>

      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
        {TIERS.map((tier) => (
          <PlanCard
            key={tier}
            tier={tier}
            meta={tierMeta[tier]}
            plan={pricing[tier]}
            ctaLabel={ctaLabel}
            contactUrl={getContactUrl({ service: slug, plan: tier })}
            dualPrice={dualPriceFor(pricing[tier].price)}
          />
        ))}
      </div>

      <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">{customNote}</p>
    </div>
  );
}
