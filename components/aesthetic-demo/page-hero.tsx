import { aestheticContainer, aestheticSection } from '@/lib/aesthetic-demo/layout';
import { cn } from '@/lib/utils';

type AestheticPageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  tone?: 'white' | 'cream';
};

export function AestheticPageHero({ eyebrow, title, subtitle, tone = 'cream' }: AestheticPageHeroProps) {
  return (
    <section
      className={cn(
        aestheticSection,
        'border-b border-demo-border',
        tone === 'white' ? 'bg-white' : 'bg-demo-base'
      )}
    >
      <div className={aestheticContainer}>
        {eyebrow ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-demo-jade sm:text-xs">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 max-w-3xl font-playfair text-[1.75rem] font-semibold text-balance text-demo-ink sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-demo-muted sm:mt-4 sm:text-base lg:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
