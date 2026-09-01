type PageHeroProps = {
  title: string;
  subtitle: string;
};

export function ReyDentalPageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-rey-neutral/30 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center md:px-6 md:py-20">
        <h1 className="font-display text-3xl font-bold text-rey-ink md:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
