import Image from 'next/image';
import Link from 'next/link';
import { clinicHome, MAGRASS_BASE } from '@/src/data/magrassData';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';

export function MagrassFeaturedTreatmentsSection() {
  const { featuredTreatments } = clinicHome;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#197876] sm:text-xs">
              Tratamientos destacados
            </p>
            <h2 className="mt-2 font-playfair text-2xl font-semibold text-[#192031] sm:text-3xl">
              Protocolos faciales, corporales y antiage
            </h2>
          </div>
          <Link
            href={`${MAGRASS_BASE}/tratamientos`}
            className="text-sm font-semibold text-[#197876] transition-colors hover:text-[#192031]"
          >
            Ver todos los tratamientos →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTreatments.map((treatment) => (
            <Link
              key={treatment.id}
              href={`${MAGRASS_BASE}/tratamientos#${treatment.anchor}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-transparent bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A880] hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden sm:h-52">
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#192031]/90 via-[#192031]/45 to-[#192031]/15" />
                <span className="absolute top-4 left-4 rounded-full bg-[#192031]/50 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-white backdrop-blur-sm">
                  {treatment.badge}
                </span>
                <h3 className="absolute right-4 bottom-4 left-4 font-playfair text-lg font-semibold leading-snug text-white sm:text-xl">
                  {treatment.title}
                </h3>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="flex-1 text-sm leading-relaxed text-mag-muted">{treatment.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-[#197876] transition-colors duration-200 group-hover:text-[#192031]">
                  Ver detalles del tratamiento →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <MagrassCtaButton
            href={`${MAGRASS_BASE}/tratamientos`}
            label="Explorar catálogo completo"
            variant="secondary"
            external={false}
          />
        </div>
      </div>
    </section>
  );
}
