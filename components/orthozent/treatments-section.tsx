import { clinicTreatments } from '@/src/data/orthozentData';
import { buildWhatsAppUrl } from '@/lib/orthozent/whatsapp';
import { OrthozentCtaButton } from '@/components/orthozent/cta-button';
import { OrthozentTreatmentMedia } from '@/components/orthozent/treatment-media';
import type { Treatment } from '@/src/data/orthozentData';

function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-ortho-neutral/40 bg-white shadow-sm transition hover:border-ortho-primary/40 hover:shadow-md sm:rounded-2xl lg:col-span-2 lg:flex ${
        index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      <OrthozentTreatmentMedia
        treatment={treatment}
        className="aspect-[3/2] w-full lg:w-2/5"
        priority={index === 0}
      />
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 lg:p-8">
        <h3 className="font-display text-lg font-semibold text-ortho-ink sm:text-xl">{treatment.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{treatment.shortDescription}</p>
        <div className="mt-4 sm:mt-5">
          <OrthozentCtaButton href={whatsappUrl} label="Consultar por WhatsApp" className="sm:max-w-xs" />
        </div>
      </div>
    </article>
  );
}

export function OrthozentTreatmentsSection() {
  return (
    <section id="tratamientos" className="bg-ortho-base py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ortho-primary sm:text-xs">
            Tratamientos
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ortho-ink sm:mt-3 sm:text-3xl lg:text-4xl">
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
