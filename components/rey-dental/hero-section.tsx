import { clinicHome, clinicWhatsApp } from '@/src/data/clinicData';
import { buildWhatsAppUrl } from '@/lib/rey-dental/whatsapp';
import { ReyDentalCtaButton } from '@/components/rey-dental/cta-button';
import { Stethoscope } from 'lucide-react';

export function ReyDentalHeroSection() {
  const { hero } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl(clinicWhatsApp.appointment);

  return (
    <section className="bg-rey-base">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-24 xl:px-8">
        <div className="order-2 lg:order-1">
          <span className="inline-flex max-w-full rounded-full border border-rey-primary/30 bg-rey-accent/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-rey-primary sm:px-4 sm:text-xs">
            {hero.badge}
          </span>

          <h1 className="mt-4 font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight text-rey-ink sm:mt-6 sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
            Tu Sonrisa en Manos de{' '}
            <span className="text-rey-primary">{hero.titleAccent}</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-base lg:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-stretch lg:items-center">
            <ReyDentalCtaButton href={whatsappUrl} label={hero.primaryCta} className="sm:flex-1 sm:max-w-xs lg:flex-none" />
            <ReyDentalCtaButton
              href="#tratamientos"
              label={hero.secondaryCta}
              variant="secondary"
              external={false}
              className="sm:flex-1 sm:max-w-xs lg:flex-none"
            />
          </div>

          <p className="mt-5 text-xs font-medium text-rey-primary sm:mt-6 sm:text-sm">{hero.rating}</p>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-rey-accent/40 to-rey-primary/20 blur-2xl sm:-inset-4" />
          <div className="relative overflow-hidden rounded-2xl border border-rey-neutral/40 bg-white shadow-xl sm:rounded-3xl">
            <div className="flex aspect-[5/6] flex-col items-center justify-center bg-gradient-to-br from-rey-accent/30 via-white to-rey-primary/10 p-6 sm:aspect-[4/5] sm:p-8 lg:aspect-[4/5]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rey-primary/10 sm:h-24 sm:w-24">
                <Stethoscope className="h-10 w-10 text-rey-primary sm:h-12 sm:w-12" strokeWidth={1.5} />
              </div>
              <p className="mt-5 text-center font-display text-lg font-semibold text-rey-ink sm:mt-6 sm:text-xl">
                Dr. David
              </p>
              <p className="mt-1 text-center text-xs text-slate-500 sm:text-sm">Odontología especializada · Arequipa</p>
              <div className="mt-5 grid w-full grid-cols-3 gap-2 text-center text-[10px] text-slate-500 sm:mt-6 sm:text-xs">
                <div className="rounded-lg bg-rey-base px-1.5 py-2.5 sm:rounded-xl sm:px-2 sm:py-3">
                  <p className="font-semibold text-rey-primary">+10</p>
                  <p>años</p>
                </div>
                <div className="rounded-lg bg-rey-base px-1.5 py-2.5 sm:rounded-xl sm:px-2 sm:py-3">
                  <p className="font-semibold text-rey-primary">3D</p>
                  <p>diagnóstico</p>
                </div>
                <div className="rounded-lg bg-rey-base px-1.5 py-2.5 sm:rounded-xl sm:px-2 sm:py-3">
                  <p className="font-semibold text-rey-primary">100%</p>
                  <p>bioseguro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
