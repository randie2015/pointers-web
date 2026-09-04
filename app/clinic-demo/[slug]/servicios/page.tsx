import { Check } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ClinicPageHero } from '@/components/clinic-demo/page-hero';
import { ClinicClosingCtaSection } from '@/components/clinic-demo/closing-cta-section';
import { ClinicCtaButton } from '@/components/clinic-demo/cta-button';
import { ClinicTreatmentMedia } from '@/components/clinic-demo/treatment-media';
import { buildWhatsAppUrl } from '@/lib/clinic-demo/whatsapp';
import { getResolvedDemo, isDentistDemoSlug } from '@/lib/clinic-demo/registry';

export default async function ClinicDemoServiciosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isDentistDemoSlug(slug)) notFound();

  const demo = getResolvedDemo(slug);
  const whatsappUrl = buildWhatsAppUrl(demo);

  return (
    <>
      <ClinicPageHero title={demo.servicesPage.title} subtitle={demo.servicesPage.subtitle} />

      <section data-nav-theme="light" className="bg-demo-base py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-5 px-4 sm:space-y-8 sm:px-6 lg:px-8">
          {demo.treatments.map((treatment) => (
            <article
              key={treatment.id}
              className="group overflow-hidden rounded-xl border border-demo-neutral/40 bg-white shadow-sm sm:rounded-2xl"
            >
              <div className="grid lg:grid-cols-2">
                <ClinicTreatmentMedia
                  treatment={treatment}
                  className="aspect-[3/2] lg:aspect-auto lg:min-h-full"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
                <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                  <h2 className="font-display text-xl font-bold text-demo-ink sm:text-2xl lg:text-3xl">
                    {treatment.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{treatment.description}</p>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-demo-primary sm:mt-6 sm:text-sm">
                    Beneficios
                  </p>
                  <ul className="mt-3 space-y-2.5 sm:space-y-3">
                    {treatment.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-700 sm:gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-demo-primary" strokeWidth={2.5} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <ClinicCtaButton
                    href={whatsappUrl}
                    label="Consultar por WhatsApp"
                    className="mt-5 sm:mt-6 sm:max-w-xs"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ClinicClosingCtaSection demo={demo} />
    </>
  );
}
