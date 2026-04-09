'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { cn } from '@/lib/utils';

type QA = {
  q: string;
  a: string;
};

const FAQS: readonly QA[] = [
  {
    q: 'How does Engageo work with my existing phone system?',
    a: 'Engageo sits on top of whatever you already use — landline, VoIP, Exotel, Knowlarity, MTNL, or a staff mobile. We do not replace your number or ask you to install new hardware. Your number either ports to us or simply forwards unanswered calls, and we handle the rest. Setup takes under 20 minutes.',
  },
  {
    q: 'Which Indian languages does the AI support?',
    a: 'WhatsApp recovery messages go out in Hindi, Marathi, Tamil, Kannada, Telugu, Bengali, and English. The system picks the language based on the patient\u2019s number region and prior interactions, or you can hard-set a default for your clinic. Templates are Meta-verified, which keeps delivery rates high.',
  },
  {
    q: 'Is patient data secure and compliant?',
    a: 'Yes. Call metadata and WhatsApp conversations are encrypted in transit and at rest. We run on ISO 27001 infrastructure, store data in Mumbai (ap-south-1), and never share patient information with third parties. Clinic-owned data can be exported or deleted on request within 72 hours.',
  },
  {
    q: 'How long does setup actually take?',
    a: 'Most solo clinics go live within one business day. Multi-doctor groups take 2\u20133 days because we configure routing rules and message templates per specialty. You will be sending recovery WhatsApps by Friday if you sign off on Monday.',
  },
  {
    q: 'What does pricing look like and are there hidden fees?',
    a: 'Plans start at \u20B925,000/month for solo practitioners and scale to custom enterprise contracts for hospital chains. No setup fees, no contracts, no per-message surcharges. WhatsApp conversation costs (Meta\u2019s charge, not ours) are passed through at cost with full transparency in your dashboard.',
  },
  {
    q: 'Can I customise the message tone and content?',
    a: 'Completely. We ship with Meta-approved templates tuned for Indian clinics, and you can edit tone, doctor names, CTAs, and booking flows from the dashboard. Many clinics A/B test two variants for a week and lock in whichever recovers more patients.',
  },
  {
    q: 'What happens if a patient does not respond to the WhatsApp?',
    a: 'The Growth plan includes a 4-touchpoint journey: initial recovery WhatsApp, a gentle 24-hour nudge, a 72-hour re-engagement with a different offer angle, and a 7-day final check-in. After that the lead is archived \u2014 no spam, no burning your clinic\u2019s reputation.',
  },
  {
    q: 'Do you integrate with my calendar or HMS?',
    a: 'Yes. Google Calendar, iCal, Outlook, Practo, and common Indian HMS/PMS systems (DocPulse, Halemind, Medixcel, eClinicWorks) are supported out of the box. Custom integrations are included on Enterprise plans.',
  },
];

export function FAQ(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper id="faq" ariaLabel="Frequently asked questions">
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-label justify-center">Questions</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
          The answers you came here for.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
          Still wondering if Engageo fits your clinic? Start here — or
          message us on WhatsApp and a human replies in under 8 seconds during
          IST working hours.
        </p>
      </div>

      <ul className="mx-auto mt-14 max-w-3xl divide-y divide-neutral-200 border-y border-neutral-200 md:mt-18">
        {FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <li key={item.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
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
                      ? 'border-primary-600 bg-primary-600 text-surface rotate-45'
                      : 'border-neutral-300 bg-surface text-obsidian group-hover:border-primary-400',
                  )}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 2v8M2 6h8"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`faq-panel-${index}`}
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

      <div className="mx-auto mt-10 max-w-3xl text-center">
        <p className="text-[13px] text-subtle">
          More questions?{' '}
          <a
            href="https://wa.me/919699670806"
            className="font-medium text-obsidian underline-offset-4 hover:text-primary-600 hover:underline"
          >
            WhatsApp us directly
          </a>{' '}
          or{' '}
          <a
            href="/contact"
            className="font-medium text-obsidian underline-offset-4 hover:text-primary-600 hover:underline"
          >
            book a 15-minute call
          </a>
          .
        </p>
      </div>
    </SectionWrapper>
  );
}
