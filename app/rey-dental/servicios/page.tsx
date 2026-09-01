import { Check } from 'lucide-react';
import { ReyDentalPageHero } from '@/components/rey-dental/page-hero';
import { ReyDentalClosingCtaSection } from '@/components/rey-dental/closing-cta-section';
import { ReyDentalCtaButton } from '@/components/rey-dental/cta-button';
import { clinicServicesPage, clinicTreatments } from '@/src/data/clinicData';
import { buildWhatsAppUrl } from '@/lib/rey-dental/whatsapp';

export default function ReyDentalServiciosPage() {
  return (
    <>
      <ReyDentalPageHero title={clinicServicesPage.title} subtitle={clinicServicesPage.subtitle} />

      <section className="bg-rey-base py-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-8 px-4 md:px-6">
          {clinicTreatments.map((treatment) => (
            <article
              key={treatment.id}
              className="overflow-hidden rounded-2xl border border-rey-neutral/40 bg-white shadow-sm"
            >
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-rey-accent/30 to-rey-primary/10 p-8 md:p-10">
                  <h2 className="font-display text-2xl font-bold text-rey-ink md:text-3xl">{treatment.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{treatment.description}</p>
                </div>

                <div className="flex flex-col justify-center p-8 md:p-10">
                  <p className="text-sm font-semibold uppercase tracking-wider text-rey-primary">Beneficios</p>
                  <ul className="mt-4 space-y-3">
                    {treatment.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-sm text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-rey-primary" strokeWidth={2.5} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <ReyDentalCtaButton
                    href={buildWhatsAppUrl(treatment.title)}
                    label="Consultar por WhatsApp"
                    className="mt-6 w-fit"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ReyDentalClosingCtaSection />
    </>
  );
}
