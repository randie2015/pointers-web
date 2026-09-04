'use client';

import { aestheticContainer, aestheticSection } from '@/lib/aesthetic-demo/layout';
import { AestheticReveal } from '@/components/aesthetic-demo/motion';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { cn } from '@/lib/utils';

export function AestheticHeroSection() {
  const demo = useAestheticDemo();
  const { hero } = demo.home;

  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-demo-primary sm:min-h-[72vh] lg:min-h-[80vh] xl:min-h-[88vh]">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={demo.brand.heroPoster}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src={demo.brand.heroVideo} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-r from-demo-primary/90 via-demo-primary/65 to-demo-primary/35 sm:from-demo-primary/85 sm:via-demo-primary/55 sm:to-demo-primary/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-demo-primary/80 via-transparent to-demo-primary/25"
        aria-hidden
      />

      <div
        className={cn(
          aestheticContainer,
          'relative z-10 flex min-h-[60vh] items-center py-14 sm:min-h-[72vh] sm:py-16 lg:min-h-[80vh] lg:py-20 xl:min-h-[88vh] xl:py-24'
        )}
      >
        <AestheticReveal className="max-w-3xl">
          <span className="inline-flex rounded-full border border-demo-accent/60 bg-demo-primary/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-demo-accent backdrop-blur-sm sm:px-4 sm:text-xs">
            {hero.badge}
          </span>

          <h1 className="mt-4 font-playfair text-[1.65rem] font-semibold leading-[1.15] text-balance text-white sm:mt-5 sm:text-4xl lg:text-5xl xl:text-[3.15rem]">
            {hero.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/85 sm:mt-5 sm:text-base lg:text-lg">
            {hero.subtitle}
          </p>
        </AestheticReveal>
      </div>
    </section>
  );
}

export function AestheticValuePillarsSection() {
  const demo = useAestheticDemo();
  const { valuePillars } = demo.home;

  return (
    <section className={cn('bg-demo-base', aestheticSection)}>
      <div className={aestheticContainer}>
        <AestheticReveal className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-demo-jade sm:text-xs">
            Propuesta de valor
          </p>
          <h2 className="mt-2 font-playfair text-2xl font-semibold text-balance text-demo-ink sm:text-3xl lg:text-4xl">
            Excelencia clínica con enfoque humano
          </h2>
        </AestheticReveal>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {valuePillars.map((pillar, index) => (
            <AestheticReveal key={pillar.title} delay={index * 0.1}>
              <article className="group rounded-2xl border border-demo-border bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-demo-accent/50 hover:shadow-xl hover:shadow-demo-primary/5 sm:rounded-3xl sm:p-6">
                <h3 className="font-playfair text-lg font-semibold text-demo-ink sm:text-xl">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-demo-muted">{pillar.description}</p>
              </article>
            </AestheticReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
