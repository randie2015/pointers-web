'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

type Brand = {
  name: string;
  src: string;
};

const BASE_BRANDS: Brand[] = [
  { name: 'Carrara', src: '/brands/carrara.png' },
  { name: 'Cirezza', src: '/brands/cirezza.png' },
  { name: 'Vezzanti', src: '/brands/vezzanti-v2.png' },
  { name: 'Mossad', src: '/brands/mossad-v2.png' }
];

// 8 items (2 identical cycles) — required for seamless x: 0% → -50% loop
const BRANDS: Brand[] = [...BASE_BRANDS, ...BASE_BRANDS];

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div className="relative mx-8 h-14 w-40 flex-shrink-0 md:mx-12 md:h-20 md:w-56">
      <Image
        src={brand.src}
        alt={brand.name}
        fill
        sizes="(max-width: 768px) 160px, 224px"
        className="object-contain object-center"
        draggable={false}
      />
    </div>
  );
}

export function BrandTrustSection() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white px-6 py-14 shadow-md md:px-10 md:py-16">
          <p className="mb-10 text-center text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
            Marcas que evolucionan con nosotros
          </p>

          <div className="flex w-full items-center overflow-hidden">
            <motion.div
              className="flex w-max items-center"
              animate={reduced ? undefined : { x: ['0%', '-50%'] }}
              transition={
                reduced
                  ? undefined
                  : {
                      repeat: Infinity,
                      ease: 'linear',
                      duration: 25
                    }
              }
            >
              {BRANDS.map((brand, idx) => (
                <BrandLogo key={`${brand.name}-${idx}`} brand={brand} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
