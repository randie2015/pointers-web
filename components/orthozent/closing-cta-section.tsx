import { clinicHome } from '@/src/data/orthozentData';
import { buildWhatsAppUrl } from '@/lib/orthozent/whatsapp';
import { OrthozentCtaButton } from '@/components/orthozent/cta-button';

export function OrthozentClosingCtaSection() {
  const { closingCta } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section className="bg-ortho-dark py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {closingCta.title}
        </h2>
        <p className="mt-3 text-sm text-slate-300 sm:mt-4 sm:text-base">{closingCta.subtitle}</p>
        <OrthozentCtaButton
          href={whatsappUrl}
          label={closingCta.button}
          variant="light"
          className="mt-6 px-6 py-3.5 text-sm sm:mt-8 sm:px-10 sm:py-4 sm:text-base lg:mx-auto"
        />
      </div>
    </section>
  );
}
