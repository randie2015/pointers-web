import { MapPin, Clock, Phone } from 'lucide-react';
import { buildPhoneUrl, buildWhatsAppUrl } from '@/lib/clinic-demo/whatsapp';
import { ClinicCtaButton } from '@/components/clinic-demo/cta-button';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

export function ClinicLocationSection({ demo }: { demo: ResolvedDemo }) {
  const { location } = demo.home;
  const mapsUrl = demo.contact.mapsUrl;
  const whatsappUrl = buildWhatsAppUrl(demo);

  return (
    <section data-nav-theme="light" className="bg-demo-base py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl font-bold text-demo-charcoal sm:text-3xl lg:text-4xl">
          {location.title}
        </h2>

        <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-demo-accent/40 bg-white shadow-md sm:mt-10 sm:rounded-3xl">
          <div className="bg-gradient-to-r from-demo-soft to-demo-primary px-4 py-3 sm:px-6 sm:py-4">
            <p className="font-display text-base font-semibold text-white sm:text-lg">
              {demo.brand.subbrand} · {demo.contact.city}
            </p>
          </div>

          <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-demo-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-demo-ink">{demo.contact.address}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-demo-primary" />
              <div className="min-w-0 text-sm font-medium text-slate-700">
                <p>{demo.contact.schedule.weekdays}</p>
                <p>{demo.contact.schedule.saturday}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-demo-primary" />
              <a href={buildPhoneUrl(demo)} className="text-sm font-medium text-demo-primary hover:underline">
                {demo.contact.phoneDisplay}
              </a>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:pt-2">
              <ClinicCtaButton href={mapsUrl} label={location.ctaMaps} variant="secondary" className="sm:flex-1" />
              <ClinicCtaButton href={whatsappUrl} label={location.ctaReception} className="sm:flex-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
