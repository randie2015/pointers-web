'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
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

const SWIPE_THRESHOLD = 48;

const cardSpring = { type: 'spring' as const, stiffness: 340, damping: 32 };

function PlanCard({
  tier,
  meta,
  plan,
  isActive,
  onSelect,
  ctaLabel,
  whatsappUrl,
  compact
}: {
  tier: PricingTierKey;
  meta: PricingTierMeta;
  plan: PricingTierData;
  isActive: boolean;
  onSelect: () => void;
  ctaLabel: string;
  whatsappUrl: string;
  compact?: boolean;
}) {
  return (
    <motion.article
      layout
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={isActive}
      aria-label={`${meta.name} — ${plan.price}`}
      className={cn(
        'relative flex w-full flex-col rounded-3xl border p-6 text-left shadow-sm transition-colors md:p-8',
        isActive
          ? 'cursor-default border-[#BC2656] bg-[#BC2656] text-white shadow-lg shadow-[#BC2656]/25'
          : 'cursor-pointer border-border/70 bg-white hover:border-[#BC2656]/40 hover:shadow-md',
        compact && !isActive && 'md:pointer-events-auto'
      )}
      animate={{
        scale: isActive ? 1 : compact ? 0.92 : 0.94,
        opacity: isActive ? 1 : compact ? 0.72 : 0.85
      }}
      transition={cardSpring}
      whileTap={!isActive ? { scale: 0.96 } : undefined}
    >
      <div>
        <p
          className={cn(
            'text-sm font-semibold uppercase tracking-widest',
            isActive ? 'text-white/90' : 'text-[#BC2656]'
          )}
        >
          {meta.name}
        </p>
        <p className={cn('mt-2 text-sm', isActive ? 'text-white/75' : 'text-muted-foreground')}>
          {meta.tagline}
        </p>
        <p className="mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl">{plan.price}</p>
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key={`details-${tier}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className={cn('mt-4 text-sm leading-relaxed', isActive ? 'text-white/85' : 'text-muted-foreground')}>
              {plan.description}
            </p>

            <ul className="mt-6 flex flex-col gap-2.5">
              {plan.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
                  <span className="text-white/90">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8" onClick={(e) => e.stopPropagation()}>
              <MaskUpButton href={whatsappUrl} label={ctaLabel} tone="brand" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isActive && compact && (
        <p className="mt-4 text-xs font-medium text-[#BC2656] md:text-sm">Clic para ver detalles</p>
      )}
    </motion.article>
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

  const goTo = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(TIERS.length - 1, index)));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % TIERS.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + TIERS.length) % TIERS.length);
  }, []);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goNext();
    else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
  };

  return (
    <div className="mt-14">
      {/* Mobile: single active plan + swipe */}
      <div className="md:hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          className="touch-pan-y"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={TIERS[activeIndex]}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlanCard
                tier={TIERS[activeIndex]}
                meta={tierMeta[TIERS[activeIndex]]}
                plan={pricing[TIERS[activeIndex]]}
                isActive
                onSelect={() => undefined}
                ctaLabel={ctaLabel}
                whatsappUrl={whatsappUrl}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="touch-press flex h-10 w-10 items-center justify-center rounded-full border border-[#BC2656]/20 text-[#BC2656] active:bg-[#BC2656]/10"
            aria-label="Plan anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Planes">
            {TIERS.map((tier, i) => (
              <button
                key={tier}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                onClick={() => goTo(i)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  i === activeIndex ? 'w-8 bg-[#BC2656]' : 'w-2.5 bg-[#BC2656]/25'
                )}
                aria-label={tierMeta[tier].name}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="touch-press flex h-10 w-10 items-center justify-center rounded-full border border-[#BC2656]/20 text-[#BC2656] active:bg-[#BC2656]/10"
            aria-label="Plan siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">Desliza para cambiar de plan</p>
      </div>

      {/* Desktop: three cards, center active with full details */}
      <div className="hidden items-stretch justify-center gap-4 md:flex lg:gap-6">
        {TIERS.map((tier, i) => {
          const isActive = i === activeIndex;
          const offset = i - activeIndex;

          return (
            <motion.div
              key={tier}
              layout
              className={cn(
                'w-full max-w-sm flex-shrink-0',
                isActive ? 'z-10 md:max-w-md lg:max-w-lg' : 'z-0 md:max-w-[240px] lg:max-w-xs'
              )}
              animate={{
                x: offset * 8,
                y: isActive ? -8 : 0
              }}
              transition={cardSpring}
            >
              <PlanCard
                tier={tier}
                meta={tierMeta[tier]}
                plan={pricing[tier]}
                isActive={isActive}
                onSelect={() => goTo(i)}
                ctaLabel={ctaLabel}
                whatsappUrl={whatsappUrl}
                compact={!isActive}
              />
            </motion.div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">{customNote}</p>
    </div>
  );
}
