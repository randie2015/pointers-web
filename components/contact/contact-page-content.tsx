'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { WhiteParticlesSection } from '@/components/hero/white-particles-section';
import { ContactQualificationForm } from '@/components/contact/contact-qualification-form';
import { getWhatsAppDisplayNumber } from '@/lib/site-config';

export function ContactPageContent() {
  const t = useTranslations('contact');
  const searchParams = useSearchParams();
  const initialService = searchParams.get('servicio') ?? undefined;
  const initialPlan = searchParams.get('plan') ?? undefined;

  return (
    <WhiteParticlesSection id="contacto" className="scroll-mt-24 py-14 sm:py-16 md:py-24" particlesId="contact-page-particles">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14 lg:items-start">
          <Reveal>
            <aside className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#5E549D]">{t('eyebrow')}</p>
                <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                  {t('pageTitle')}
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">{t('pageSubtitle')}</p>
              </div>

              <div className="mobile-surface rounded-2xl border border-border/60 bg-white/90 p-6 backdrop-blur-sm sm:p-7">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#BC2656]" aria-hidden />
                  <div>
                    <p className="font-semibold text-gray-900">{t('locationTitle')}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{t('locationBody')}</p>
                  </div>
                </div>
              </div>

              <ul className="space-y-4">
                {[ShieldCheck, Sparkles].map((Icon, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: 'rgba(57, 184, 173, 0.12)', color: '#39B8AD' }}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{t(`trustItems.${i}.title`)}</p>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">{t(`trustItems.${i}.body`)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-500">
                {t('whatsappHint')}{' '}
                <span className="font-medium text-gray-700">{getWhatsAppDisplayNumber()}</span>
              </p>
            </aside>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mobile-surface rounded-2xl border border-border/60 bg-white/95 p-6 shadow-lg shadow-black/[0.06] backdrop-blur-sm sm:p-8 md:p-10">
              <h2 className="font-display text-xl font-semibold text-gray-900 sm:text-2xl">{t('formTitle')}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{t('formSubtitle')}</p>
              <div className="mt-8">
                <ContactQualificationForm initialService={initialService} initialPlan={initialPlan} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </WhiteParticlesSection>
  );
}
