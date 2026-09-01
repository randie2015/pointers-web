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

      <section className="bg-rey-base py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-rey-neutral/40 bg-white shadow-sm sm:rounded-2xl lg:max-w-none">
              <div className="flex aspect-[4/3] flex-col items-center justify-center bg-gradient-to-br from-rey-accent/30 via-white to-rey-primary/10 p-8 sm:aspect-square sm:p-10">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rey-primary text-3xl font-bold text-white sm:h-28 sm:w-28 sm:text-4xl">
                  D
                </div>
                <p className="mt-5 font-display text-xl font-semibold text-rey-ink sm:mt-6 sm:text-2xl">
                  {clinicBrand.doctor}
                </p>
                <p className="mt-1 text-center text-xs text-slate-500 sm:text-sm">
                  Director clínico · {clinicBrand.name}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-rey-primary sm:text-xs">
                Nuestro enfoque
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:mt-4 sm:text-base lg:text-lg">
                {doctorBio}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16">
            {values.map((value, index) => {
              const Icon = valueIcons[index] ?? Shield;
              return (
                <div
                  key={value.title}
                  className="rounded-xl border border-rey-neutral/40 bg-white p-5 transition hover:border-rey-primary/40 sm:rounded-2xl sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rey-accent/30">
                    <Icon className="h-5 w-5 text-rey-primary" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-rey-ink sm:mt-4 sm:text-lg">
                    {value.title}
                  </h3>
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
