'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { cn } from '@/lib/utils';

type QA = {
  q: string;
  a: string;
};

const FAQS: readonly QA[] = [
  {
    q: 'How does Engageo work with my existing phone?',
    a: 'You set your clinic number to auto-forward calls that go unanswered after 15 seconds. When your receptionist is busy or the clinic is closed, the call reaches Engageo instead of voicemail. The patient hears a trained voice, gets their questions answered, and can book an appointment \u2014 all on the same call. No hardware, no porting, no app for your team.',
  },
  {
    q: 'What happens on the call when a patient reaches Engageo?',
    a: 'The patient hears a warm greeting in their own language \u2014 \u201CNamaste, mein Dr. Sharma\u2019s clinic se bol rahi hun, aapka naam kya hai?\u201D The system then answers whatever the patient asks \u2014 clinic timings, consultation fees, which doctor treats their condition, directions to the clinic. If they want to book, it checks your calendar for availability and confirms a slot right there on the call.',
  },
  {
    q: 'Which languages are supported?',
    a: 'Twelve languages spanning the major Indian languages and Indian English. The system detects the patient\u2019s language from their first response and switches accordingly. You can also set a default language for each clinic number.',
  },
  {
    q: 'Does the patient know they\u2019re not speaking to a person?',
    a: 'The system introduces itself by name as calling from your clinic and speaks naturally in the patient\u2019s language. Most patients experience it as speaking with a knowledgeable receptionist. The focus is on making the patient feel heard and getting them booked \u2014 not on disclosing the technology behind it.',
  },
  {
    q: 'How does the appointment show up in my calendar?',
    a: 'Booked appointments sync to Google Calendar, iCal, or your existing HMS in real time. Your receptionist sees the slot appear the moment it\u2019s confirmed. After the call, the patient gets a WhatsApp message with the date, time, doctor name, and clinic address.',
  },
  {
    q: 'What about reminders and follow-ups?',
    a: 'Two WhatsApp reminders go out automatically \u2014 24 hours and 3 hours before the appointment. After the visit, follow-ups adapt: if the patient didn\u2019t show, a rebooking message. If they started treatment, aftercare instructions. If they completed treatment, a feedback request. All of this runs without your team lifting a finger.',
  },
  {
    q: 'Can patients text the clinic number with questions?',
    a: 'Yes. Once a patient has your clinic number saved, they can message anytime on WhatsApp. Engageo handles the conversation \u2014 answering questions, rebooking appointments, or flagging issues for your team to call back. It works like a 24/7 text receptionist on your existing number.',
  },
  {
    q: 'What if a patient\u2019s request is too complex to handle?',
    a: 'If the system encounters something outside its knowledge \u2014 a complex medical question, an upset patient, or an edge case \u2014 it flags the conversation and alerts your team for a human callback. The patient is told someone from the clinic will reach out shortly. No dead ends, no frustrated patients.',
  },
  {
    q: 'Is patient data secure?',
    a: 'All conversations are encrypted in transit and at rest. Data is stored in India (AWS Mumbai, ap-south-1) and never leaves the country. We operate under ISO 27001 controls and are aligned with DPDP 2023 from day one. Your clinic owns the data \u2014 export or delete it within 72 hours on request.',
  },
  {
    q: 'What does pricing look like?',
    a: 'One simple plan: \u20B97,500/month. That includes 150 calls a month; after that it\u2019s \u20B97 per minute. You get up to 150 patient appointments booked, a free CRM to track them, WhatsApp recovery and reminders, and calendar sync \u2014 same plan for a solo clinic or a multi-doctor hospital. No setup fees, no contracts, and a 14-day free trial.',
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
                  <Plus size={12} strokeWidth={2} aria-hidden="true" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`faq-panel-${index}`}
                    key="content"
                    initial={{ height: 0, opacity: 0, clipPath: 'inset(0 100% 100% 0)' }}
                    animate={{ height: 'auto', opacity: 1, clipPath: 'inset(0 0% 0% 0)' }}
                    exit={{ height: 0, opacity: 0, clipPath: 'inset(0 100% 100% 0)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
            href="https://wa.me/919699530806"
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
