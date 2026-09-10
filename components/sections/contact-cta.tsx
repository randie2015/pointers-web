'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { GradientCtaContent, GradientCtaSection } from '@/components/ui/gradient-cta-section';
import { getContactUrl } from '@/lib/site-config';

/** CTA de cierre en Home — dispara Neural Mode vía #cta-section. */
export function ContactCTA({ id = 'cta-section' }: { id?: string }) {
  const t = useTranslations('contact');

  return (
    <GradientCtaSection id={id}>
      {id === 'cta-section' ? <span id="hablemos" className="absolute" aria-hidden /> : null}
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
