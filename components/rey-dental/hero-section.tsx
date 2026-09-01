import { clinicHome, clinicWhatsApp } from '@/src/data/clinicData';
import { buildWhatsAppUrl } from '@/lib/rey-dental/whatsapp';
import { ReyDentalCtaButton } from '@/components/rey-dental/cta-button';
import { Stethoscope } from 'lucide-react';

export function ReyDentalHeroSection() {
  const { hero } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl(clinicWhatsApp.appointment);

  return (
    <section className="bg-rey-base">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <span className="inline-flex rounded-full border border-rey-primary/30 bg-rey-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-rey-primary">
            {hero.badge}
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-rey-ink md:text-5xl">
            Tu Sonrisa en Manos de{' '}
            <span className="text-rey-primary">{hero.titleAccent}</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 md:text-lg">{hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ReyDentalCtaButton href={whatsappUrl} label={hero.primaryCta} />
            <ReyDentalCtaButton
              href="#tratamientos"
              label={hero.secondaryCta}
              variant="secondary"
              external={false}
            />
          </div>

          <p className="mt-6 text-sm font-medium text-rey-primary">{hero.rating}</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-rey-accent/40 to-rey-primary/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-rey-neutral/40 bg-white shadow-xl">
            <div className="flex aspect-[4/5] flex-col items-center justify-center bg-gradient-to-br from-rey-accent/30 via-white to-rey-primary/10 p-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-rey-primary/10">
                <Stethoscope className="h-12 w-12 text-rey-primary" strokeWidth={1.5} />
              </div>
              <p className="mt-6 text-center font-display text-xl font-semibold text-rey-ink">Dr. David</p>
              <p className="mt-1 text-center text-sm text-slate-500">Odontología especializada · Arequipa</p>
              <div className="mt-6 grid w-full grid-cols-3 gap-2 text-center text-xs text-slate-500">
                <div className="rounded-xl bg-rey-base px-2 py-3">
                  <p className="font-semibold text-rey-primary">+10</p>
                  <p>años</p>
                </div>
                <div className="rounded-xl bg-rey-base px-2 py-3">
                  <p className="font-semibold text-rey-primary">3D</p>
                  <p>diagnóstico</p>
                </div>
                <div className="rounded-xl bg-rey-base px-2 py-3">
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
