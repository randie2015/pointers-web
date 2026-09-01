'use client';

import { clinicHome } from '@/src/data/magrassData';
import { magrassContainer, magrassSectionTight } from '@/lib/magrass-lagree/layout';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { MagrassReveal } from '@/components/magrass-lagree/motion';
import { cn } from '@/lib/utils';

export function MagrassClosingCtaSection() {
  const { closing } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl('closing');

  return (
    <section className={cn(magrassSectionTight, 'bg-mag-navy')}>
      <div className={cn(magrassContainer, 'max-w-3xl text-center')}>
        <MagrassReveal>
          <h2 className="font-playfair text-2xl font-semibold text-balance text-white sm:text-3xl">{closing.title}</h2>
          <p className="mt-3 text-sm text-white/75 sm:text-base">{closing.subtitle}</p>
          <MagrassCtaButton
            href={whatsappUrl}
            label={closing.cta}
            variant="accent"
            className="mt-6 w-full sm:mt-8 sm:w-auto"
          />
        </MagrassReveal>
      </div>
    </section>
  );
}
