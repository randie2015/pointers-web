import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/ui/section-header';
import { SectionBadge } from '@/components/ui/section-badge';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Check, Linkedin, X } from 'lucide-react';
import { BrandTrustSection } from '@/components/workflow/BrandTrustSection';
import { SpotlightCTA } from '@/components/sections/spotlight-cta';
import { AboutFaqAccordion } from '@/components/sections/about-faq-accordion';
import { MissionVisionCards, PillarCard, ValueCard } from '@/components/nosotros/about-cards';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  const pillars = [
    { title: t('pillars.items.0.title'), description: t('pillars.items.0.description'), color: '#BC2656' },
    { title: t('pillars.items.1.title'), description: t('pillars.items.1.description'), color: '#39B8AD' },
    { title: t('pillars.items.2.title'), description: t('pillars.items.2.description'), color: '#5E549D' }
  ];

  const values = [
    { title: t('values.items.0.title'), description: t('values.items.0.description'), color: '#BC2656' },
    { title: t('values.items.1.title'), description: t('values.items.1.description'), color: '#39B8AD' },
    { title: t('values.items.2.title'), description: t('values.items.2.description'), color: '#5E549D' },
    { title: t('values.items.3.title'), description: t('values.items.3.description'), color: '#BC2656' }
  ];

  const team = (t.raw('team.members') as Array<{ name: string; role: string }>).map((member, index) => ({
    ...member,
    ...(index === 0 ? { imageSrc: '/diego.png' as const } : {})
  }));

  return (
    <main>
      {/* Hero */}
      <section className="relative z-[1] overflow-hidden pt-14 md:pt-20">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <SectionBadge text={t('hero.eyebrow')} />
              <h1 className="h-display mt-5 text-3xl leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                {t('hero.subtitle')}
              </p>
            </div>
          </Reveal>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-72 w-[min(900px,92vw)] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 30% 40%, rgba(188,38,86,0.22), transparent 55%), radial-gradient(circle at 70% 55%, rgba(57,184,173,0.18), transparent 55%), radial-gradient(circle at 55% 20%, rgba(94,84,157,0.18), transparent 55%)'
          }}
        />
      </section>

      <BrandTrustSection />

      {/* Mission & Vision */}
      <section className="relative z-[1] py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader eyebrow={t('missionVision.eyebrow')} title={t('missionVision.title')} />
          </Reveal>

          <MissionVisionCards
            missionTitle={t('missionVision.mission.title')}
            missionBody={t('missionVision.mission.body')}
            visionTitle={t('missionVision.vision.title')}
            visionBody={t('missionVision.vision.body')}
          />
        </div>
      </section>

      {/* Pillars */}
      <section className="relative z-[1] py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader eyebrow={t('pillars.eyebrow')} title={t('pillars.title')} />
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.map((p, i) => (
              <PillarCard key={p.title} title={p.title} description={p.description} color={p.color} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-[1] py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader eyebrow={t('values.eyebrow')} title={t('values.title')} subtitle={t('values.subtitle')} />
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {values.map((v, i) => (
              <ValueCard key={v.title} title={v.title} description={v.description} color={v.color} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative z-[1] py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader eyebrow={t('whyUs.eyebrow')} title={t('whyUs.title')} subtitle={t('whyUs.subtitle')} />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal delay={0.05}>
              <article className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="mb-6 text-2xl font-semibold text-gray-800">{t('whyUs.others.title')}</h3>
                <ul className="flex flex-col gap-6 text-sm leading-relaxed text-gray-600 md:text-base">
                  <li className="flex items-start gap-4">
                    <X className="mt-0.5 h-6 w-6 shrink-0 text-gray-700" aria-hidden />
                    <span>{t('whyUs.others.bullets.0')}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <X className="mt-0.5 h-6 w-6 shrink-0 text-gray-700" aria-hidden />
                    <span>{t('whyUs.others.bullets.1')}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <X className="mt-0.5 h-6 w-6 shrink-0 text-gray-700" aria-hidden />
                    <span>{t('whyUs.others.bullets.2')}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <X className="mt-0.5 h-6 w-6 shrink-0 text-gray-700" aria-hidden />
                    <span>{t('whyUs.others.bullets.3')}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <X className="mt-0.5 h-6 w-6 shrink-0 text-gray-700" aria-hidden />
                    <span>{t('whyUs.others.result')}</span>
                  </li>
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.1}>
              <article className="rounded-3xl bg-[#BC2656] p-8 shadow-sm">
                <h3 className="mb-6 text-2xl font-semibold text-white">{t('whyUs.pointers.title')}</h3>
                <ul className="flex flex-col gap-6 text-sm leading-relaxed text-white/90 md:text-base">
                  <li className="flex items-start gap-4">
                    <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" aria-hidden />
                    <span>{t('whyUs.pointers.bullets.0')}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" aria-hidden />
                    <span>{t('whyUs.pointers.bullets.1')}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" aria-hidden />
                    <span>{t('whyUs.pointers.bullets.2')}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" aria-hidden />
                    <span>{t('whyUs.pointers.bullets.3')}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" aria-hidden />
                    <span>{t('whyUs.pointers.result')}</span>
                  </li>
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative z-[1] py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader eyebrow={t('team.eyebrow')} title={t('team.title')} subtitle={t('team.subtitle')} />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06}>
                <article className="rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200">
                    {('imageSrc' in m && m.imageSrc) ? (
                      <Image
                        src={m.imageSrc}
                        alt={m.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-cover"
                        priority={i === 0}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100" />
                    )}
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold text-gray-900">{m.name}</p>
                      <p className="mt-1 truncate text-sm font-medium text-[#BC2656]">{m.role}</p>
                    </div>
                    <Linkedin className="h-5 w-5 shrink-0 text-gray-400" aria-hidden />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SpotlightCTA />

      {/* FAQ (questions only, per provided content) */}
      <section className="relative z-[1] py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader eyebrow={t('faq.eyebrow')} title={t('faq.title')} subtitle={t('faq.subtitle')} />
          </Reveal>

          <div className="mt-14">
            <AboutFaqAccordion />
          </div>
        </div>
      </section>
    </main>
  );
}

