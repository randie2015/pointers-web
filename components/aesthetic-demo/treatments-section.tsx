'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { AestheticTreatmentCategory } from '@/lib/clinic-demo/types';
import { aestheticContainer, aestheticSection } from '@/lib/aesthetic-demo/layout';
import { buildAestheticWhatsAppUrl } from '@/lib/aesthetic-demo/whatsapp';
import { AestheticCtaButton } from '@/components/aesthetic-demo/cta-button';
import { AestheticReveal, aestheticImageZoom, aestheticLuxuryCard } from '@/components/aesthetic-demo/motion';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { cn } from '@/lib/utils';

function scrollToAnchor(anchor: string) {
  const element = document.getElementById(anchor);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function AestheticTreatmentsSection() {
  const demo = useAestheticDemo();
  const categories = demo.treatmentsPage.categories;
  const [activeCategory, setActiveCategory] = useState<AestheticTreatmentCategory>(
    categories[0]?.id ?? 'facial'
  );
  const filtered = demo.treatments.filter((treatment) => treatment.category === activeCategory);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const treatment = demo.treatments.find((item) => item.anchor === hash);
    if (!treatment) return;

    setActiveCategory(treatment.category);

    const timer = window.setTimeout(() => scrollToAnchor(hash), 120);
    return () => window.clearTimeout(timer);
  }, [demo.treatments]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      const treatment = demo.treatments.find((item) => item.anchor === hash);
      if (!treatment) return;

      setActiveCategory(treatment.category);
      window.setTimeout(() => scrollToAnchor(hash), 120);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [demo.treatments]);

  return (
    <section className={cn('bg-white', aestheticSection, 'lg:py-24')}>
      <div className={aestheticContainer}>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 sm:px-5 sm:text-sm',
                activeCategory === category.id
                  ? 'border-demo-primary bg-demo-primary text-white'
                  : 'border-demo-border bg-demo-base text-demo-ink hover:border-demo-accent'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filtered.map((treatment) => (
            <AestheticReveal key={treatment.id}>
              <article
                id={treatment.anchor}
                className={cn(
                  aestheticLuxuryCard,
                  'scroll-mt-24 flex flex-col overflow-hidden rounded-2xl border border-demo-border bg-white shadow-sm sm:scroll-mt-28 sm:rounded-3xl'
                )}
              >
                {treatment.image ? (
                  <div className="relative h-44 overflow-hidden sm:h-48">
                    <Image
                      src={treatment.image}
                      alt={treatment.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={cn('object-cover', aestheticImageZoom)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-demo-primary/75 via-demo-primary/20 to-transparent" />
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-playfair text-lg font-semibold text-balance text-demo-ink sm:text-xl">
                    {treatment.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-demo-muted">{treatment.description}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-demo-jade">
                    Resultados esperados
                  </p>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-demo-ink/80">
                    {treatment.expectedResults}
                  </p>
                  <AestheticCtaButton
                    href={buildAestheticWhatsAppUrl(demo, { type: 'treatment', name: treatment.title })}
                    label="Consultar este Tratamiento"
                    variant="secondary"
                    className="mt-4 w-full sm:max-w-xs"
                    shimmer={false}
                  />
                </div>
              </article>
            </AestheticReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
