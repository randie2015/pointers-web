import { Check } from 'lucide-react';
import { DraAlejandraPageHero } from '@/components/dra-alejandra/page-hero';
import { DraAlejandraClosingCtaSection } from '@/components/dra-alejandra/closing-cta-section';
import { DraAlejandraCtaButton } from '@/components/dra-alejandra/cta-button';
import { DraAlejandraTreatmentMedia } from '@/components/dra-alejandra/treatment-media';
import { clinicServicesPage, clinicTreatments } from '@/src/data/alejandraData';
import { buildWhatsAppUrl } from '@/lib/dra-alejandra/whatsapp';

export default function DraAlejandraServiciosPage() {
  return (
    <>
      <DraAlejandraPageHero title={clinicServicesPage.title} subtitle={clinicServicesPage.subtitle} />

      <section className="bg-ale-ivory py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-5 px-4 sm:space-y-8 sm:px-6 lg:px-8">
          {clinicTreatments.map((treatment) => (
            <article
              key={treatment.id}
              className="group overflow-hidden rounded-xl border border-ale-neutral/40 bg-white shadow-sm sm:rounded-2xl"
            >
              <div className="grid lg:grid-cols-2">
                <DraAlejandraTreatmentMedia
                  treatment={treatment}
                  className="aspect-[3/2] lg:aspect-auto lg:min-h-full"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
                <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                  <h2 className="font-display text-xl font-bold text-ale-ink sm:text-2xl lg:text-3xl">
                    {treatment.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{treatment.description}</p>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-ale-cta sm:mt-6 sm:text-sm">
                    Beneficios
                  </p>
                  <ul className="mt-3 space-y-2.5 sm:space-y-3">
                    {treatment.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-700 sm:gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-ale-cta" strokeWidth={2.5} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <DraAlejandraCtaButton
                    href={buildWhatsAppUrl()}
                    label="Consultar por WhatsApp"
                    className="mt-5 sm:mt-6 sm:max-w-xs"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DraAlejandraClosingCtaSection />
    </>
  );
}
