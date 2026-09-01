'use client';

import Image from 'next/image';
import { specialists } from '@/src/data/magrassData';
import { magrassContainer, magrassSection } from '@/lib/magrass-lagree/layout';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassStagger, MagrassStaggerChild } from '@/components/magrass-lagree/motion';
import { cn } from '@/lib/utils';

export function MagrassTeamSection() {
  return (
    <section className={cn(magrassSection, 'bg-mag-white lg:py-24')}>
      <div className={magrassContainer}>
        <MagrassStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specialists.map((specialist) => (
            <MagrassStaggerChild key={specialist.id}>
              <article
                className={cn(
                  'group flex h-full flex-col rounded-2xl border border-[#F0EBE3] bg-white p-3',
                  'transition-all duration-500 hover:-translate-y-2 hover:border-[#C5A880]/30 hover:shadow-xl hover:shadow-[#1C2331]/10 sm:p-4'
                )}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F8F6F2]">
                  <Image
                    src={specialist.image}
                    alt={specialist.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C2331]/55 via-[#1C2331]/10 to-transparent"
                    aria-hidden
                  />
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-[#1C2331] backdrop-blur-sm sm:text-[11px]">
                    {specialist.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col pt-4 sm:pt-5">
                  <h3 className="font-playfair text-lg font-semibold leading-snug text-[#1C2331] sm:text-xl">
                    {specialist.name}
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#C5A880] sm:text-[11px]">
                    {specialist.role}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mag-muted">{specialist.specialty}</p>
                  <a
                    href={buildWhatsAppUrl({ type: 'specialist', name: specialist.name })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-[#197876] transition-colors duration-300 group-hover:text-[#1C2331]"
                  >
                    Agendar con especialista
                    <span aria-hidden className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </article>
            </MagrassStaggerChild>
          ))}
        </MagrassStagger>
      </div>
    </section>
  );
}
