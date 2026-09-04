'use client';

import Image from 'next/image';
import { aestheticContainer, aestheticSection } from '@/lib/aesthetic-demo/layout';
import { buildAestheticWhatsAppUrl } from '@/lib/aesthetic-demo/whatsapp';
import { AestheticStagger, AestheticStaggerChild } from '@/components/aesthetic-demo/motion';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { cn } from '@/lib/utils';

export function AestheticTeamSection() {
  const demo = useAestheticDemo();

  return (
    <section className={cn(aestheticSection, 'bg-white lg:py-24')}>
      <div className={aestheticContainer}>
        <AestheticStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {demo.specialists.map((specialist) => (
            <AestheticStaggerChild key={specialist.id}>
              <article
                className={cn(
                  'group flex h-full flex-col rounded-2xl border border-demo-border bg-white p-3',
                  'transition-all duration-500 hover:-translate-y-2 hover:border-demo-accent/30 hover:shadow-xl hover:shadow-demo-primary/10 sm:p-4'
                )}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-demo-soft">
                  <Image
                    src={specialist.image}
                    alt={specialist.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-demo-primary/55 via-demo-primary/10 to-transparent"
                    aria-hidden
                  />
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-demo-ink backdrop-blur-sm sm:text-[11px]">
                    {specialist.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col pt-4 sm:pt-5">
                  <h3 className="font-playfair text-lg font-semibold leading-snug text-demo-ink sm:text-xl">
                    {specialist.name}
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-demo-accent sm:text-[11px]">
                    {specialist.role}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-demo-muted">{specialist.specialty}</p>
                  <a
                    href={buildAestheticWhatsAppUrl(demo, { type: 'specialist', name: specialist.name })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-demo-jade transition-colors duration-300 group-hover:text-demo-ink"
                  >
                    Agendar con especialista
                    <span aria-hidden className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </article>
            </AestheticStaggerChild>
          ))}
        </AestheticStagger>
      </div>
    </section>
  );
}
