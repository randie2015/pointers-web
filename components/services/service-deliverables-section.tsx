'use client';

import type { LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/ui/section-header';
import { SERVICE_MAGENTA } from '@/lib/service-brand';

type Deliverable = {
  title: string;
  description: string;
};

type ServiceDeliverablesSectionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Deliverable[];
  icons: LucideIcon[];
};

export function ServiceDeliverablesSection({
  eyebrow,
  title,
  subtitle,
  items,
  icons
}: ServiceDeliverablesSectionProps) {
  return (
    <section className="relative z-[1] py-14 sm:py-16 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {items.map((item, i) => {
            const Icon = icons[i] ?? icons[0];
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <article className="mobile-surface group flex h-full flex-col rounded-2xl border border-border/60 bg-white p-5 transition-all duration-500 ease-in-out active:shadow-md sm:p-6 md:p-7 md:hover:-translate-y-1 md:hover:shadow-lg">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12"
                    style={{ backgroundColor: `${SERVICE_MAGENTA}14`, color: SERVICE_MAGENTA }}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-gray-900 sm:mt-5 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
