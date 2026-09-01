'use client';

import { useState } from 'react';
import {
  keyTreatments,
  treatmentsPage,
  type TreatmentCategory
} from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { cn } from '@/lib/utils';

export function MagrassTreatmentsSection() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>('facial');
  const filtered = keyTreatments.filter((treatment) => treatment.category === activeCategory);

  return (
    <section className="bg-mag-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {treatmentsPage.categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 sm:px-5 sm:text-sm',
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
            <article
              key={treatment.id}
              className="group flex flex-col rounded-2xl border border-mag-border bg-mag-cream/50 p-5 transition duration-300 hover:border-mag-sand hover:shadow-md sm:rounded-3xl sm:p-6"
            >
              <h3 className="font-playfair text-lg font-semibold text-mag-navy sm:text-xl">
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
                className="mt-4 sm:max-w-xs"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
