import { clinicHome } from '@/src/data/alejandraData';
import { buildWhatsAppUrl } from '@/lib/dra-alejandra/whatsapp';
import { DraAlejandraCtaButton } from '@/components/dra-alejandra/cta-button';

export function DraAlejandraClosingCtaSection() {
  const { closingCta } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section className="bg-gradient-to-br from-ale-ink via-ale-ink to-ale-cta/80 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance font-display text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
          {closingCta.title}
        </h2>
        <p className="mt-3 text-sm text-white/80 sm:mt-4 sm:text-base">{closingCta.subtitle}</p>
        <DraAlejandraCtaButton
          href={whatsappUrl}
          label={closingCta.button}
          variant="light"
          className="mt-6 px-6 py-3.5 text-sm sm:mt-8 sm:px-10 sm:py-4 sm:text-base lg:mx-auto"
        />
      </div>
    </section>
  );
}
