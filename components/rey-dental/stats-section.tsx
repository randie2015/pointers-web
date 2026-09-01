import { clinicHome } from '@/src/data/clinicData';

export function ReyDentalStatsSection() {
  return (
    <section className="border-y border-rey-neutral/30 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-6 md:py-12">
        {clinicHome.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-rey-neutral/30 bg-rey-base/50 px-4 py-6 text-center transition hover:border-rey-primary/40 hover:shadow-sm"
          >
            <p className="font-display text-xl font-bold text-rey-primary md:text-2xl">{stat.value}</p>
            <p className="mt-1 text-xs text-slate-600 md:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
