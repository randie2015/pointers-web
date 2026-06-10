'use client';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';

export function AboutPreview() {
  const t = useTranslations('about');
  return (
    <section className="container-page py-24 md:py-40 border-t border-border/60">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <Reveal>
            <SectionBadge text={t('eyebrow')} />
          </Reveal>
        </div>
        <div className="md:col-span-9">
          <Reveal>
            <h2 className="h-display text-3xl md:text-5xl max-w-3xl">{t('title')}</h2>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl">{t('body')}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
