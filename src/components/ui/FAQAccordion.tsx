'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { settle } from '@/lib/motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className={cn('border-t border-line', className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={item.question} className="border-b border-line">
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex min-h-11 w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="text-[17px] font-medium tracking-[-0.011em] text-ink">
                {item.question}
              </span>
              <span className="text-[20px] leading-none text-muted" aria-hidden>
                {isOpen ? '-' : '+'}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={reduce ? { duration: 0.01 } : settle}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-6 text-[17px] leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
