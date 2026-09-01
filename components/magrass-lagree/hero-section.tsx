import { clinicHome } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { Shield, Sparkles, Stethoscope } from 'lucide-react';

const trustIcons = [Stethoscope, Sparkles, Shield] as const;

export function MagrassHeroSection() {
  const { hero } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section
      id="inicio"
      className="relative scroll-mt-20 overflow-hidden bg-mag-ivory lg:min-h-[88vh]"
    >
      <div
        className="absolute inset-0 bg-[url('/magrass-lagree/hero-poster.webp')] bg-cover bg-center opacity-20"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-mag-ivory/90 via-mag-ivory/80 to-mag-ivory"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 lg:min-h-[88vh] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-mag-gold/50 bg-mag-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-mag-navy backdrop-blur-sm sm:px-4 sm:text-xs">
            {hero.badge}
          </span>

          <h1 className="mt-5 font-playfair text-[1.85rem] font-semibold leading-[1.1] text-mag-navy sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
            {hero.title}{' '}
            <span className="text-mag-gold">{hero.titleAccent}</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-mag-muted sm:mt-5 sm:text-base lg:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <MagrassCtaButton href={whatsappUrl} label={hero.primaryCta} className="sm:flex-1 sm:max-w-xs" />
            <MagrassCtaButton
              href="#tratamientos"
              label={hero.secondaryCta}
              variant="secondary"
              external={false}
              className="sm:flex-1 sm:max-w-xs"
            />
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3">
            {hero.trustBadges.map((badge, index) => {
              const Icon = trustIcons[index] ?? Shield;
              return (
                <div
                  key={badge}
                  className="flex items-start gap-3 rounded-2xl border border-mag-border bg-mag-white/90 p-4 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mag-gold/15 text-mag-gold">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <p className="text-xs font-semibold leading-snug text-mag-navy sm:text-sm">{badge}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
