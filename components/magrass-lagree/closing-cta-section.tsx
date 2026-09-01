import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';

export function MagrassClosingCtaSection() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section className="bg-gradient-to-br from-mag-navy via-mag-navy-deep to-mag-navy py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-playfair text-2xl font-semibold text-white sm:text-3xl">
          ¿Lista para tu diagnóstico 360°?
        </h2>
        <p className="mt-3 text-sm text-white/75 sm:text-base">
          Agenda tu evaluación médica personalizada. Respuesta directa por WhatsApp.
        </p>
        <MagrassCtaButton href={whatsappUrl} label="Agendar Diagnóstico por WhatsApp" variant="light" className="mt-6 sm:mt-8" />
      </div>
    </section>
  );
}
