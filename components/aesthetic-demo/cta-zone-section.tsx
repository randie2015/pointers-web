'use client';

import Link from 'next/link';
import { aestheticContainer, aestheticSectionTight } from '@/lib/aesthetic-demo/layout';
import { buildAestheticWhatsAppUrl } from '@/lib/aesthetic-demo/whatsapp';
import { AestheticReveal } from '@/components/aesthetic-demo/motion';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { cn } from '@/lib/utils';

export function AestheticCtaZoneSection() {
  const demo = useAestheticDemo();
  const { ctaZone } = demo.home;
  const whatsappUrl = buildAestheticWhatsAppUrl(demo, 'evaluateCase');

  return (
    <section aria-labelledby="cta-zone-heading" className={cn('bg-demo-base', aestheticSectionTight)}>
      <div className={cn(aestheticContainer, 'max-w-3xl text-center')}>
        <AestheticReveal>
          <div className="rounded-2xl border border-gray-200/80 bg-white px-5 py-8 shadow-sm transition-all duration-500 hover:border-demo-accent/40 hover:shadow-xl hover:shadow-demo-primary/5 sm:rounded-3xl sm:px-10 sm:py-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-demo-jade sm:text-xs">
              {ctaZone.eyebrow}
            </p>
            <h2
              id="cta-zone-heading"
              className="mt-3 font-playfair text-xl font-semibold leading-snug text-demo-ink sm:text-2xl lg:text-[1.65rem]"
            >
              {ctaZone.title}
            </h2>

            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={`${demo.basePath}/casos-clinicos`}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white px-6 py-3.5 text-sm font-medium text-demo-ink shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-demo-primary hover:bg-gray-50 active:scale-[0.98] sm:w-auto sm:px-8"
              >
                {ctaZone.casesCta}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-demo-primary px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-demo-primary/90 hover:shadow-lg active:scale-[0.98] sm:w-auto sm:px-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative z-10">{ctaZone.whatsappCta}</span>
              </a>
            </div>
          </div>
        </AestheticReveal>
      </div>
    </section>
  );
}
