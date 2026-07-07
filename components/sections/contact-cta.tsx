'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { MobileGradientBg } from '@/components/ui/mobile-gradient-bg';
import { SERVICE_GRADIENT } from '@/lib/service-brand';
import { cn } from '@/lib/utils';

/** Pre-formulario en Home — enlaza a /contact (calificación). WhatsApp solo vía botón flotante. */
export function ContactCTA({ id = 'hablemos' }: { id?: string }) {
  const t = useTranslations('contact');

  return (
    <section
      id={id}
      className={cn('relative overflow-hidden py-12 sm:py-16 md:py-24 scroll-mt-24', SERVICE_GRADIENT)}
    >
      <MobileGradientBg />

      <div className="container-page relative z-10">
        <Reveal>
          <div className="mx-auto max-w-3xl px-2 text-center text-white sm:px-0">
            <SectionBadge text={t('eyebrow')} />
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl lg:text-5xl">{t('title')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
              {t('subtitle')}
            </p>
            <div className="mt-10 flex justify-center">
              <MaskUpButton href="/contact" label={t('ctaButton')} className="w-full max-w-sm sm:w-auto" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
