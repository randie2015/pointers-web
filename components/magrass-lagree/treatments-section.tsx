'use client';

import { useEffect, useState } from 'react';
import {
  keyTreatments,
  treatmentsPage,
  type TreatmentCategory
} from '@/src/data/magrassData';
import { magrassContainer, magrassSection } from '@/lib/magrass-lagree/layout';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { MagrassReveal, magrassLuxuryCard } from '@/components/magrass-lagree/motion';
import { cn } from '@/lib/utils';

function scrollToAnchor(anchor: string) {
  const element = document.getElementById(anchor);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function MagrassTreatmentsSection() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>('facial');
  const filtered = keyTreatments.filter((treatment) => treatment.category === activeCategory);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const treatment = keyTreatments.find((item) => item.anchor === hash);
    if (!treatment) return;

    setActiveCategory(treatment.category);

    const timer = window.setTimeout(() => scrollToAnchor(hash), 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      const treatment = keyTreatments.find((item) => item.anchor === hash);
      if (!treatment) return;

      setActiveCategory(treatment.category);
      window.setTimeout(() => scrollToAnchor(hash), 120);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <section className={cn('bg-mag-white', magrassSection, 'lg:py-24')}>
      <div className={magrassContainer}>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {treatmentsPage.categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 sm:px-5 sm:text-sm',
                activeCategory === category.id
                  ? 'border-mag-navy bg-mag-navy text-mag-white'
                  : 'border-mag-border bg-mag-cream text-mag-navy hover:border-mag-sand'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filtered.map((treatment) => (
            <MagrassReveal key={treatment.id}>
              <article
                id={treatment.anchor}
                className={cn(
                  magrassLuxuryCard,
                  'scroll-mt-24 flex flex-col rounded-2xl border border-mag-border bg-mag-cream/50 p-5 sm:scroll-mt-28 sm:rounded-3xl sm:p-6'
                )}
              >
              <h3 className="font-playfair text-lg font-semibold text-balance text-mag-navy sm:text-xl">
                {treatment.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mag-muted">{treatment.description}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-mag-jade">
                Resultados esperados
              </p>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-mag-navy/80">
                {treatment.expectedResults}
              </p>
              <MagrassCtaButton
                href={buildWhatsAppUrl({ type: 'treatment', name: treatment.title })}
                label="Consultar este Tratamiento"
                variant="secondary"
                className="mt-4 w-full sm:max-w-xs"
                shimmer={false}
              />
            </article>
            </MagrassReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
