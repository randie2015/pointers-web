'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/reveal';
import { getBrandTrustCarouselLogos, type BrandLogo } from '@/lib/brand-trust';

function BrandLogo({ brand }: { brand: BrandLogo }) {
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
  const t = useTranslations('brandTrust');
  const reduced = useReducedMotion();
  const brands = getBrandTrustCarouselLogos();

  return (
    <section className="relative z-[1] py-20 md:py-28">
      <div className="container-page">
        <div className="mobile-surface mx-auto max-w-6xl rounded-3xl bg-white px-6 py-14 shadow-md max-md:shadow-lg max-md:shadow-black/[0.08] md:px-10 md:py-16">
          <Reveal>
            <p className="mb-10 text-center text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
              {t('title')}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
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
              {brands.map((brand, idx) => (
                <BrandLogo key={`${brand.name}-${idx}`} brand={brand} />
              ))}
            </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
