'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Mail, Phone, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';
import { ContactQualificationForm } from '@/components/contact/contact-qualification-form';
import { VioletMagentaGradientBg } from '@/components/ui/violet-magenta-gradient-bg';
import { getContactEmail, getWhatsAppDisplayNumber, WHATSAPP_PHONE } from '@/lib/site-config';

function ContactChannelCard({
  icon: Icon,
  label,
  value,
  href
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="solid-block group flex flex-col items-center justify-center rounded-3xl bg-[#BC2656] px-6 py-10 text-center text-white shadow-lg shadow-[#BC2656]/25 transition duration-300 hover:brightness-105 active:scale-[0.98] sm:py-12"
    >
      <Icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.75} aria-hidden />
      <p className="mt-4 text-lg font-semibold sm:text-xl">{label}</p>
      <p className="mt-2 break-all text-sm text-white/90 transition group-hover:text-white sm:text-base">
        {value}
      </p>
    </a>
  );
}

export function ContactPageContent() {
  const t = useTranslations('contact');
  const searchParams = useSearchParams();
  const initialService = searchParams.get('servicio') ?? undefined;
  const initialPlan = searchParams.get('plan') ?? undefined;

  const contactEmail = getContactEmail();
  const phoneDisplay = getWhatsAppDisplayNumber();

  return (
    <section id="contacto" className="relative z-[1] scroll-mt-24 py-14 sm:py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge text={t('eyebrow')} />
            <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              {t('pageTitle')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
              {t('pageSubtitle')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
            <ContactChannelCard
              icon={Mail}
              label={t('emailLabel')}
              value={contactEmail}
              href={`mailto:${contactEmail}`}
            />
            <ContactChannelCard
              icon={Phone}
              label={t('phoneLabel')}
              value={phoneDisplay}
              href={`tel:+${WHATSAPP_PHONE}`}
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl px-6 py-8 shadow-lg shadow-[#5E549D]/20 sm:mt-12 sm:p-10 md:p-12">
            <VioletMagentaGradientBg />
            <div className="relative z-10">
              <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
                {t('formTitle')}
              </h2>
              <p className="mt-2 text-center text-sm leading-relaxed text-white/90">{t('formSubtitle')}</p>
              <div className="mt-8">
                <ContactQualificationForm initialService={initialService} initialPlan={initialPlan} />
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-gray-500">
          {t('whatsappHint')}{' '}
          <span className="font-medium text-gray-700">{phoneDisplay}</span>
        </p>
      </div>
    </section>
  );
}
