'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

type FaqItem = {
  question: string;
  answer: string;
};

export function AboutFaqAccordion() {
  const locale = useLocale();
  const t = useTranslations('aboutPage');
  const items = t.raw('faq.items') as FaqItem[];
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [locale]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      {items.map((item, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div
            key={item.question}
            className={[
              'rounded-2xl border border-white/[0.08] bg-[#13161F] transition-colors',
              'hover:border-[#BC2656]/40',
              isActive ? 'bg-white/[0.03]' : ''
            ].join(' ')}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between p-6 text-left"
              onClick={() => setActiveIndex((cur) => (cur === idx ? null : idx))}
              aria-expanded={isActive}
            >
              <span className="pr-6 font-medium text-[#F8FAFC]">{item.question}</span>
              <ChevronDown
                className={[
                  'h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300',
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
                  <div className="px-6 pb-6 pt-0 text-sm leading-relaxed text-[#94A3B8] md:text-base">
                    {item.answer}
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
