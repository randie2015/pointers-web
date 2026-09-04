'use client';

import { MapPin, Clock, Phone } from 'lucide-react';
import { aestheticContainer, aestheticSection } from '@/lib/aesthetic-demo/layout';
import { buildAestheticPhoneUrl, buildAestheticWhatsAppUrl } from '@/lib/aesthetic-demo/whatsapp';
import { AestheticCtaButton } from '@/components/aesthetic-demo/cta-button';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { cn } from '@/lib/utils';

export function AestheticLocationSection() {
  const demo = useAestheticDemo();
  const whatsappUrl = buildAestheticWhatsAppUrl(demo, 'location');

  return (
    <section className={cn(aestheticSection, 'bg-demo-base lg:py-24')}>
      <div className={aestheticContainer}>
        <div className="mx-auto grid max-w-5xl gap-5 sm:gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-demo-border bg-white shadow-sm sm:rounded-3xl">
            <div className="bg-demo-primary px-5 py-4 sm:px-6">
              <p className="font-playfair text-lg font-semibold text-white sm:text-xl">
                {demo.brand.name} · {demo.contact.city}
              </p>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-demo-jade" />
                <div>
                  <p className="text-sm font-medium text-demo-ink">{demo.contact.address}</p>
                  <p className="text-sm text-demo-muted">
                    {demo.contact.city}, {demo.contact.country}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-demo-jade" />
                <div className="text-sm text-demo-muted">
                  <p>{demo.contact.schedule.weekdays}</p>
                  <p>{demo.contact.schedule.saturday}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-demo-jade" />
                <a
                  href={buildAestheticPhoneUrl(demo)}
                  className="text-sm font-semibold text-demo-ink hover:text-demo-jade"
                >
                  {demo.contact.phoneDisplay}
                </a>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <AestheticCtaButton
                  href={demo.contact.mapsUrl}
                  label={demo.locationPage.ctaMaps}
                  variant="secondary"
                  className="w-full sm:flex-1"
                />
                <AestheticCtaButton
                  href={whatsappUrl}
                  label={demo.locationPage.ctaBook}
                  className="w-full sm:flex-1"
                />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-demo-border bg-white sm:rounded-3xl">
            <iframe
              title={`Mapa ${demo.brand.name}`}
              src={demo.contact.mapsEmbedUrl}
              className="h-64 w-full border-0 sm:h-72 lg:h-full lg:min-h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
