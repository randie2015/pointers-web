import dynamic from 'next/dynamic';
import { casesPage, clinicalCases } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';

const MagrassBeforeAfterSlider = dynamic(
  () =>
    import('@/components/magrass-lagree/before-after-slider').then((m) => ({
      default: m.MagrassBeforeAfterSlider
    })),
  {
    loading: () => (
      <div className="mx-auto mt-8 h-56 w-full max-w-5xl animate-pulse rounded-3xl bg-mag-border sm:mt-10 sm:h-72" />
    )
  }
);

export function MagrassCasesSection() {
  const whatsappUrl = buildWhatsAppUrl('cases');

  return (
    <section className="bg-mag-cream py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MagrassBeforeAfterSlider />

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {clinicalCases.map((clinicalCase) => (
            <article
              key={clinicalCase.id}
              className="flex flex-col rounded-2xl border border-mag-border bg-mag-white p-5 sm:rounded-3xl sm:p-6"
            >
              <h3 className="font-playfair text-lg font-semibold text-mag-navy sm:text-xl">
                {clinicalCase.title}
              </h3>
              <div className="mt-3 space-y-2 text-sm text-mag-muted">
                <p>
                  <span className="font-semibold text-mag-navy">Abordaje:</span> {clinicalCase.approach}
                </p>
                <p>
                  <span className="font-semibold text-mag-navy">Evolución:</span> {clinicalCase.duration}
                </p>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mag-muted">{clinicalCase.summary}</p>
              <MagrassCtaButton
                href={whatsappUrl}
                label={casesPage.cta}
                variant="secondary"
                className="mt-4"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
