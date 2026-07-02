'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { cn } from '@/lib/utils';

const MAGENTA = '#BC2656';
const VIOLET = '#5E549D';

const panelTransition = {
  height: { duration: 0.42, ease: [0.04, 0.62, 0.23, 0.98] as const },
  opacity: { duration: 0.28, ease: 'easeOut' as const }
};

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        'mobile-surface overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/[0.04] ring-1 ring-black/[0.05] transition-shadow duration-300 max-md:rounded-2xl',
        isOpen && 'shadow-md shadow-black/[0.06] ring-brand/10'
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="touch-press flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left active:bg-zinc-50 md:px-7 md:py-6"
        aria-expanded={isOpen}
      >
        <span className="pr-2 text-base font-medium leading-snug text-foreground md:text-lg">
          {question}
        </span>
        <motion.span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-muted-foreground"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown size={18} strokeWidth={2.25} aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: panelTransition.height,
                opacity: { ...panelTransition.opacity, delay: 0.06 }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.34, ease: [0.55, 0.06, 0.68, 0.19] },
                opacity: { duration: 0.18 }
              }
            }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground md:px-7 md:pb-7 md:text-[15px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection({
  namespace = 'faq',
  sectionId = 'faq'
}: {
  namespace?: string;
  sectionId?: string;
}) {
  const t = useTranslations(namespace);
  const items = t.raw('items') as { question: string; answer: string }[];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id={sectionId} className="scroll-mt-24 bg-zinc-50/90 py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        </Reveal>

        <div className="relative mx-auto mt-12 max-w-3xl md:mt-14">
          {/* Acento degradado lateral — estilo Framer original */}
          <div
            className="pointer-events-none absolute -left-1 top-2 bottom-2 w-1 rounded-full md:-left-2 md:w-1.5"
            style={{ background: `linear-gradient(180deg, ${MAGENTA} 0%, ${VIOLET} 100%)` }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-6 top-0 bottom-0 w-20 rounded-full opacity-40 blur-2xl md:-left-10 md:w-28"
            style={{
              background: `linear-gradient(180deg, ${MAGENTA}44 0%, ${VIOLET}33 100%)`
            }}
            aria-hidden
          />

          <div className="relative space-y-3 md:space-y-3.5">
            {items.map((item, i) => (
              <Reveal key={item.question} delay={i * 0.05}>
                <FaqItem
                  question={item.question}
                  answer={item.answer}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
