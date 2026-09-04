import { buildWhatsAppUrl } from '@/lib/clinic-demo/whatsapp';
import { ClinicCtaButton } from '@/components/clinic-demo/cta-button';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

export function ClinicClosingCtaSection({ demo }: { demo: ResolvedDemo }) {
  const { closingCta } = demo.home;
  const whatsappUrl = buildWhatsAppUrl(demo);

  return (
    <section data-nav-theme="dark" className="bg-gradient-to-br from-demo-ink via-demo-ink to-demo-primary/80 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance font-display text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
          {closingCta.title}
        </h2>
        <p className="mt-3 text-sm text-white/80 sm:mt-4 sm:text-base">{closingCta.subtitle}</p>
        <ClinicCtaButton
          href={whatsappUrl}
          label={closingCta.button}
          variant="light"
          className="mt-6 px-6 py-3.5 text-sm sm:mt-8 sm:px-10 sm:py-4 sm:text-base lg:mx-auto"
        />
      </div>
    </section>
  );
}
