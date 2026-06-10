'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = [
  {
    q: '¿Cómo nació Pointers?',
    a: 'Pointers nació con una intención clara: unir la creatividad con la estrategia. Queríamos construir marcas que no solo se vean bien, sino que funcionen con dirección, coherencia y resultados reales.'
  },
  {
    q: '¿Qué tipo de marcas trabajan con Pointers?',
    a: 'Colaboramos con marcas que buscan crecer con propósito. Desde startups con visión sólida hasta empresas consolidadas que quieren actualizar su presencia digital sin perder esencia.'
  },
  {
    q: '¿Qué hace diferente a Pointers de otras agencias digitales?',
    a: 'En lugar de dividir branding, web y marketing, los integramos en un mismo flujo. Esto nos permite construir ecosistemas digitales coherentes, donde cada decisión tiene un propósito y cada entrega un impacto medible.'
  },
  {
    q: '¿Cuál es la filosofía detrás de cada proyecto?',
    a: 'Creemos que la excelencia no está en hacer más, sino en hacer mejor. Cada proyecto refleja atención al detalle, claridad estratégica y compromiso con resultados que perduren en el tiempo.'
  },
  {
    q: '¿Cómo se mantienen actualizados frente a las nuevas tendencias digitales?',
    a: 'El aprendizaje continuo forma parte de nuestra cultura. Combinamos investigación, análisis de datos y exploración constante en diseño, UX y automatización para mantenernos siempre un paso adelante.'
  }
] as const;

export function AboutFaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      {FAQ.map((item, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div
            key={item.q}
            className={[
              'rounded-2xl border border-gray-200 bg-white transition-colors',
              'hover:border-gray-300',
              isActive ? 'bg-gray-50/50' : ''
            ].join(' ')}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between p-6 text-left"
              onClick={() => setActiveIndex((cur) => (cur === idx ? null : idx))}
              aria-expanded={isActive}
            >
              <span className="pr-6 font-medium text-gray-900">{item.q}</span>
              <ChevronDown
                className={[
                  'h-5 w-5 shrink-0 text-gray-500 transition-transform duration-300',
                  isActive ? 'rotate-180' : ''
                ].join(' ')}
                aria-hidden
              />
            </button>

            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 text-sm leading-relaxed text-gray-600 md:text-base">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

