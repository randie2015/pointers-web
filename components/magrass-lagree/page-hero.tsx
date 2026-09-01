type MagrassPageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  tone?: 'white' | 'cream';
};

export function MagrassPageHero({ eyebrow, title, subtitle, tone = 'cream' }: MagrassPageHeroProps) {
  return (
    <section
      className={
        tone === 'white'
          ? 'border-b border-mag-border bg-mag-white py-14 sm:py-16 lg:py-20'
          : 'border-b border-mag-border bg-mag-cream py-14 sm:py-16 lg:py-20'
      }
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mag-jade sm:text-xs">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 max-w-3xl font-playfair text-3xl font-semibold text-mag-navy sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-mag-muted sm:text-base lg:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
