'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { MobileGradientBg } from '@/components/ui/mobile-gradient-bg';
import { getWhatsAppUrl } from '@/lib/site-config';
import { cn } from '@/lib/utils';

/** CTA de contacto — abre WhatsApp al +51 908 553 032 */
export function ContactCTA({ id = 'hablemos' }: { id?: string }) {
  const t = useTranslations('contact');
  const locale = useLocale() as 'es' | 'en';

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden py-12 sm:py-16 md:py-24',
        'bg-gradient-to-br from-[#BC2656] to-[#5E549D]',
        'scroll-mt-24'
      )}
    >
      <MobileGradientBg />

      <div className="container-page relative z-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center text-white">
            <SectionBadge text={t('eyebrow')} />
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl lg:text-5xl">{t('title')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
              {t('subtitle')}
            </p>
            <div className="mt-10 flex justify-center">
              <MaskUpButton href={getWhatsAppUrl(locale)} label={t('submit')} className="w-full max-w-sm sm:w-auto" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
