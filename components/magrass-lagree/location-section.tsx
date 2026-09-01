import { MapPin, Clock, Phone } from 'lucide-react';
import { clinicBrand, clinicContact, locationPage } from '@/src/data/magrassData';
import { buildPhoneUrl, buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';

export function MagrassLocationSection() {
  const whatsappUrl = buildWhatsAppUrl('location');

  return (
    <section className="bg-mag-cream py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-mag-border bg-mag-white shadow-sm sm:rounded-3xl">
            <div className="bg-mag-navy px-5 py-4 sm:px-6">
              <p className="font-playfair text-lg font-semibold text-white sm:text-xl">
                {clinicBrand.name} · {clinicContact.city}
              </p>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-mag-jade" />
                <div>
                  <p className="text-sm font-medium text-mag-navy">{clinicContact.address}</p>
                  <p className="text-sm text-mag-muted">
                    {clinicContact.city}, {clinicContact.country}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-mag-jade" />
                <div className="text-sm text-mag-muted">
                  <p>{clinicContact.schedule.weekdays}</p>
                  <p>{clinicContact.schedule.saturday}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-mag-jade" />
                <a href={buildPhoneUrl()} className="text-sm font-semibold text-mag-navy hover:text-mag-jade">
                  {clinicContact.phoneDisplay}
                </a>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <MagrassCtaButton
                  href={clinicContact.mapsUrl}
                  label={locationPage.ctaMaps}
                  variant="secondary"
                  className="sm:flex-1"
                />
                <MagrassCtaButton href={whatsappUrl} label={locationPage.ctaBook} className="sm:flex-1" />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-mag-border bg-mag-white sm:rounded-3xl">
            <iframe
              title={`Mapa ${clinicBrand.name}`}
              src="https://maps.google.com/maps?q=Magrass+LaGre%C3%A9+Arequipa,+Peru&output=embed"
              className="h-72 w-full border-0 lg:h-full lg:min-h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
