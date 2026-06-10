'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { ServiceVisual } from '@/components/sections/service-visual';
import { SectionHeader } from '@/components/ui/section-header';

const variants = ['branding', 'web', 'content', 'ads'] as const;

export function ServicesSection() {
  const t = useTranslations('services');
  const items = t.raw('items') as {
    badge: string;
    title: string;
    description: string;
    tags: string[];
  }[];

  return (
    <section id="servicios" className="scroll-mt-24 py-20 md:py-28 bg-muted/40">
      <div className="container-page">
        <Reveal>
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        </Reveal>

        <div className="mt-16 md:mt-20 space-y-24 md:space-y-32">
          {items.map((item, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={item.badge}
                className={`grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <Reveal delay={0.05}>
                  <ServiceVisual variant={variants[i]} />
                </Reveal>
                <Reveal delay={0.1}>
                  <span className="inline-block rounded-lg bg-purple px-3 py-1 text-xs font-semibold text-white">
                    {item.badge}
                  </span>
                  <h3 className="h-display mt-5 text-2xl md:text-4xl max-w-lg">{item.title}</h3>
                  <p className="mt-5 text-muted-foreground leading-relaxed">{item.description}</p>
                  <ul className="mt-8 flex flex-col gap-3">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <span className="inline-block w-full sm:w-auto rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background text-center sm:text-left">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
