'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { clinicContact, clinicHome, MAGRASS_BASE } from '@/src/data/magrassData';
import { buildPhoneUrl, buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { magrassContainer, magrassSection } from '@/lib/magrass-lagree/layout';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { magrassLuxuryCard, MagrassReveal, MagrassStagger, MagrassStaggerChild } from '@/components/magrass-lagree/motion';
import { Award, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const MagrassBeforeAfterSlider = dynamic(
  () =>
    import('@/components/magrass-lagree/before-after-slider').then((m) => ({
      default: m.MagrassBeforeAfterSlider
    })),
  {
    loading: () => (
      <div className="mx-auto mt-8 h-56 w-full max-w-5xl animate-pulse rounded-3xl bg-mag-border sm:mt-10 sm:h-72" />
    )
  }
);

export function MagrassWhyChooseSection() {
  const { whyChoose } = clinicHome;
  const icons = [ShieldCheck, Award, ShieldCheck] as const;

  return (
    <section className={cn('bg-[#FAFAFA]', magrassSection)}>
      <div className={magrassContainer}>
        <MagrassReveal>
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#197876] sm:text-xs">
              Autoridad médica
            </p>
            <h2 className="mt-2 font-playfair text-2xl font-semibold text-balance text-[#192031] sm:text-3xl lg:text-4xl">
              {whyChoose.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mag-muted sm:text-base">{whyChoose.subtitle}</p>
          </div>
        </MagrassReveal>

        <MagrassStagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {whyChoose.points.map((point, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <MagrassStaggerChild key={point.title}>
                <article
                  className={cn(
                    magrassLuxuryCard,
                    'rounded-2xl border border-mag-border bg-white p-5 sm:p-6'
                  )}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C5A57D]/25 text-[#197876] transition-transform duration-500 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-playfair text-lg font-semibold text-[#192031]">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mag-muted">{point.description}</p>
                </article>
              </MagrassStaggerChild>
            );
          })}
        </MagrassStagger>
      </div>
    </section>
  );
}

export function MagrassCasesPreviewSection() {
  return (
    <section className={cn('bg-white', magrassSection)}>
      <div className={magrassContainer}>
        <MagrassReveal className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#197876] sm:text-xs">
            Resultados reales
          </p>
          <h2 className="mt-2 font-playfair text-2xl font-semibold text-[#192031] sm:text-3xl">
            Casos clínicos documentados
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-mag-muted sm:text-base">
            Transformaciones reales bajo seguimiento médico estricto y protocolos personalizados.
          </p>
        </MagrassReveal>

        <MagrassBeforeAfterSlider showHint={false} />
      </div>
    </section>
  );
}

export function MagrassLocationPreviewSection() {
  const { locationPreview } = clinicHome;

  return (
    <section className={cn('bg-[#FAFAFA]', magrassSection)}>
      <div className={magrassContainer}>
        <MagrassReveal>
          <div className="mx-auto max-w-3xl rounded-2xl border border-mag-border bg-white p-5 shadow-sm transition-all duration-500 hover:border-[#C5A880]/40 hover:shadow-xl hover:shadow-[#1C2331]/5 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#197876] sm:text-xs">
              Sede Arequipa
            </p>
            <h2 className="mt-2 font-playfair text-2xl font-semibold text-[#192031] sm:text-3xl">
              {locationPreview.title}
            </h2>
            <p className="mt-2 text-sm text-mag-muted">{locationPreview.subtitle}</p>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3 text-sm text-mag-muted">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#197876]" />
                <div>
                  <p className="font-medium text-[#192031]">{clinicContact.schedule.weekdays}</p>
                  <p>{clinicContact.schedule.saturday}</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#197876]" />
                <p className="text-mag-muted">
                  {clinicContact.address} · {clinicContact.city}
                </p>
              </div>
              <div className="flex gap-3 text-sm">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#197876]" />
                <a
                  href={buildPhoneUrl()}
                  className="font-semibold text-[#192031] transition-colors duration-300 hover:text-[#197876]"
                >
                  {clinicContact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row">
              <MagrassCtaButton
                href={`${MAGRASS_BASE}/ubicacion`}
                label={locationPreview.cta}
                variant="secondary"
                external={false}
                className="w-full sm:flex-1"
                shimmer={false}
              />
              <MagrassCtaButton
                href={buildWhatsAppUrl('location')}
                label="Solicitar cita en sede"
                className="w-full sm:flex-1"
              />
            </div>
          </div>
        </MagrassReveal>
      </div>
    </section>
  );
}
