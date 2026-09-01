import { clinicHome, clinicWhatsApp } from '@/src/data/clinicData';
import { buildWhatsAppUrl } from '@/lib/rey-dental/whatsapp';
import { ReyDentalCtaButton } from '@/components/rey-dental/cta-button';

export function ReyDentalClosingCtaSection() {
  const { closingCta } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl(clinicWhatsApp.reception);

  return (
    <section className="bg-rey-dark py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{closingCta.title}</h2>
        <p className="mt-4 text-slate-300">{closingCta.subtitle}</p>
        <ReyDentalCtaButton
          href={whatsappUrl}
          label={closingCta.button}
          variant="light"
          className="mt-8 px-10 py-4 text-base"
        />
      </div>
    </section>
  );
}
