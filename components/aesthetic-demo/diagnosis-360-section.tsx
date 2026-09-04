'use client';

import { aestheticContainer, aestheticSection } from '@/lib/aesthetic-demo/layout';
import { buildAestheticWhatsAppUrl } from '@/lib/aesthetic-demo/whatsapp';
import { AestheticCtaButton } from '@/components/aesthetic-demo/cta-button';
import { AestheticReveal, AestheticStagger, AestheticStaggerChild } from '@/components/aesthetic-demo/motion';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AestheticDiagnosis360Section() {
  const demo = useAestheticDemo();
  const { diagnosis360 } = demo.home;
  const whatsappUrl = buildAestheticWhatsAppUrl(demo, 'diagnosis360');

  return (
    <section className={cn(aestheticSection, 'bg-demo-primary')}>
      <div className={aestheticContainer}>
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
          <AestheticReveal>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-demo-accent sm:text-xs">
                Método exclusivo
              </p>
              <h2 className="mt-2 font-playfair text-2xl font-semibold text-balance text-white sm:text-3xl lg:text-4xl">
                {diagnosis360.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg">
                {diagnosis360.subtitle}
              </p>
              <AestheticCtaButton
                href={whatsappUrl}
                label={diagnosis360.cta}
                variant="accent"
                className="mt-6 w-full sm:w-auto"
              />
            </div>
          </AestheticReveal>

          <AestheticStagger className="space-y-4">
            {diagnosis360.steps.map((step, index) => (
              <AestheticStaggerChild key={step}>
                <li className="flex list-none gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-500 hover:border-demo-accent/30 hover:bg-white/10 sm:gap-4 sm:p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-demo-accent text-xs font-bold text-demo-ink">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex min-w-0 gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-demo-jade" />
                    <p className="text-sm font-medium leading-relaxed text-white/90 sm:text-base">{step}</p>
                  </div>
                </li>
              </AestheticStaggerChild>
            ))}
          </AestheticStagger>
        </div>
      </div>
    </section>
  );
}
