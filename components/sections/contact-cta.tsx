'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { GradientCtaContent, GradientCtaSection } from '@/components/ui/gradient-cta-section';

/** Pre-formulario en Home — enlaza a /contact (calificación). WhatsApp solo vía botón flotante. */
export function ContactCTA({ id = 'hablemos' }: { id?: string }) {
  const t = useTranslations('contact');

  return (
    <GradientCtaSection id={id}>
      <Reveal>
        <GradientCtaContent
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        >
          <MaskUpButton href="/contact" label={t('ctaButton')} className="w-full max-w-sm sm:w-auto" />
        </GradientCtaContent>
      </Reveal>
    </GradientCtaSection>
  );
}
