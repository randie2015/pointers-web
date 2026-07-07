'use client';

import { useTranslations } from 'next-intl';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { GradientCtaContent, GradientCtaSection } from '@/components/ui/gradient-cta-section';

export function SpotlightCTA() {
  const t = useTranslations('aboutPage.cta');

  return (
    <GradientCtaSection>
      <GradientCtaContent title={t('title')} subtitle={t('subtitle')}>
        <MaskUpButton href="/contact" label={t('button')} className="w-full max-w-sm sm:w-auto" />
      </GradientCtaContent>
    </GradientCtaSection>
  );
}
