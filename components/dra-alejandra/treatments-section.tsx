import { clinicTreatments } from '@/src/data/alejandraData';
import { buildWhatsAppUrl } from '@/lib/dra-alejandra/whatsapp';
import { DraAlejandraCtaButton } from '@/components/dra-alejandra/cta-button';
import { DraAlejandraTreatmentMedia } from '@/components/dra-alejandra/treatment-media';
import type { Treatment } from '@/src/data/alejandraData';

function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-ale-gold/40 bg-gradient-to-br from-white to-ale-rose/15 shadow-sm transition duration-300 hover:border-ale-gold/70 hover:shadow-lg sm:rounded-3xl lg:col-span-2 lg:flex ${
        index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      <DraAlejandraTreatmentMedia
        treatment={treatment}
        className="aspect-[3/2] w-full lg:w-2/5"
        priority={index === 0}
      />
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 lg:p-8">
        <h3 className="font-display text-lg font-semibold text-ale-ink sm:text-xl">{treatment.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ale-ink/70">{treatment.shortDescription}</p>
        <div className="mt-4 sm:mt-5">
          <DraAlejandraCtaButton href={whatsappUrl} label="Consultar por WhatsApp" className="sm:max-w-xs" />
        </div>
      </div>
    </article>
  );
}

export function DraAlejandraTreatmentsSection() {
  return (
    <section id="tratamientos" className="bg-ale-rose/15 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ale-gold sm:text-xs">
            Servicios Estrella
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ale-ink sm:mt-3 sm:text-3xl lg:text-4xl">
            Tratamientos boutique de alta gama
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
