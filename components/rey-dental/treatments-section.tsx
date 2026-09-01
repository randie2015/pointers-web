import { AlignCenter, Sparkles, Stethoscope, Syringe } from 'lucide-react';
import { clinicTreatments } from '@/src/data/clinicData';
import { buildWhatsAppUrl } from '@/lib/rey-dental/whatsapp';
import { ReyDentalCtaButton } from '@/components/rey-dental/cta-button';
import type { Treatment } from '@/src/data/clinicData';

const iconMap = {
  align: AlignCenter,
  implant: Syringe,
  whitening: Sparkles,
  general: Stethoscope
} as const;

function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  const Icon = iconMap[treatment.icon];
  const whatsappUrl = buildWhatsAppUrl(treatment.title);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-rey-neutral/40 bg-white shadow-sm transition hover:border-rey-primary/40 hover:shadow-md ${
        index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
      } md:col-span-2 md:flex`}
    >
      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-rey-accent/30 to-rey-primary/10 md:aspect-auto md:w-2/5">
        <Icon className="h-16 w-16 text-rey-primary/60 transition group-hover:scale-110 group-hover:text-rey-primary" strokeWidth={1.25} />
      </div>
      <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
        <h3 className="font-display text-xl font-semibold text-rey-ink">{treatment.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{treatment.shortDescription}</p>
        <div className="mt-5">
          <ReyDentalCtaButton href={whatsappUrl} label="Consultar por WhatsApp" className="text-xs md:text-sm" />
        </div>
      </div>
    </article>
  );
}

export function ReyDentalTreatmentsSection() {
  return (
    <section id="tratamientos" className="bg-rey-base py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-rey-primary">Tratamientos</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-rey-ink md:text-4xl">
            Soluciones para cada necesidad
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {clinicTreatments.map((treatment, index) => (
            <TreatmentCard key={treatment.id} treatment={treatment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
