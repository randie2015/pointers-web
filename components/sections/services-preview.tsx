'use client';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionBadge } from '@/components/ui/section-badge';

export function ServicesPreview() {
  const t = useTranslations('services');
  const items = t.raw('items') as { title: string; description: string }[];
  return (
    <section className="container-page py-24 md:py-40 border-t border-border/60">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal>
            <SectionBadge text={t('eyebrow')} />
            <h2 className="h-display mt-4 text-4xl md:text-5xl">{t('title')}</h2>
            <p className="mt-5 text-muted-foreground max-w-sm">{t('subtitle')}</p>
          </Reveal>
        </div>
        <div className="md:col-span-8 grid sm:grid-cols-2 gap-px bg-border/60 border border-border/60">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <div className="bg-background p-8 h-full min-h-[200px] flex flex-col justify-between">
                <div className="text-xs text-muted-foreground">0{i + 1}</div>
                <div>
                  <h3 className="font-display text-xl">{it.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{it.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
