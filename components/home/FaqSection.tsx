'use client';

import { useOrder } from '@/context/OrderContext';
import type { FaqEntry } from '@/types';
import { FaqItem } from './FaqItem';

export function FaqSection({ faqs }: { faqs: FaqEntry[] }) {
  const { zipCode } = useOrder();

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black px-4 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-2xl font-black text-white md:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer.replace('{zip}', zipCode)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
