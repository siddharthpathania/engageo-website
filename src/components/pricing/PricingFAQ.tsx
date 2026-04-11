'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type QA = {
  q: string;
  a: string;
};

const FAQS: readonly QA[] = [
  {
    q: 'Do I need a credit card for the free trial?',
    a: 'No. You get 14 days on any plan without entering payment details. Add a card only when you decide to continue.',
  },
  {
    q: 'What counts as a recovery on the Starter plan?',
    a: 'Any missed call where we successfully deliver a WhatsApp recovery message. If the message fails to deliver (blocked WhatsApp, invalid number), it does not count against your 200/month cap.',
  },
  {
    q: 'Are WhatsApp conversation charges included in the price?',
    a: 'No — Meta charges a per-conversation fee (typically ₹0.35–₹0.85 per conversation, depending on category). We pass this through at cost with full transparency in your dashboard. Typical clinics spend ₹300–₹900/month on conversation fees.',
  },
  {
    q: 'Can I switch plans mid-cycle?',
    a: 'Yes. Upgrades are prorated immediately. Downgrades take effect on your next billing date. No cancellation fees, ever.',
  },
  {
    q: 'What happens after the 14-day trial?',
    a: 'You pick a plan and enter payment details to keep the recoveries flowing. If you do not subscribe, the service pauses automatically — no auto-billing, no surprise charges.',
  },
  {
    q: 'How does annual billing work?',
    a: 'You pay 12 months upfront at a 20% discount. If you cancel mid-contract, we refund unused months on a pro-rata basis minus a 10% administrative fee.',
  },
  {
    q: 'Is there a setup fee?',
    a: 'No. Onboarding, template configuration, and go-live support are all included. The only thing you pay for is the monthly plan + WhatsApp conversation costs.',
  },
  {
    q: 'What does Enterprise pricing look like?',
    a: 'Enterprise pricing is based on number of locations, expected recovery volume, and integration complexity. Most multi-location chains land between ₹25,000 and ₹1,20,000/month. Book a call for a custom quote.',
  },
];

export function PricingFAQ(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="mx-auto max-w-3xl divide-y divide-neutral-200 border-y border-neutral-200">
      {FAQS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`pricing-faq-${index}`}
              className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-primary-600 md:py-6"
            >
              <span
                className={cn(
                  'font-display text-base font-semibold leading-snug tracking-tight md:text-lg',
                  isOpen ? 'text-primary-600' : 'text-obsidian',
                )}
              >
                {item.q}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  'mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                  isOpen
                    ? 'rotate-45 border-primary-600 bg-primary-600 text-surface'
                    : 'border-neutral-300 bg-surface text-obsidian group-hover:border-primary-400',
                )}
              >
                <Plus size={12} strokeWidth={2} aria-hidden="true" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`pricing-faq-${index}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-sm leading-relaxed text-subtle md:text-base">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
