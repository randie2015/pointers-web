'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { GradientCtaContent, GradientCtaSection } from '@/components/ui/gradient-cta-section';
import { getContactUrl } from '@/lib/site-config';

/** Pre-formulario en Home — enlaza al formulario en /contact. WhatsApp solo vía botón flotante. */
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
          <MaskUpButton href={getContactUrl()} label={t('ctaButton')} className="w-full max-w-sm sm:w-auto" />
        </GradientCtaContent>
      </Reveal>
    </GradientCtaSection>
  );
}
