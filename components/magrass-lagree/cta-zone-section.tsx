'use client';

import Link from 'next/link';
import { clinicHome, MAGRASS_BASE } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassReveal } from '@/components/magrass-lagree/motion';

export function MagrassCtaZoneSection() {
  const { ctaZone } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl('evaluateCase');

  return (
    <section aria-labelledby="cta-zone-heading" className="bg-[#FAFAFA] py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
        <MagrassReveal>
          <div className="rounded-3xl border border-gray-200/80 bg-white px-6 py-10 shadow-sm transition-all duration-500 hover:border-[#C5A880]/40 hover:shadow-xl hover:shadow-[#1C2331]/5 sm:px-10 sm:py-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#197876] sm:text-xs">
              {ctaZone.eyebrow}
            </p>
            <h2
              id="cta-zone-heading"
              className="mt-3 font-playfair text-xl font-semibold leading-snug text-[#192031] sm:text-2xl lg:text-[1.65rem]"
            >
              {ctaZone.title}
            </h2>

            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`${MAGRASS_BASE}/casos-clinicos`}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white px-8 py-3.5 text-sm font-medium text-[#192031] shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-[#192031] hover:bg-gray-50 active:scale-[0.98] sm:w-auto"
              >
                {ctaZone.casesCta}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#192031] px-8 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#192031]/90 hover:shadow-lg active:scale-[0.98] sm:w-auto"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative z-10">{ctaZone.whatsappCta}</span>
              </a>
            </div>
          </div>
        </MagrassReveal>
      </div>
    </section>
  );
}
