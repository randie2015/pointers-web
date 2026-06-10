import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/ui/section-header';
import { SectionBadge } from '@/components/ui/section-badge';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight, Briefcase, ChartNoAxesCombined, Check, Linkedin, Sparkles, Target, X, Zap } from 'lucide-react';
import { BrandTrustSection } from '@/components/workflow/BrandTrustSection';
import { SpotlightCTA } from '@/components/sections/spotlight-cta';
import { AboutFaqAccordion } from '@/components/sections/about-faq-accordion';

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
    { title: t('pillars.items.0.title'), description: t('pillars.items.0.description'), Icon: Target, color: '#BC2656' },
    { title: t('pillars.items.1.title'), description: t('pillars.items.1.description'), Icon: Zap, color: '#39B8AD' },
    { title: t('pillars.items.2.title'), description: t('pillars.items.2.description'), Icon: ChartNoAxesCombined, color: '#5E549D' }
  ];

  const values = [
    { title: t('values.items.0.title'), description: t('values.items.0.description'), Icon: Sparkles, color: '#BC2656' },
    { title: t('values.items.1.title'), description: t('values.items.1.description'), Icon: ArrowRight, color: '#39B8AD' },
    { title: t('values.items.2.title'), description: t('values.items.2.description'), Icon: Briefcase, color: '#5E549D' },
    { title: t('values.items.3.title'), description: t('values.items.3.description'), Icon: Target, color: '#BC2656' }
  ];

  const faq = [
    t('faq.questions.0'),
    t('faq.questions.1'),
    t('faq.questions.2'),
    t('faq.questions.3'),
    t('faq.questions.4')
  ];

  const team = [
    { name: 'Luis Diego Medina', role: 'Director Estratégico y Fundador', imageSrc: '/diego.png' },
    { name: 'Nicoll', role: 'Directora Creativa' },
    { name: 'Cesar Belan', role: 'Asesor Estratégico' }
  ] as const;

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-14 md:pt-20">
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
      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader eyebrow={t('missionVision.eyebrow')} title={t('missionVision.title')} />
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <Reveal delay={0.05}>
              <article className="group rounded-3xl border border-border/70 bg-gray-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#BC2656]/25 md:p-10">
                <p className="text-sm font-semibold text-[#BC2656] transition-colors duration-300 group-hover:text-[#BC2656]">
                  {t('missionVision.mission.title')}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-700 md:text-xl">{t('missionVision.mission.body')}</p>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className="group rounded-3xl border border-border/70 bg-gray-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#5E549D]/25 md:p-10">
                <p className="text-sm font-semibold text-[#5E549D] transition-colors duration-300 group-hover:text-[#5E549D]">
                  {t('missionVision.vision.title')}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-700 md:text-xl">{t('missionVision.vision.body')}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader eyebrow={t('pillars.eyebrow')} title={t('pillars.title')} />
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <article className="group rounded-3xl border border-border/70 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${p.color}1F`, color: p.color }}
                  >
                    <p.Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-gray-900">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">{p.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader eyebrow={t('values.eyebrow')} title={t('values.title')} subtitle={t('values.subtitle')} />
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <article className="rounded-3xl border border-border/70 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${v.color}1F`, color: v.color }}
                    >
                      <v.Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">{v.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">{v.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-gray-50 py-20 md:py-28">
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
      <section className="bg-white py-20 md:py-28">
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
      <section className="bg-white py-20 md:py-28">
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

