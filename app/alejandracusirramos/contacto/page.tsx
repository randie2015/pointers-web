import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { DraAlejandraPageHero } from '@/components/dra-alejandra/page-hero';
import { DraAlejandraCtaButton } from '@/components/dra-alejandra/cta-button';
import { clinicContact, clinicContactPage } from '@/src/data/alejandraData';
import { buildPhoneUrl, buildWhatsAppUrl } from '@/lib/dra-alejandra/whatsapp';

export default function DraAlejandraContactoPage() {
  const whatsappUrl = buildWhatsAppUrl();
  const phoneUrl = buildPhoneUrl();

  return (
    <>
      <DraAlejandraPageHero title={clinicContactPage.title} subtitle={clinicContactPage.subtitle} />

      <section data-nav-theme="light" className="bg-ale-ivory py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-ale-neutral/40 bg-white shadow-sm sm:rounded-2xl">
            <div className="space-y-5 p-5 sm:space-y-6 sm:p-8">
              <div className="flex gap-3 sm:gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ale-cta" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ale-ink">Dirección</p>
                  <p className="mt-1 text-sm text-slate-600">{clinicContact.address}</p>
                  <a
                    href={clinicContact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-ale-cta hover:underline"
                  >
                    Ver en Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-ale-cta" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ale-ink">Horario de atención</p>
                  <p className="mt-1 text-sm text-slate-600">{clinicContact.schedule.weekdays}</p>
                  <p className="text-sm text-slate-600">{clinicContact.schedule.saturday}</p>
                  <p className="text-sm text-slate-500">{clinicContact.schedule.sunday}</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-ale-cta" />
                <div>
                  <p className="text-sm font-semibold text-ale-ink">Teléfono</p>
                  <a href={phoneUrl} className="mt-1 text-sm font-medium text-ale-cta hover:underline">
                    {clinicContact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-ale-cta" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ale-ink">Correo</p>
                  <a
                    href={`mailto:${clinicContact.email}`}
                    className="mt-1 break-all text-sm text-slate-600 hover:text-ale-cta"
                  >
                    {clinicContact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-ale-neutral/30 bg-ale-ivory/50 p-4 sm:flex-row sm:p-6">
              <DraAlejandraCtaButton
                href={phoneUrl}
                label={clinicContactPage.callCta}
                variant="secondary"
                className="sm:flex-1"
              />
              <DraAlejandraCtaButton href={whatsappUrl} label={clinicContactPage.whatsappCta} className="sm:flex-1" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
