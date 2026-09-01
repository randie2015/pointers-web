import { clinicTreatments } from '@/src/data/clinicData';
import { buildWhatsAppUrl } from '@/lib/rey-dental/whatsapp';
import { ReyDentalCtaButton } from '@/components/rey-dental/cta-button';
import { ReyDentalTreatmentMedia } from '@/components/rey-dental/treatment-media';
import type { Treatment } from '@/src/data/clinicData';

function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  const whatsappUrl = buildWhatsAppUrl(treatment.title);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-rey-neutral/40 bg-white shadow-sm transition hover:border-rey-primary/40 hover:shadow-md sm:rounded-2xl lg:col-span-2 lg:flex ${
        index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      <ReyDentalTreatmentMedia
        treatment={treatment}
        className="min-h-[140px] sm:min-h-[180px] lg:aspect-[3/2] lg:min-h-0 lg:w-2/5"
        priority={index === 0}
      />
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 lg:p-8">
        <h3 className="font-display text-lg font-semibold text-rey-ink sm:text-xl">{treatment.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{treatment.shortDescription}</p>
        <div className="mt-4 sm:mt-5">
          <ReyDentalCtaButton href={whatsappUrl} label="Consultar por WhatsApp" className="sm:max-w-xs" />
        </div>
      </div>
    </article>
  );
}

export function ReyDentalTreatmentsSection() {
  return (
    <section id="tratamientos" className="bg-rey-base py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-rey-primary sm:text-xs">
            Tratamientos
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-rey-ink sm:mt-3 sm:text-3xl lg:text-4xl">
            Soluciones para cada necesidad
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2 lg:mt-12">
          {clinicTreatments.map((treatment, index) => (
            <TreatmentCard key={treatment.id} treatment={treatment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
