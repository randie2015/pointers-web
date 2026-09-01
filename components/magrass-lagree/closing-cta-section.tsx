'use client';

import { clinicHome } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { MagrassReveal } from '@/components/magrass-lagree/motion';

export function MagrassClosingCtaSection() {
  const { closing } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl('closing');

  return (
    <section className="bg-mag-navy py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <MagrassReveal>
          <h2 className="font-playfair text-2xl font-semibold text-white sm:text-3xl">{closing.title}</h2>
          <p className="mt-3 text-sm text-white/75 sm:text-base">{closing.subtitle}</p>
          <MagrassCtaButton href={whatsappUrl} label={closing.cta} variant="accent" className="mt-6 sm:mt-8" />
        </MagrassReveal>
      </div>
    </section>
  );
}
