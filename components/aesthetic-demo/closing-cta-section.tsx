'use client';

import { aestheticContainer, aestheticSectionTight } from '@/lib/aesthetic-demo/layout';
import { buildAestheticWhatsAppUrl } from '@/lib/aesthetic-demo/whatsapp';
import { AestheticCtaButton } from '@/components/aesthetic-demo/cta-button';
import { AestheticReveal } from '@/components/aesthetic-demo/motion';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { cn } from '@/lib/utils';

export function AestheticClosingCtaSection() {
  const demo = useAestheticDemo();
  const { closing } = demo.home;
  const whatsappUrl = buildAestheticWhatsAppUrl(demo, 'closing');

  return (
    <section className={cn(aestheticSectionTight, 'bg-demo-primary')}>
      <div className={cn(aestheticContainer, 'max-w-3xl text-center')}>
        <AestheticReveal>
          <h2 className="font-playfair text-2xl font-semibold text-balance text-white sm:text-3xl">{closing.title}</h2>
          <p className="mt-3 text-sm text-white/75 sm:text-base">{closing.subtitle}</p>
          <AestheticCtaButton
            href={whatsappUrl}
            label={closing.cta}
            variant="accent"
            className="mt-6 w-full sm:mt-8 sm:w-auto"
          />
        </AestheticReveal>
      </div>
    </section>
  );
}
