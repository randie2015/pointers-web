'use client';

import { clinicHome } from '@/src/data/magrassData';
import { magrassContainer, magrassSection } from '@/lib/magrass-lagree/layout';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { MagrassReveal, MagrassStagger, MagrassStaggerChild } from '@/components/magrass-lagree/motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MagrassDiagnosis360Section() {
  const { diagnosis360 } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl('diagnosis360');

  return (
    <section className={cn(magrassSection, 'bg-[#192031]')}>
      <div className={magrassContainer}>
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
          <MagrassReveal>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C5A57D] sm:text-xs">
                Método exclusivo
              </p>
              <h2 className="mt-2 font-playfair text-2xl font-semibold text-balance text-white sm:text-3xl lg:text-4xl">
                {diagnosis360.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg">
                {diagnosis360.subtitle}
              </p>
              <MagrassCtaButton
                href={whatsappUrl}
                label={diagnosis360.cta}
                variant="accent"
                className="mt-6 w-full sm:w-auto"
              />
            </div>
          </MagrassReveal>

          <MagrassStagger className="space-y-4">
            {diagnosis360.steps.map((step, index) => (
              <MagrassStaggerChild key={step}>
                <li className="flex list-none gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-500 hover:border-[#C5A880]/30 hover:bg-white/10 sm:gap-4 sm:p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C5A57D] text-xs font-bold text-[#192031]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex min-w-0 gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#197876]" />
                    <p className="text-sm font-medium leading-relaxed text-white/90 sm:text-base">{step}</p>
                  </div>
                </li>
              </MagrassStaggerChild>
            ))}
          </MagrassStagger>
        </div>
      </div>
    </section>
  );
}
