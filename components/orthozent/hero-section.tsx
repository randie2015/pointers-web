import { clinicHome } from '@/src/data/orthozentData';
import { buildWhatsAppUrl } from '@/lib/orthozent/whatsapp';
import { OrthozentCtaButton } from '@/components/orthozent/cta-button';
import { OrthozentDoctorPhoto } from '@/components/orthozent/doctor-photo';
import { OrthozentHeroVideoBackground } from '@/components/orthozent/hero-video-background';

export function OrthozentHeroSection() {
  const { hero } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl();

  const ctaBlock = (
    <>
      <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:max-w-none lg:justify-start">
        <OrthozentCtaButton
          href={whatsappUrl}
          label={hero.primaryCta}
          className="sm:flex-1 sm:max-w-xs lg:flex-none"
        />
        <OrthozentCtaButton
          href="#tratamientos"
          label={hero.secondaryCta}
          variant="secondary"
          external={false}
          className="border-white/40 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:text-white sm:flex-1 sm:max-w-xs lg:flex-none max-lg:border-ortho-neutral/40 max-lg:bg-white max-lg:text-ortho-ink max-lg:hover:border-ortho-primary max-lg:hover:bg-ortho-base max-lg:hover:text-ortho-primary"
        />
      </div>
      <p className="text-xs font-medium text-ortho-gold sm:text-sm">{hero.rating}</p>
    </>
  );

  return (
    <section className="relative isolate overflow-hidden bg-ortho-dark lg:min-h-[90vh]">
      <OrthozentHeroVideoBackground />

      <div
        className="absolute inset-0 bg-gradient-to-b from-ortho-dark/35 via-ortho-dark/20 to-ortho-base lg:bg-gradient-to-r lg:from-ortho-dark/90 lg:via-ortho-dark/75 lg:to-ortho-dark/55"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:flex lg:min-h-[90vh] lg:items-center lg:px-8">
        <div className="flex w-full flex-col gap-8 py-8 sm:gap-10 sm:py-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-20">
          <div className="flex flex-col lg:gap-0">
            <div className="flex min-h-[min(48vh,22rem)] flex-col items-center justify-center text-center sm:min-h-[min(50vh,24rem)] lg:min-h-0 lg:items-start lg:justify-center lg:text-left">
              <span className="inline-flex max-w-full rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ortho-gold backdrop-blur-sm sm:px-4 sm:text-xs">
                {hero.badge}
              </span>

              <h1 className="mt-4 max-w-xl font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight text-white sm:mt-5 sm:text-4xl lg:mt-6 lg:max-w-none lg:text-5xl xl:text-[3.25rem]">
                {hero.title}{' '}
                <span className="text-ortho-gold">{hero.titleAccent}</span>
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-100 sm:mt-5 sm:text-base lg:max-w-xl lg:text-lg">
                {hero.subtitle}
              </p>
            </div>

            <div className="mt-8 hidden flex-col items-center gap-5 lg:mt-8 lg:flex lg:items-start">
              {ctaBlock}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[17.5rem] sm:max-w-xs lg:mx-0 lg:max-w-none">
            <OrthozentDoctorPhoto variant="hero" priority className="shadow-2xl ring-1 ring-white/20" />
          </div>

          <div className="flex flex-col items-center gap-5 text-center lg:hidden">{ctaBlock}</div>
        </div>
      </div>
    </section>
  );
}
