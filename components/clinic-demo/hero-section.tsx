import { buildWhatsAppUrl } from '@/lib/clinic-demo/whatsapp';
import { ClinicCtaButton } from '@/components/clinic-demo/cta-button';
import { ClinicDoctorPhoto } from '@/components/clinic-demo/doctor-photo';
import { ClinicHeroVideoBackground } from '@/components/clinic-demo/hero-video-background';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

export function ClinicHeroSection({ demo }: { demo: ResolvedDemo }) {
  const { hero } = demo.home;
  const whatsappUrl = buildWhatsAppUrl(demo);

  const copyPanel = (
    <div className="w-full rounded-2xl border border-white/70 bg-demo-base/92 p-5 shadow-lg shadow-demo-charcoal/10 backdrop-blur-md sm:rounded-3xl sm:p-6 lg:p-8">
      <span className="inline-flex max-w-full rounded-full border border-demo-primary/40 bg-demo-soft/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-demo-badge sm:px-4 sm:text-xs">
        {hero.badge}
      </span>

      <h1 className="mt-4 max-w-xl font-display text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-demo-charcoal sm:mt-5 sm:text-4xl lg:mt-6 lg:max-w-none lg:text-5xl xl:text-[3.15rem]">
        {hero.title} <span className="text-demo-primary-dark">{hero.titleAccent}</span>
      </h1>

      <p className="mt-4 max-w-lg text-sm font-medium leading-relaxed text-slate-700 sm:mt-5 sm:text-base lg:max-w-xl lg:text-lg">
        {hero.subtitle}
      </p>
    </div>
  );

  const ctaBlock = (
    <>
      <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:max-w-none lg:justify-start">
        <ClinicCtaButton href={whatsappUrl} label={hero.primaryCta} className="sm:flex-1 sm:max-w-xs lg:flex-none" />
        <ClinicCtaButton
          href="#casos"
          label={hero.secondaryCta}
          variant="secondary"
          external={false}
          className="sm:flex-1 sm:max-w-xs lg:flex-none"
        />
      </div>
      <p className="text-xs font-medium sm:text-sm">
        <span className="text-demo-accent-deep" aria-hidden>
          {hero.ratingStars}
        </span>{' '}
        <span className="text-slate-600">{hero.ratingText}</span>
      </p>
    </>
  );

  return (
    <section data-nav-theme="light" className="relative isolate overflow-hidden bg-demo-base lg:min-h-[92vh]">
      <ClinicHeroVideoBackground demo={demo} />

      <div
        className="absolute inset-0 bg-gradient-to-b from-demo-base/80 via-white/55 to-demo-base/90 lg:bg-gradient-to-r lg:from-demo-base/88 lg:via-white/50 lg:to-demo-base/92"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:flex lg:min-h-[92vh] lg:items-center lg:px-8">
        <div className="flex w-full flex-col gap-6 py-10 sm:gap-8 sm:py-14 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-20">
          <div className="flex flex-col gap-5 lg:gap-6">
            <div className="flex min-h-[min(40vh,18rem)] flex-col items-center justify-center text-center sm:min-h-[min(42vh,19rem)] lg:min-h-0 lg:items-start lg:justify-center lg:text-left">
              {copyPanel}
            </div>

            <div className="hidden flex-col items-center gap-5 lg:flex lg:items-start">{ctaBlock}</div>
          </div>

          <div className="mx-auto w-full max-w-[17.5rem] sm:max-w-xs lg:mx-0 lg:max-w-none">
            <ClinicDoctorPhoto demo={demo} variant="hero" priority className="shadow-2xl ring-1 ring-demo-accent/40" />
          </div>

          <div className="flex flex-col items-center gap-5 text-center lg:hidden">{ctaBlock}</div>
        </div>
      </div>
    </section>
  );
}
