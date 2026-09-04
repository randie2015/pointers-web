import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ClinicPageHero } from '@/components/clinic-demo/page-hero';
import { ClinicCtaButton } from '@/components/clinic-demo/cta-button';
import { buildPhoneUrl, buildWhatsAppUrl } from '@/lib/clinic-demo/whatsapp';
import { getResolvedDemo, isDemoSlug } from '@/lib/clinic-demo/registry';

export default async function ClinicDemoContactoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isDemoSlug(slug)) notFound();

  const demo = getResolvedDemo(slug);
  const whatsappUrl = buildWhatsAppUrl(demo);
  const phoneUrl = buildPhoneUrl(demo);

  return (
    <>
      <ClinicPageHero title={demo.contactPage.title} subtitle={demo.contactPage.subtitle} />

      <section data-nav-theme="light" className="bg-demo-base py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-demo-neutral/40 bg-white shadow-sm sm:rounded-2xl">
            <div className="space-y-5 p-5 sm:space-y-6 sm:p-8">
              <div className="flex gap-3 sm:gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-demo-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-demo-ink">Dirección</p>
                  <p className="mt-1 text-sm text-slate-600">{demo.contact.address}</p>
                  <a
                    href={demo.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-demo-primary hover:underline"
                  >
                    Ver en Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-demo-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-demo-ink">Horario de atención</p>
                  <p className="mt-1 text-sm text-slate-600">{demo.contact.schedule.weekdays}</p>
                  <p className="text-sm text-slate-600">{demo.contact.schedule.saturday}</p>
                  <p className="text-sm text-slate-500">{demo.contact.schedule.sunday}</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-demo-primary" />
                <div>
                  <p className="text-sm font-semibold text-demo-ink">Teléfono</p>
                  <a href={phoneUrl} className="mt-1 text-sm font-medium text-demo-primary hover:underline">
                    {demo.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-demo-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-demo-ink">Correo</p>
                  <a
                    href={`mailto:${demo.contact.email}`}
                    className="mt-1 break-all text-sm text-slate-600 hover:text-demo-primary"
                  >
                    {demo.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-demo-neutral/30 bg-demo-base/50 p-4 sm:flex-row sm:p-6">
              <ClinicCtaButton
                href={phoneUrl}
                label={demo.contactPage.callCta}
                variant="secondary"
                className="sm:flex-1"
              />
              <ClinicCtaButton href={whatsappUrl} label={demo.contactPage.whatsappCta} className="sm:flex-1" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
