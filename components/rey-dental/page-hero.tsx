type PageHeroProps = {
  title: string;
  subtitle: string;
};

export function ReyDentalPageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-rey-neutral/30 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <h1 className="text-balance font-display text-2xl font-bold text-rey-ink sm:text-3xl md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base lg:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
