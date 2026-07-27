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
    a: 'No. You get 14 days without entering payment details. Add a card only when you decide to continue.',
  },
  {
    q: 'What’s the difference between the plans?',
    a: 'Solo (₹7,499/month) covers one clinic with 150 included calls a month. Growth (₹22,497/month) covers up to three clinics with 450 included calls, a multi-clinic dashboard, and priority support. Enterprise is custom for hospital chains with 4+ locations. Every plan includes the free CRM, WhatsApp recovery, calendar sync, and all 12 Indian languages.',
  },
  {
    q: 'Can I pay annually?',
    a: 'Yes. Every plan is billed monthly or annually at the same rate — Solo is ₹7,499/month or ₹89,988/year, Growth is ₹22,497/month or ₹2,69,964/year. On annual billing your call allowance pools for the year (Solo 1,800, Growth 5,400); after that it’s ₹7 per minute, same as monthly.',
  },
  {
    q: 'What counts toward my included calls?',
    a: 'Any call our AI answers on your behalf counts toward your monthly included allowance (150 on Solo, 450 on Growth). Calls that don’t connect (invalid number, no answer from the patient) don’t count.',
  },
  {
    q: 'What happens after I use my included calls?',
    a: 'You’re billed ₹7 per minute for calls beyond your included allowance — only for what you actually use. Usage and the running total are visible in your dashboard, so there are no surprises. Enterprise plans include unlimited calls.',
  },
  {
    q: 'Is the CRM really free?',
    a: 'Yes. The CRM to capture and track every patient is included in every plan at no extra cost.',
  },
  {
    q: 'Are WhatsApp conversation charges included in the price?',
    a: 'No — Meta charges a per-conversation fee (typically ₹0.35–₹0.85 per conversation, depending on category). We pass this through at cost with full transparency in your dashboard. Typical clinics spend ₹300–₹900/month on conversation fees.',
  },
  {
    q: 'What happens after the 14-day trial?',
    a: 'You enter payment details to keep the recoveries flowing. If you do not subscribe, the service pauses automatically — no auto-billing, no surprise charges.',
  },
  {
    q: 'Is there a setup fee?',
    a: 'No. Onboarding, template configuration, and go-live support are all included. You pay for your plan, any call minutes beyond your included allowance, and WhatsApp conversation costs.',
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
