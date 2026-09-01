import { Shield, Heart, Cpu, Users } from 'lucide-react';
import { ReyDentalPageHero } from '@/components/rey-dental/page-hero';
import { ReyDentalClosingCtaSection } from '@/components/rey-dental/closing-cta-section';
import { clinicAbout, clinicBrand } from '@/src/data/clinicData';

const valueIcons = [Shield, Heart, Cpu, Users] as const;

export default function ReyDentalNosotrosPage() {
  const { hero, values, doctorBio } = clinicAbout;

  return (
    <>
      <ReyDentalPageHero title={hero.title} subtitle={hero.subtitle} />

      <section className="bg-rey-base py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-rey-neutral/40 bg-white shadow-sm">
              <div className="flex aspect-square flex-col items-center justify-center bg-gradient-to-br from-rey-accent/30 via-white to-rey-primary/10 p-10">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-rey-primary text-4xl font-bold text-white">
                  D
                </div>
                <p className="mt-6 font-display text-2xl font-semibold text-rey-ink">{clinicBrand.doctor}</p>
                <p className="mt-1 text-sm text-slate-500">Director clínico · {clinicBrand.name}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rey-primary">Nuestro enfoque</p>
              <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">{doctorBio}</p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = valueIcons[index] ?? Shield;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-rey-neutral/40 bg-white p-6 transition hover:border-rey-primary/40"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rey-accent/30">
                    <Icon className="h-5 w-5 text-rey-primary" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-rey-ink">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ReyDentalClosingCtaSection />
    </>
  );
}
