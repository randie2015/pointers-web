type PageHeroProps = {
  title: string;
  subtitle: string;
};

export function ClinicPageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section data-nav-theme="light" className="border-b border-demo-neutral/30 bg-white pt-[4.25rem] sm:pt-[4.5rem]">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <h1 className="text-balance font-display text-2xl font-bold text-demo-charcoal sm:text-3xl md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-700 sm:mt-4 sm:text-base lg:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
