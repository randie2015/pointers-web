'use client';

import { aestheticContainer, aestheticSection } from '@/lib/aesthetic-demo/layout';
import { AestheticReveal, AestheticStagger, AestheticStaggerChild } from '@/components/aesthetic-demo/motion';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { cn } from '@/lib/utils';

function GoldStars() {
  return (
    <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 20 20" className="h-4 w-4 fill-demo-accent" aria-hidden>
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function AestheticTestimonialsSection() {
  const demo = useAestheticDemo();
  const { testimonials } = demo.home;

  return (
    <section className={cn(aestheticSection, 'bg-demo-soft')}>
      <div className={aestheticContainer}>
        <AestheticReveal className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-demo-accent sm:text-xs">
            {testimonials.eyebrow}
          </p>
          <h2 className="mt-3 font-playfair text-2xl font-semibold text-balance text-demo-ink sm:text-3xl lg:text-4xl">
            {testimonials.title}
          </h2>
        </AestheticReveal>

        <AestheticStagger className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.items.map((item) => (
            <AestheticStaggerChild key={item.id}>
              <article
                className={cn(
                  'flex h-full flex-col rounded-2xl border border-demo-accent/20 bg-white p-6 shadow-sm',
                  'transition-all duration-300 hover:-translate-y-1.5 hover:border-demo-accent/35 hover:shadow-lg hover:shadow-demo-primary/8 sm:p-7'
                )}
              >
                <GoldStars />

                <blockquote className="relative mt-5 flex-1">
                  <span
                    className="pointer-events-none absolute -top-2 -left-1 font-playfair text-4xl leading-none text-demo-accent/30"
                    aria-hidden
                  >
                    “
                  </span>
                  <p className="relative pl-4 text-sm leading-relaxed text-demo-ink/85 sm:text-[15px]">{item.quote}</p>
                </blockquote>

                <div className="mt-6 border-t border-demo-accent/15 pt-5">
                  <span className="inline-flex rounded-full border border-demo-accent/25 bg-demo-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-demo-ink sm:text-[11px]">
                    {item.treatment}
                  </span>
                  <p className="mt-4 font-playfair text-base font-semibold text-demo-ink">{item.patientName}</p>
                  <p className="mt-1 text-xs text-demo-ink/55">{item.patientMeta}</p>
                </div>
              </article>
            </AestheticStaggerChild>
          ))}
        </AestheticStagger>
      </div>
    </section>
  );
}
