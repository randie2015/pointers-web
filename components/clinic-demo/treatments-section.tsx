import { buildWhatsAppUrl } from '@/lib/clinic-demo/whatsapp';
import { ClinicCtaButton } from '@/components/clinic-demo/cta-button';
import { ClinicTreatmentMedia } from '@/components/clinic-demo/treatment-media';
import type { ResolvedDemo, ResolvedTreatment } from '@/lib/clinic-demo/types';

function TreatmentCard({
  demo,
  treatment,
  index
}: {
  demo: ResolvedDemo;
  treatment: ResolvedTreatment;
  index: number;
}) {
  const whatsappUrl = buildWhatsAppUrl(demo);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-demo-accent/40 bg-gradient-to-br from-white to-demo-soft/15 shadow-sm transition duration-300 hover:border-demo-accent/70 hover:shadow-lg sm:rounded-3xl lg:col-span-2 lg:flex ${
        index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      <ClinicTreatmentMedia treatment={treatment} className="aspect-[3/2] w-full lg:w-2/5" priority={index === 0} />
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 lg:p-8">
        <h3 className="font-display text-lg font-semibold text-demo-charcoal sm:text-xl">{treatment.title}</h3>
        <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{treatment.shortDescription}</p>
        <div className="mt-4 sm:mt-5">
          <ClinicCtaButton href={whatsappUrl} label="Consultar por WhatsApp" className="sm:max-w-xs" />
        </div>
      </div>
    </article>
  );
}

export function ClinicTreatmentsSection({ demo }: { demo: ResolvedDemo }) {
  return (
    <section id="tratamientos" data-nav-theme="rose" className="bg-demo-soft/15 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-demo-accent sm:text-xs">
            Servicios Estrella
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-demo-charcoal sm:mt-3 sm:text-3xl lg:text-4xl">
            Tratamientos boutique de alta gama
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:mt-12 lg:grid-cols-2">
          {demo.treatments.map((treatment, index) => (
            <TreatmentCard key={treatment.id} demo={demo} treatment={treatment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
