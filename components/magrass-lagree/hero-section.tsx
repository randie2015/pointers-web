'use client';

import Link from 'next/link';
import { clinicHome, MAGRASS_BASE } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { MagrassReveal } from '@/components/magrass-lagree/motion';

export function MagrassHeroSection() {
  const { hero } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl('home');

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div
        className="absolute inset-0 bg-[url('/magrass-lagree/hero-poster.webp')] bg-cover bg-center opacity-[0.06] transition-transform duration-700"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <MagrassReveal className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[#C5A57D]/70 bg-[#FAFAFA] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#197876] sm:px-4 sm:text-xs">
            {hero.badge}
          </span>

          <h1 className="mt-5 font-playfair text-[1.85rem] font-semibold leading-[1.12] text-[#192031] sm:text-4xl lg:text-5xl xl:text-[3.15rem]">
            {hero.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-mag-muted sm:mt-5 sm:text-base lg:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-7 flex w-full max-w-lg flex-col gap-3 sm:mt-8 sm:flex-row">
            <MagrassCtaButton href={whatsappUrl} label={hero.primaryCta} className="sm:flex-1" />
            <MagrassCtaButton
              href={`${MAGRASS_BASE}/tratamientos`}
              label={hero.secondaryCta}
              variant="secondary"
              external={false}
              className="sm:flex-1"
              shimmer={false}
            />
          </div>
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
