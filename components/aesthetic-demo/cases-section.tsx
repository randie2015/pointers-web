'use client';

import dynamic from 'next/dynamic';
import { aestheticContainer, aestheticSection } from '@/lib/aesthetic-demo/layout';
import { buildAestheticWhatsAppUrl } from '@/lib/aesthetic-demo/whatsapp';
import { AestheticCtaButton } from '@/components/aesthetic-demo/cta-button';
import { aestheticLuxuryCard, AestheticStagger, AestheticStaggerChild } from '@/components/aesthetic-demo/motion';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { cn } from '@/lib/utils';

const AestheticBeforeAfterSlider = dynamic(
  () =>
    import('@/components/aesthetic-demo/before-after-slider').then((m) => ({
      default: m.AestheticBeforeAfterSlider
    })),
  {
    loading: () => (
      <div className="mx-auto mt-8 h-56 w-full max-w-5xl animate-pulse rounded-3xl bg-demo-border sm:mt-10 sm:h-72" />
    )
  }
);

export function AestheticCasesSection() {
  const demo = useAestheticDemo();
  const whatsappUrl = buildAestheticWhatsAppUrl(demo, 'cases');

  return (
    <section className={cn('bg-demo-base', aestheticSection, 'lg:py-24')}>
      <div className={aestheticContainer}>
        <AestheticBeforeAfterSlider />

        <AestheticStagger className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {demo.clinicalCases.map((clinicalCase) => (
            <AestheticStaggerChild key={clinicalCase.id}>
              <article
                className={cn(
                  aestheticLuxuryCard,
                  'flex flex-col rounded-2xl border border-demo-border bg-white p-5 sm:rounded-3xl sm:p-6'
                )}
              >
                <h3 className="font-playfair text-lg font-semibold text-demo-ink sm:text-xl">
                  {clinicalCase.title}
                </h3>
                <div className="mt-3 space-y-2 text-sm text-demo-muted">
                  <p>
                    <span className="font-semibold text-demo-ink">Abordaje:</span> {clinicalCase.approach}
                  </p>
                  <p>
                    <span className="font-semibold text-demo-ink">Evolución:</span> {clinicalCase.duration}
                  </p>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-demo-muted">{clinicalCase.summary}</p>
                <AestheticCtaButton
                  href={whatsappUrl}
                  label={demo.casesPage.cta}
                  variant="secondary"
                  className="mt-4"
                  shimmer={false}
                />
              </article>
            </AestheticStaggerChild>
          ))}
        </AestheticStagger>
      </div>
    </section>
  );
}
