'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { MaskUpButton } from '@/components/ui/mask-up-button';
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
  pricing: Record<PricingTierKey, PricingTierData>;
  tierMeta: Record<PricingTierKey, PricingTierMeta>;
  whatsappUrl: string;
  ctaLabel: string;
  customNote: string;
};

function PlanCard({
  tier,
  meta,
  plan,
  ctaLabel,
  whatsappUrl
}: {
  tier: PricingTierKey;
  meta: PricingTierMeta;
  plan: PricingTierData;
  ctaLabel: string;
  whatsappUrl: string;
}) {
  const featured = tier === 'pointers';

  return (
    <article
      aria-label={`${meta.name} — ${plan.price}`}
      className={cn(
        'relative flex h-full w-full min-w-0 flex-col rounded-2xl border p-5 text-left shadow-sm sm:rounded-3xl sm:p-6 md:p-8',
        featured
          ? 'border-[#BC2656] bg-[#BC2656] text-white shadow-lg shadow-[#BC2656]/25'
          : 'border-border/70 bg-white'
      )}
    >
      <div>
        <p
          className={cn(
            'text-xs font-semibold uppercase tracking-widest sm:text-sm',
            featured ? 'text-white/90' : 'text-[#BC2656]'
          )}
        >
          {meta.name}
        </p>
        <p className={cn('mt-1.5 text-sm sm:mt-2', featured ? 'text-white/75' : 'text-muted-foreground')}>
          {meta.tagline}
        </p>
        <p
          className={cn(
            'mt-4 font-display text-2xl font-bold tracking-tight sm:mt-5 sm:text-3xl md:text-4xl',
            featured ? 'text-white' : 'text-gray-900'
          )}
        >
          {plan.price}
        </p>
      </div>

      <div className="mt-3 flex flex-1 flex-col sm:mt-4">
        <p className={cn('text-sm leading-relaxed', featured ? 'text-white/85' : 'text-muted-foreground')}>
          {plan.description}
        </p>

        <ul className="mt-5 flex flex-col gap-2 sm:mt-6 sm:gap-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm sm:gap-2.5">
              <Check
                className={cn('mt-0.5 h-4 w-4 shrink-0', featured ? 'text-white' : 'text-[#39B8AD]')}
                aria-hidden
              />
              <span className={featured ? 'text-white/90' : 'text-gray-700'}>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 w-full sm:mt-8">
          <MaskUpButton href={whatsappUrl} label={ctaLabel} className="block w-full sm:inline-block sm:w-auto" />
        </div>
      </div>
    </article>
  );
}

export function ServicePricingCarousel({
  pricing,
  tierMeta,
  whatsappUrl,
  ctaLabel,
  customNote
}: ServicePricingCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(TIERS.length - 1, index));
    setActiveIndex(next);
    slideRefs.current[next]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, []);

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
    const slide = slideRefs.current[1];
    if (!slide) return;

    const id = window.requestAnimationFrame(() => {
      slide.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
    });

    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div className="mt-8 sm:mt-10 md:mt-14">
      {/* Mobile: horizontal carousel */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Planes de precios"
        >
          {TIERS.map((tier, i) => (
            <div
              key={tier}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="w-[min(88vw,360px)] shrink-0 snap-center"
            >
              <PlanCard
                tier={tier}
                meta={tierMeta[tier]}
                plan={pricing[tier]}
                ctaLabel={ctaLabel}
                whatsappUrl={whatsappUrl}
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-2 sm:justify-center sm:gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="touch-press flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#BC2656]/25 text-[#BC2656] active:bg-[#BC2656]/10"
            aria-label="Plan anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex flex-1 justify-center gap-2 sm:flex-none" role="tablist" aria-label="Planes">
            {TIERS.map((tier, i) => (
              <button
                key={tier}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                onClick={() => goTo(i)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  i === activeIndex ? 'w-8 bg-[#BC2656]' : 'w-2.5 bg-[#BC2656]/30'
                )}
                aria-label={tierMeta[tier].name}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="touch-press flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#BC2656]/25 text-[#BC2656] active:bg-[#BC2656]/10"
            aria-label="Plan siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground sm:text-sm">
          Desliza horizontalmente para ver los 3 planes
        </p>
      </div>

      {/* Desktop: three plans side by side */}
      <div className="hidden md:grid md:grid-cols-3 md:items-stretch md:gap-5 lg:gap-8">
        {TIERS.map((tier) => (
          <PlanCard
            key={tier}
            tier={tier}
            meta={tierMeta[tier]}
            plan={pricing[tier]}
            ctaLabel={ctaLabel}
            whatsappUrl={whatsappUrl}
          />
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground sm:mt-10 sm:text-sm">{customNote}</p>
    </div>
  );
}
