import { MapPin, Clock, Phone } from 'lucide-react';
import { clinicBrand, clinicContact, clinicHome } from '@/src/data/alejandraData';
import { buildPhoneUrl, buildWhatsAppUrl } from '@/lib/dra-alejandra/whatsapp';
import { DraAlejandraCtaButton } from '@/components/dra-alejandra/cta-button';

export function DraAlejandraLocationSection() {
  const { location } = clinicHome;
  const mapsUrl = clinicContact.mapsUrl;
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section className="bg-ale-ivory py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl font-bold text-ale-ink sm:text-3xl lg:text-4xl">
          {location.title}
        </h2>

        <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-ale-gold/40 bg-white shadow-md sm:mt-10 sm:rounded-3xl">
          <div className="bg-gradient-to-r from-ale-rose to-ale-cta px-4 py-3 sm:px-6 sm:py-4">
            <p className="font-display text-base font-semibold text-white sm:text-lg">
              {clinicBrand.subbrand} · {clinicContact.city}
            </p>
          </div>

          <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ale-cta" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-ale-ink">{clinicContact.address}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-ale-cta" />
              <div className="min-w-0 text-sm text-slate-600">
                <p>{clinicContact.schedule.weekdays}</p>
                <p>{clinicContact.schedule.saturday}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-ale-cta" />
              <a href={buildPhoneUrl()} className="text-sm font-medium text-ale-cta hover:underline">
                {clinicContact.phoneDisplay}
              </a>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:pt-2">
              <DraAlejandraCtaButton href={mapsUrl} label={location.ctaMaps} variant="secondary" className="sm:flex-1" />
              <DraAlejandraCtaButton href={whatsappUrl} label={location.ctaReception} className="sm:flex-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
