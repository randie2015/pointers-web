import { MapPin, Clock, Phone } from 'lucide-react';
import { clinicContact, clinicHome, clinicWhatsApp } from '@/src/data/clinicData';
import { buildPhoneUrl, buildWhatsAppUrl } from '@/lib/rey-dental/whatsapp';
import { ReyDentalCtaButton } from '@/components/rey-dental/cta-button';

export function ReyDentalLocationSection() {
  const { location } = clinicHome;
  const mapsUrl = clinicContact.mapsUrl;
  const whatsappUrl = buildWhatsAppUrl(clinicWhatsApp.location);

  return (
    <section className="bg-rey-base py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl font-bold text-rey-ink sm:text-3xl lg:text-4xl">
          {location.title}
        </h2>

        <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-xl border border-rey-neutral/40 bg-white shadow-sm sm:mt-10 sm:rounded-2xl">
          <div className="bg-gradient-to-r from-rey-primary to-rey-primary/80 px-4 py-3 sm:px-6 sm:py-4">
            <p className="font-display text-base font-semibold text-white sm:text-lg">
              Rey Dental · {clinicContact.city}
            </p>
          </div>

          <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rey-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-rey-ink">{clinicContact.address}</p>
                <p className="text-sm text-slate-500">
                  {clinicContact.district}, {clinicContact.city}, {clinicContact.country}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-rey-primary" />
              <div className="min-w-0 text-sm text-slate-600">
                <p>{clinicContact.schedule.weekdays}</p>
                <p>{clinicContact.schedule.saturday}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-rey-primary" />
              <a href={buildPhoneUrl()} className="text-sm font-medium text-rey-primary hover:underline">
                {clinicContact.phoneDisplay}
              </a>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:pt-2">
              <ReyDentalCtaButton href={mapsUrl} label={location.ctaMaps} variant="secondary" className="sm:flex-1" />
              <ReyDentalCtaButton href={whatsappUrl} label={location.ctaReception} className="sm:flex-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
