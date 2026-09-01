import { magrassContainer, magrassSection } from '@/lib/magrass-lagree/layout';
import { cn } from '@/lib/utils';

type MagrassPageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  tone?: 'white' | 'cream';
};

export function MagrassPageHero({ eyebrow, title, subtitle, tone = 'cream' }: MagrassPageHeroProps) {
  return (
    <section
      className={cn(
        magrassSection,
        'border-b border-mag-border',
        tone === 'white' ? 'bg-mag-white' : 'bg-mag-cream'
      )}
    >
      <div className={magrassContainer}>
        {eyebrow ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mag-jade sm:text-xs">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 max-w-3xl font-playfair text-[1.75rem] font-semibold text-balance text-mag-navy sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-mag-muted sm:mt-4 sm:text-base lg:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
