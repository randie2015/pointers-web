'use client';

import dynamic from 'next/dynamic';
import { aestheticContainer, aestheticSection } from '@/lib/aesthetic-demo/layout';
import { buildAestheticPhoneUrl, buildAestheticWhatsAppUrl } from '@/lib/aesthetic-demo/whatsapp';
import { AestheticCtaButton } from '@/components/aesthetic-demo/cta-button';
import {
  aestheticLuxuryCard,
  AestheticReveal,
  AestheticStagger,
  AestheticStaggerChild
} from '@/components/aesthetic-demo/motion';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { Award, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
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

export function AestheticWhyChooseSection() {
  const demo = useAestheticDemo();
  const { whyChoose } = demo.home;
  const icons = [ShieldCheck, Award, ShieldCheck] as const;

  return (
    <section className={cn('bg-demo-base', aestheticSection)}>
      <div className={aestheticContainer}>
        <AestheticReveal>
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-demo-jade sm:text-xs">
              Autoridad médica
            </p>
            <h2 className="mt-2 font-playfair text-2xl font-semibold text-balance text-demo-ink sm:text-3xl lg:text-4xl">
              {whyChoose.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-demo-muted sm:text-base">{whyChoose.subtitle}</p>
          </div>
        </AestheticReveal>

        <AestheticStagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {whyChoose.points.map((point, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <AestheticStaggerChild key={point.title}>
                <article
                  className={cn(aestheticLuxuryCard, 'rounded-2xl border border-demo-border bg-white p-5 sm:p-6')}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-demo-accent/25 text-demo-jade transition-transform duration-500 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-playfair text-lg font-semibold text-demo-ink">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-demo-muted">{point.description}</p>
                </article>
              </AestheticStaggerChild>
            );
          })}
        </AestheticStagger>
      </div>
    </section>
  );
}

export function AestheticCasesPreviewSection() {
  return (
    <section className={cn('bg-white', aestheticSection)}>
      <div className={aestheticContainer}>
        <AestheticReveal className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-demo-jade sm:text-xs">
            Resultados reales
          </p>
          <h2 className="mt-2 font-playfair text-2xl font-semibold text-demo-ink sm:text-3xl">
            Casos clínicos documentados
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-demo-muted sm:text-base">
            Transformaciones reales bajo seguimiento médico estricto y protocolos personalizados.
          </p>
        </AestheticReveal>

        <AestheticBeforeAfterSlider showHint={false} />
      </div>
    </section>
  );
}

export function AestheticLocationPreviewSection() {
  const demo = useAestheticDemo();
  const { locationPreview } = demo.home;

  return (
    <section className={cn('bg-demo-base', aestheticSection)}>
      <div className={aestheticContainer}>
        <AestheticReveal>
          <div className="mx-auto max-w-3xl rounded-2xl border border-demo-border bg-white p-5 shadow-sm transition-all duration-500 hover:border-demo-accent/40 hover:shadow-xl hover:shadow-demo-primary/5 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-demo-jade sm:text-xs">
              Sede {demo.contact.city}
            </p>
            <h2 className="mt-2 font-playfair text-2xl font-semibold text-demo-ink sm:text-3xl">
              {locationPreview.title}
            </h2>
            <p className="mt-2 text-sm text-demo-muted">{locationPreview.subtitle}</p>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3 text-sm text-demo-muted">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-demo-jade" />
                <div>
                  <p className="font-medium text-demo-ink">{demo.contact.schedule.weekdays}</p>
                  <p>{demo.contact.schedule.saturday}</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-demo-jade" />
                <p className="text-demo-muted">
                  {demo.contact.address} · {demo.contact.city}
                </p>
              </div>
              <div className="flex gap-3 text-sm">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-demo-jade" />
                <a
                  href={buildAestheticPhoneUrl(demo)}
                  className="font-semibold text-demo-ink transition-colors duration-300 hover:text-demo-jade"
                >
                  {demo.contact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row">
              <AestheticCtaButton
                href={`${demo.basePath}/ubicacion`}
                label={locationPreview.cta}
                variant="secondary"
                external={false}
                className="w-full sm:flex-1"
                shimmer={false}
              />
              <AestheticCtaButton
                href={buildAestheticWhatsAppUrl(demo, 'location')}
                label="Solicitar cita en sede"
                className="w-full sm:flex-1"
              />
            </div>
          </div>
        </AestheticReveal>
      </div>
    </section>
  );
}
