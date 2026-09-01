'use client';

import { clinicHome } from '@/src/data/magrassData';
import { MagrassReveal } from '@/components/magrass-lagree/motion';

export function MagrassHeroSection() {
  const { hero } = clinicHome;

  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-[#192031] sm:min-h-[80vh] lg:min-h-[88vh]">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src="/magrass-lagree/hero.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-r from-[#192031]/85 via-[#192031]/55 to-[#192031]/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#192031]/70 via-transparent to-[#192031]/20"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl items-center px-6 py-16 sm:min-h-[80vh] sm:py-20 md:px-12 lg:min-h-[88vh] lg:py-24">
        <MagrassReveal className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[#C5A57D]/60 bg-[#192031]/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#C5A57D] backdrop-blur-sm sm:px-4 sm:text-xs">
            {hero.badge}
          </span>

          <h1 className="mt-5 font-playfair text-[1.85rem] font-semibold leading-[1.12] text-white sm:text-4xl lg:text-5xl xl:text-[3.15rem]">
            {hero.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/80 sm:mt-5 sm:text-base lg:text-lg">
            {hero.subtitle}
          </p>
        </MagrassReveal>
      </div>
    </section>
  );
}

export function MagrassValuePillarsSection() {
  const { valuePillars } = clinicHome;

  return (
    <section className="bg-[#FAFAFA] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <MagrassReveal className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#197876] sm:text-xs">
            Propuesta de valor
          </p>
          <h2 className="mt-2 font-playfair text-2xl font-semibold text-[#192031] sm:text-3xl lg:text-4xl">
            Excelencia clínica con enfoque humano
          </h2>
        </MagrassReveal>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-6">
          {valuePillars.map((pillar, index) => (
            <MagrassReveal key={pillar.title} delay={index * 0.1}>
              <article className="group rounded-2xl border border-mag-border bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#C5A880]/50 hover:shadow-xl hover:shadow-[#1C2331]/5 sm:rounded-3xl sm:p-6">
                <h3 className="font-playfair text-lg font-semibold text-[#192031] sm:text-xl">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mag-muted">{pillar.description}</p>
              </article>
            </MagrassReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
