'use client';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import { SectionBadge } from '@/components/ui/section-badge';

const projects = [
  { name: 'Aurora', tag: 'Branding · Web', tone: 'from-neutral-900 to-neutral-700' },
  { name: 'Helix Studio', tag: 'E-commerce', tone: 'from-stone-800 to-stone-600' },
  { name: 'Northwind', tag: 'SaaS Platform', tone: 'from-zinc-900 to-zinc-700' },
  { name: 'Atlas', tag: 'Editorial Site', tone: 'from-neutral-800 to-neutral-600' }
];

export function WorkPreview() {
  const t = useTranslations('work');
  return (
    <section className="container-page py-24 md:py-40 border-t border-border/60">
      <Reveal>
        <SectionBadge text={t('eyebrow')} />
        <h2 className="h-display mt-4 text-4xl md:text-5xl">{t('title')}</h2>
        <p className="mt-4 text-muted-foreground max-w-xl">{t('subtitle')}</p>
      </Reveal>
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${p.tone} transition-transform duration-700 group-hover:scale-105`} />
              <div className="absolute inset-0 p-8 flex flex-col justify-between text-background">
                <div className="text-xs uppercase tracking-widest opacity-80">{p.tag}</div>
                <div className="flex items-end justify-between">
                  <h3 className="font-display text-3xl">{p.name}</h3>
                  <ArrowUpRight className="opacity-80 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-12">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm border-b border-foreground pb-1 hover:opacity-70 transition">
            {t('viewAll')} <ArrowUpRight size={14} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
