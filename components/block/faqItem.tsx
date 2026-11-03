'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

interface FaqItemProps {
  question: string;
  answer: string;
}

export function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#080b1b] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/70 hover:shadow-xl hover:shadow-blue-950/40">
      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between p-4 text-left text-sm font-bold text-white transition-colors hover:text-sky-300 focus-visible-custom md:p-5 md:text-base"
      >
        <span>{question}</span>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} className="ml-2 h-5 w-5 shrink-0 text-sky-300" />
      </button>
      {isOpen && (
        <div className="border-t border-white/10 px-4 pb-5 pt-3 text-xs leading-relaxed text-gray-300 md:px-5 md:text-sm">
          {answer}
        </div>
      )}
    </div>
  );
}

 