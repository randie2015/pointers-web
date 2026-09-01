import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { ReyDentalPageHero } from '@/components/rey-dental/page-hero';
import { ReyDentalCtaButton } from '@/components/rey-dental/cta-button';
import { clinicContact, clinicContactPage } from '@/src/data/clinicData';
import { buildPhoneUrl, buildWhatsAppUrl } from '@/lib/rey-dental/whatsapp';

export default function ReyDentalContactoPage() {
  const whatsappUrl = buildWhatsAppUrl();
  const phoneUrl = buildPhoneUrl();

  return (
    <>
      <ReyDentalPageHero title={clinicContactPage.title} subtitle={clinicContactPage.subtitle} />

      <section className="bg-rey-base py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-rey-neutral/40 bg-white shadow-sm sm:rounded-2xl">
            <div className="space-y-5 p-5 sm:space-y-6 sm:p-8">
              <div className="flex gap-3 sm:gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rey-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-rey-ink">Dirección</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {clinicContact.address}, {clinicContact.district}
                  </p>
                  <p className="text-sm text-slate-600">
                    {clinicContact.city}, {clinicContact.country}
                  </p>
                  <a
                    href={clinicContact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-rey-primary hover:underline"
                  >
                    Ver en Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-rey-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-rey-ink">Horario de atención</p>
                  <p className="mt-1 text-sm text-slate-600">{clinicContact.schedule.weekdays}</p>
                  <p className="text-sm text-slate-600">{clinicContact.schedule.saturday}</p>
                  <p className="text-sm text-slate-500">{clinicContact.schedule.sunday}</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-rey-primary" />
                <div>
                  <p className="text-sm font-semibold text-rey-ink">Teléfono</p>
                  <a href={phoneUrl} className="mt-1 text-sm font-medium text-rey-primary hover:underline">
                    {clinicContact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-rey-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-rey-ink">Correo</p>
                  <a
                    href={`mailto:${clinicContact.email}`}
                    className="mt-1 break-all text-sm text-slate-600 hover:text-rey-primary"
                  >
                    {clinicContact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-rey-neutral/30 bg-rey-base/50 p-4 sm:flex-row sm:p-6">
              <ReyDentalCtaButton
                href={phoneUrl}
                label={clinicContactPage.callCta}
                variant="secondary"
                className="sm:flex-1"
              />
              <ReyDentalCtaButton href={whatsappUrl} label={clinicContactPage.whatsappCta} className="sm:flex-1" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
