'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { ServiceVisual } from '@/components/sections/service-visual';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { SERVICE_SLUGS } from '@/lib/services';

const VARIANTS = ['branding', 'web', 'content', 'ads'] as const;

export function ServicesOfferingsSection() {
  const t = useTranslations('servicesPage.offerings');
  const items = t.raw('items') as {
    badge: string;
    title: string;
    description: string;
    tags: string[];
  }[];

  return (
    <section className="scroll-mt-24 bg-muted/40 py-20 md:py-28">
      <div className="container-page">
        <div className="space-y-24 md:space-y-32">
          {items.map((item, i) => {
            const reversed = i % 2 === 1;
            const slug = SERVICE_SLUGS[i];

            return (
              <div
                key={slug}
                className={`grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <Reveal delay={0.05}>
                  <ServiceVisual variant={VARIANTS[i]} />
                </Reveal>
                <Reveal delay={0.1}>
                  <span className="inline-block rounded-lg bg-purple px-3 py-1 text-xs font-semibold text-white">
                    {item.badge}
                  </span>
                  <h2 className="h-display mt-5 max-w-lg text-2xl md:text-4xl">{item.title}</h2>
                  <p className="mt-5 leading-relaxed text-muted-foreground">{item.description}</p>
                  <ul className="mt-8 flex flex-col gap-3">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <span className="inline-block w-full rounded-xl bg-foreground px-5 py-3 text-center text-sm font-medium text-background sm:w-auto sm:text-left">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <MaskUpButton href={`/servicios/${slug}`} label={t('cta')} />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
