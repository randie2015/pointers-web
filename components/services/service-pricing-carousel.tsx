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

const SWIPE_THRESHOLD = 40;

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
      role={compact && !isActive ? 'button' : 'article'}
      tabIndex={compact && !isActive ? 0 : undefined}
      onClick={compact && !isActive ? onSelect : undefined}
      onKeyDown={(e) => {
        if (!compact || isActive) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={compact ? isActive : undefined}
      aria-label={`${meta.name} — ${plan.price}`}
      className={cn(
        'relative flex w-full min-w-0 flex-col rounded-2xl border p-5 text-left shadow-sm sm:rounded-3xl sm:p-6 md:p-8',
        isActive
          ? 'border-[#BC2656] bg-[#BC2656] text-white shadow-lg shadow-[#BC2656]/25'
          : compact
            ? 'cursor-pointer border-border/70 bg-white active:scale-[0.98]'
            : 'cursor-pointer border-border/70 bg-white hover:border-[#BC2656]/40 hover:shadow-md'
      )}
      animate={{
        scale: isActive ? 1 : compact ? 0.94 : 0.96,
        opacity: isActive ? 1 : compact ? 0.78 : 0.88
      }}
      transition={cardSpring}
      whileTap={compact && !isActive ? { scale: 0.96 } : undefined}
    >
      <div>
        <p
          className={cn(
            'text-xs font-semibold uppercase tracking-widest sm:text-sm',
            isActive ? 'text-white/90' : 'text-[#BC2656]'
          )}
        >
          {meta.name}
        </p>
        <p className={cn('mt-1.5 text-sm sm:mt-2', isActive ? 'text-white/75' : 'text-muted-foreground')}>
          {meta.tagline}
        </p>
        <p className="mt-4 font-display text-2xl font-bold tracking-tight sm:mt-5 sm:text-3xl md:text-4xl">
          {plan.price}
        </p>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key={`details-${tier}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm leading-relaxed text-white/85 sm:mt-4">{plan.description}</p>

            <ul className="mt-5 flex flex-col gap-2 sm:mt-6 sm:gap-2.5">
              {plan.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.22 }}
                  className="flex items-start gap-2 text-sm sm:gap-2.5"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
                  <span className="text-white/90">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 w-full sm:mt-8" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
              <MaskUpButton
                href={whatsappUrl}
                label={ctaLabel}
                className="block w-full sm:inline-block sm:w-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isActive && compact && (
        <p className="mt-3 text-xs font-medium text-[#BC2656] sm:mt-4 sm:text-sm">Toca para ver detalles</p>
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
    <div className="mt-8 sm:mt-10 md:mt-14">
      {/* Mobile + tablet: single plan slider */}
      <div className="lg:hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={handleDragEnd}
          className="touch-pan-y cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={TIERS[activeIndex]}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
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

        <div className="mt-5 flex items-center justify-between gap-2 sm:mt-6 sm:justify-center sm:gap-4">
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

        <p className="mt-3 text-center text-xs text-muted-foreground sm:text-sm">Desliza o usa las flechas para cambiar de plan</p>
      </div>

      {/* Desktop: three cards */}
      <div className="hidden items-stretch justify-center gap-3 lg:flex xl:gap-6">
        {TIERS.map((tier, i) => {
          const isActive = i === activeIndex;

          return (
            <motion.div
              key={tier}
              layout
              className={cn(
                'w-full min-w-0 flex-shrink-0',
                isActive ? 'z-10 max-w-md xl:max-w-lg' : 'z-0 max-w-[220px] xl:max-w-xs'
              )}
              animate={{ y: isActive ? -8 : 0 }}
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

      <p className="mt-8 text-center text-xs text-muted-foreground sm:mt-10 sm:text-sm">{customNote}</p>
    </div>
  );
}
