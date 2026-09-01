import Link from 'next/link';
import { clinicHome, MAGRASS_BASE } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { HeartPulse, Microscope, ShieldCheck } from 'lucide-react';

const pillarIcons = [Microscope, ShieldCheck, HeartPulse] as const;

export function MagrassHeroSection() {
  const { hero } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl('home');

  return (
    <section className="relative overflow-hidden bg-mag-white lg:min-h-[85vh]">
      <div
        className="absolute inset-0 bg-[url('/magrass-lagree/hero-poster.webp')] bg-cover bg-center opacity-[0.07]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 lg:min-h-[85vh] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-mag-sand/60 bg-mag-cream px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-mag-jade sm:px-4 sm:text-xs">
            {hero.badge}
          </span>

          <h1 className="mt-5 font-playfair text-[1.85rem] font-semibold leading-[1.12] text-mag-navy sm:text-4xl lg:text-5xl xl:text-[3.15rem]">
            {hero.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-mag-muted sm:mt-5 sm:text-base lg:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <MagrassCtaButton href={whatsappUrl} label={hero.primaryCta} className="sm:flex-1 sm:max-w-xs" />
            <MagrassCtaButton
              href={`${MAGRASS_BASE}/tratamientos`}
              label={hero.secondaryCta}
              variant="secondary"
              external={false}
              className="sm:flex-1 sm:max-w-xs"
            />
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3">
            {hero.trustBadges.map((badge, index) => {
              const Icon = pillarIcons[index] ?? HeartPulse;
              return (
                <div
                  key={badge}
                  className="flex items-start gap-3 rounded-2xl border border-mag-border bg-mag-cream p-4 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mag-sand/30 text-mag-jade">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <p className="text-xs font-semibold leading-snug text-mag-navy sm:text-sm">{badge}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MagrassValuePillarsSection() {
  const { valuePillars } = clinicHome;

  return (
    <section className="bg-mag-cream py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mag-jade sm:text-xs">
            Propuesta de valor
          </p>
          <h2 className="mt-2 font-playfair text-2xl font-semibold text-mag-navy sm:text-3xl lg:text-4xl">
            Excelencia clínica con enfoque humano
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-6">
          {valuePillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? HeartPulse;
            return (
              <article
                key={pillar.title}
                className="rounded-2xl border border-mag-border bg-mag-white p-5 shadow-sm sm:rounded-3xl sm:p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mag-sand/25 text-mag-jade">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 font-playfair text-lg font-semibold text-mag-navy sm:text-xl">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mag-muted">{pillar.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <Link
            href={`${MAGRASS_BASE}/tratamientos`}
            className="text-sm font-semibold text-mag-jade transition-colors duration-300 hover:text-mag-navy"
          >
            Explorar tratamientos →
          </Link>
        </div>
      </div>
    </section>
  );
}
