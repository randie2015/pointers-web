import { MapPin, Clock, Phone } from 'lucide-react';
import { clinicBrand, clinicContact, clinicHome } from '@/src/data/magrassData';
import { buildPhoneUrl, buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';

export function MagrassLocationSection() {
  const { location } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section id="ubicacion" className="scroll-mt-20 bg-mag-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-playfair text-2xl font-semibold text-mag-navy sm:text-3xl lg:text-4xl">
          {location.title}
        </h2>

        <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-mag-border bg-mag-ivory shadow-sm sm:mt-10 sm:rounded-3xl">
          <div className="bg-gradient-to-r from-mag-navy to-mag-navy-deep px-5 py-4 sm:px-6">
            <p className="font-playfair text-lg font-semibold text-white sm:text-xl">
              {clinicBrand.name} · {clinicContact.city}
            </p>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-mag-gold" />
              <div>
                <p className="text-sm font-medium text-mag-navy">{clinicContact.address}</p>
                <p className="text-sm text-mag-muted">
                  {clinicContact.city}, {clinicContact.country}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-mag-gold" />
              <div className="text-sm text-mag-muted">
                <p>{clinicContact.schedule.weekdays}</p>
                <p>{clinicContact.schedule.saturday}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-mag-gold" />
              <a href={buildPhoneUrl()} className="text-sm font-semibold text-mag-navy hover:text-mag-gold">
                {clinicContact.phoneDisplay}
              </a>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <MagrassCtaButton href={clinicContact.mapsUrl} label={location.ctaMaps} variant="secondary" className="sm:flex-1" />
              <MagrassCtaButton href={whatsappUrl} label={location.ctaBook} className="sm:flex-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
