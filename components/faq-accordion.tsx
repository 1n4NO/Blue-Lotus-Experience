'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { FaqItem } from '@/types/site';

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="grid gap-3.5">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-faq-${index}-button`;
        const panelId = `${baseId}-faq-${index}-panel`;

        return (
          <div key={item.question} className="rounded-[1.75rem] border border-white/8 bg-white/[0.03]">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-5 px-6 py-[1.125rem] text-left transition duration-500 ease-calm hover:bg-white/[0.03] sm:px-7 sm:py-5"
            >
              <span className="max-w-2xl font-display text-[1.3rem] leading-[1.04] tracking-[-0.025em] text-text sm:text-[1.45rem]">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 flex-none text-gold transition duration-500 ease-calm',
                  isOpen && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0, filter: 'blur(10px)' }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto', filter: 'blur(0px)' }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0, filter: 'blur(8px)' }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden px-6 pb-5 sm:px-7 sm:pb-6"
                >
                  <p className="max-w-2xl text-sm leading-[1.72] text-muted">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
