'use client';

import { clinicHome } from '@/src/data/magrassData';
import { magrassContainer, magrassSection } from '@/lib/magrass-lagree/layout';
import { MagrassReveal, MagrassStagger, MagrassStaggerChild } from '@/components/magrass-lagree/motion';
import { cn } from '@/lib/utils';

function GoldStars() {
  return (
    <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className="h-4 w-4 fill-[#C5A880]"
          aria-hidden
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function MagrassTestimonialsSection() {
  const { testimonials } = clinicHome;

  return (
    <section className={cn(magrassSection, 'bg-[#F8F6F2]')}>
      <div className={magrassContainer}>
        <MagrassReveal className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A880] sm:text-xs">
            {testimonials.eyebrow}
          </p>
          <h2 className="mt-3 font-playfair text-2xl font-semibold text-balance text-[#1C2331] sm:text-3xl lg:text-4xl">
            {testimonials.title}
          </h2>
        </MagrassReveal>

        <MagrassStagger className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.items.map((item) => (
            <MagrassStaggerChild key={item.id}>
              <article
                className={cn(
                  'flex h-full flex-col rounded-2xl border border-[#C5A880]/20 bg-white p-6 shadow-sm',
                  'transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C5A880]/35 hover:shadow-lg hover:shadow-[#1C2331]/8 sm:p-7'
                )}
              >
                <GoldStars />

                <blockquote className="relative mt-5 flex-1">
                  <span
                    className="pointer-events-none absolute -top-2 -left-1 font-playfair text-4xl leading-none text-[#C5A880]/30"
                    aria-hidden
                  >
                    “
                  </span>
                  <p className="relative pl-4 text-sm leading-relaxed text-[#1C2331]/85 sm:text-[15px]">
                    {item.quote}
                  </p>
                </blockquote>

                <div className="mt-6 border-t border-[#C5A880]/15 pt-5">
                  <span className="inline-flex rounded-full border border-[#C5A880]/25 bg-[#F8F6F2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1C2331] sm:text-[11px]">
                    {item.treatment}
                  </span>
                  <p className="mt-4 font-playfair text-base font-semibold text-[#1C2331]">{item.patientName}</p>
                  <p className="mt-1 text-xs text-[#1C2331]/55">{item.patientMeta}</p>
                </div>
              </article>
            </MagrassStaggerChild>
          ))}
        </MagrassStagger>
      </div>
    </section>
  );
}
