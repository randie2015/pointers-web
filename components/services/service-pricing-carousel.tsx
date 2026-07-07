'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
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
  contactUrl,
  interactive
}: {
  tier: PricingTierKey;
  meta: PricingTierMeta;
  plan: PricingTierData;
  ctaLabel: string;
  dualPrice: { usd: string; pen: string } | null;
  contactUrl: string;
  interactive?: boolean;
}) {
  const featured = tier === 'pointers';

  return (
    <article
      aria-label={`${meta.name} — ${dualPrice?.usd ?? plan.price}`}
      style={featured ? { backgroundColor: SERVICE_MAGENTA, borderColor: SERVICE_MAGENTA, boxShadow: `0 10px 40px ${SERVICE_MAGENTA}4d` } : undefined}
      className={cn(
        'relative flex h-full w-full min-w-0 flex-col rounded-2xl border p-5 text-left shadow-sm sm:rounded-3xl sm:p-6 md:p-6 lg:p-7',
        'transition-all duration-500 ease-in-out',
        interactive && 'hover:-translate-y-2 hover:shadow-xl',
        featured
          ? 'text-white shadow-lg'
          : cn(
              'border-border/70 bg-white',
              interactive && 'hover:border-[#5E549D]/40'
            )
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
        <p className={cn('mt-1.5 text-sm sm:mt-2', featured ? 'text-white/75' : 'text-muted-foreground')}>
          {meta.tagline}
        </p>
        <p
          className={cn(
            'mt-3 font-display text-lg font-bold leading-tight tracking-tight sm:mt-4 sm:text-xl md:text-2xl lg:text-[1.65rem]',
            featured ? 'text-white' : 'text-gray-900'
          )}
        >
          {dualPrice?.usd ?? plan.price}
        </p>
        {dualPrice ? (
          <p className={cn('mt-1 text-sm font-medium sm:text-base', featured ? 'text-white/75' : 'text-muted-foreground')}>
            {dualPrice.pen}
          </p>
        ) : null}
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col sm:mt-4">
        {plan.description ? (
          <p className={cn('text-sm leading-relaxed', featured ? 'text-white/85' : 'text-muted-foreground')}>
            {plan.description}
          </p>
        ) : null}

        <ul
          className={cn(
            'flex flex-col gap-2.5 sm:gap-3',
            plan.description ? 'mt-4 sm:mt-5' : 'mt-1'
          )}
        >
          {plan.features.map((feature, index) => (
            <li key={`${tier}-${index}`} className="flex items-start gap-2.5 sm:gap-3">
              <Check
                className={cn('mt-0.5 h-4 w-4 shrink-0', featured ? 'text-white' : 'text-[#39B8AD]')}
                style={featured ? undefined : { color: SERVICE_TEAL }}
                aria-hidden
              />
              <span
                className={cn(
                  'text-xs leading-snug sm:text-sm sm:leading-relaxed',
                  featured ? 'text-white/90' : 'text-gray-700'
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto w-full pt-6 sm:pt-8">
          <MaskUpButton href={contactUrl} label={ctaLabel} className="block w-full sm:inline-block sm:w-auto" />
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
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const dualPriceFor = useCallback(
    (priceString: string) => formatPricingDual(priceString, locale),
    [locale]
  );

  const scrollSlideToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const root = scrollRef.current;
    const slide = slideRefs.current[index];
    if (!root || !slide) return;

    const target = slide.offsetLeft - (root.clientWidth - slide.offsetWidth) / 2;
    root.scrollTo({ left: Math.max(0, target), behavior });
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(TIERS.length - 1, index));
      setActiveIndex(next);
      scrollSlideToIndex(next);
    },
    [scrollSlideToIndex]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % TIERS.length);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + TIERS.length) % TIERS.length);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const syncActiveFromScroll = () => {
      const center = root.scrollLeft + root.clientWidth / 2;
      let closest = activeIndex;
      let minDistance = Number.POSITIVE_INFINITY;

      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(center - slideCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closest = index;
        }
      });

      setActiveIndex(closest);
    };

    root.addEventListener('scroll', syncActiveFromScroll, { passive: true });
    return () => root.removeEventListener('scroll', syncActiveFromScroll);
  }, [activeIndex]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      scrollSlideToIndex(1, 'instant');
    });
    return () => window.cancelAnimationFrame(id);
  }, [scrollSlideToIndex]);

  const swipeHint =
    locale === 'es' ? 'Desliza o usa las flechas para comparar los 3 planes' : 'Swipe or use arrows to compare all 3 plans';
  const planCounter =
    locale === 'es'
      ? `Plan ${activeIndex + 1} de ${TIERS.length}`
      : `Plan ${activeIndex + 1} of ${TIERS.length}`;

  return (
      <div className="mt-8 sm:mt-10 md:mt-14">
      <p className="mb-6 text-center text-xs text-muted-foreground sm:mb-8 sm:text-sm">
        {locale === 'es'
          ? 'Precios base en USD con equivalente en soles (tipo de cambio referencial × 3.4, redondeo a S/ 50).'
          : 'Base prices in USD with PEN equivalent (reference rate × 3.4, rounded to S/ 50).'}
      </p>

      {/* Mobile: slider */}
      <div className="md:hidden">
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="rounded-full bg-[#5E549D]/12 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#5E549D]">
            {planCounter}
          </span>
          <span className="text-xs font-medium text-muted-foreground">· {tierMeta[TIERS[activeIndex]].name}</span>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f6f6f4] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f6f6f4] to-transparent"
          />

          <div
            ref={scrollRef}
            className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Planes de precios"
          >
            {TIERS.map((tier, i) => (
              <div
                key={tier}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className={cn(
                  'w-[min(84vw,360px)] shrink-0 snap-center transition-transform duration-300',
                  i === activeIndex ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-90'
                )}
              >
                <PlanCard
                  tier={tier}
                  meta={tierMeta[tier]}
                  plan={pricing[tier]}
                  ctaLabel={ctaLabel}
                  contactUrl={getContactUrl({ service: slug, plan: tier })}
                  dualPrice={dualPriceFor(pricing[tier].price)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="touch-press flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#5E549D]/30 bg-white text-[#5E549D] shadow-md shadow-[#5E549D]/15 transition active:scale-95"
            aria-label={locale === 'es' ? 'Plan anterior' : 'Previous plan'}
          >
            <ChevronLeft size={22} strokeWidth={2.25} />
          </button>

          <div className="flex flex-1 justify-center gap-2.5" role="tablist" aria-label="Planes">
            {TIERS.map((tier, i) => (
              <button
                key={tier}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                onClick={() => goTo(i)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === activeIndex ? 'h-3 w-9 bg-[#5E549D]' : 'h-3 w-3 bg-[#5E549D]/25'
                )}
                aria-label={tierMeta[tier].name}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="touch-press flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#5E549D]/30 bg-white text-[#5E549D] shadow-md shadow-[#5E549D]/15 transition active:scale-95"
            aria-label={locale === 'es' ? 'Plan siguiente' : 'Next plan'}
          >
            <ChevronRight size={22} strokeWidth={2.25} />
          </button>
        </div>

        <p className="mt-3 text-center text-sm font-medium text-[#5E549D]/80">{swipeHint}</p>
      </div>

      {/* Desktop: three expanded plans */}
      <div className="hidden md:grid md:grid-cols-3 md:items-stretch md:gap-5 lg:gap-8">
        {TIERS.map((tier) => (
          <PlanCard
            key={tier}
            tier={tier}
            meta={tierMeta[tier]}
            plan={pricing[tier]}
            ctaLabel={ctaLabel}
            contactUrl={getContactUrl({ service: slug, plan: tier })}
            dualPrice={dualPriceFor(pricing[tier].price)}
            interactive
          />
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground sm:mt-10 sm:text-sm">{customNote}</p>
    </div>
  );
}
