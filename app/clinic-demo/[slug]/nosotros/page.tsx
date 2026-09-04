import { Shield, Heart, Cpu, Users } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ClinicPageHero } from '@/components/clinic-demo/page-hero';
import { ClinicClosingCtaSection } from '@/components/clinic-demo/closing-cta-section';
import { ClinicDoctorPhoto } from '@/components/clinic-demo/doctor-photo';
import { getResolvedDemo, isDentistDemoSlug } from '@/lib/clinic-demo/registry';

const valueIcons = [Shield, Heart, Cpu, Users] as const;

export default async function ClinicDemoNosotrosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isDentistDemoSlug(slug)) notFound();

  const demo = getResolvedDemo(slug);
  const { hero, values, doctorBio } = demo.about;

  return (
    <>
      <ClinicPageHero title={hero.title} subtitle={hero.subtitle} />

      <section data-nav-theme="light" className="bg-demo-base py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
            <ClinicDoctorPhoto demo={demo} variant="profile" className="mx-auto w-full max-w-md lg:max-w-none" />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-demo-primary sm:text-xs">
                Nuestro enfoque
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:mt-4 sm:text-base lg:text-lg">{doctorBio}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16">
            {values.map((value, index) => {
              const Icon = valueIcons[index] ?? Shield;
              return (
                <div
                  key={value.title}
                  className="rounded-xl border border-demo-neutral/40 bg-white p-5 transition hover:border-demo-primary/40 sm:rounded-2xl sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-demo-accent/30">
                    <Icon className="h-5 w-5 text-demo-primary" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-demo-ink sm:mt-4 sm:text-lg">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ClinicClosingCtaSection demo={demo} />
    </>
  );
}
