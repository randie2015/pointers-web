import { clinicHome, keyTreatments } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';

export function MagrassTreatmentsSection() {
  const { treatments } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section id="tratamientos" className="scroll-mt-20 bg-mag-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mag-gold sm:text-xs">
            Protocolos médicos
          </p>
          <h2 className="mt-2 font-playfair text-2xl font-semibold text-mag-navy sm:text-3xl lg:text-4xl">
            {treatments.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-mag-muted sm:text-base">
            {treatments.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {keyTreatments.map((treatment, index) => (
            <article
              key={treatment.id}
              className="group flex flex-col rounded-2xl border border-mag-border bg-mag-ivory/50 p-5 transition hover:border-mag-gold/50 hover:shadow-md sm:rounded-3xl sm:p-6"
            >
              <span className="font-jakarta text-xs font-bold text-mag-gold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-playfair text-lg font-semibold text-mag-navy sm:text-xl">
                {treatment.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-mag-muted">{treatment.description}</p>
              <MagrassCtaButton
                href={whatsappUrl}
                label="Consultar por WhatsApp"
                variant="secondary"
                className="mt-4 sm:max-w-xs"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
