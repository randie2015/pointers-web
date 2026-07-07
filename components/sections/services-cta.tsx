'use client';

import { useTranslations } from 'next-intl';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { GradientCtaContent, GradientCtaSection } from '@/components/ui/gradient-cta-section';
import { getContactUrl } from '@/lib/site-config';

export function ServicesCta() {
  const t = useTranslations('servicesPage.cta');

  return (
    <GradientCtaSection>
      <GradientCtaContent title={t('title')} subtitle={t('subtitle')}>
        <MaskUpButton href={getContactUrl()} label={t('button')} className="w-full max-w-sm sm:w-auto" />
      </GradientCtaContent>
    </GradientCtaSection>
  );
}
