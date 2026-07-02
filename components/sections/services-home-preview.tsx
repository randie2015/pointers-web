'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/ui/section-header';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { Link } from '@/i18n/routing';
import { SERVICE_SLUGS } from '@/lib/services';

export function ServicesHomePreview() {
  const t = useTranslations('services');
  const items = t.raw('items') as {
    badge: string;
    title: string;
    description: string;
  }[];

  return (
    <section className="scroll-mt-24 bg-muted/40 py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.badge} delay={i * 0.05}>
              <Link
                href={`/servicios/${SERVICE_SLUGS[i]}`}
                prefetch
                className="group mobile-card-interactive block h-full rounded-2xl border border-border/60 bg-white p-6 shadow-sm md:p-8 md:shadow-sm md:hover:-translate-y-1 md:hover:shadow-md"
              >
                <span className="inline-block rounded-xl bg-purple px-3 py-1 text-xs font-semibold text-white">
                  {item.badge}
                </span>
                <h3 className="h-display mt-4 text-xl md:text-2xl">{item.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.description}
                </p>
                <span className="mt-5 inline-block text-sm font-semibold text-[#39B8AD] group-hover:underline">
                  {t('previewLink')} →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <MaskUpButton href="/servicios" label={t('previewCta')} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
