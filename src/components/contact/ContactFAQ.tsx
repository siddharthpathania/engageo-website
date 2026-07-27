import Script from 'next/script';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { SITE_CONFIG } from '@/lib/constants';

type QA = { q: string; a: string };

const FAQS: readonly QA[] = [
  {
    q: 'Who is Engageo built for — only clinics, or hospitals too?',
    a: 'Engageo is built for Indian clinics and hospitals of every size — single-doctor practices, multi-specialty chains, dental and dermatology clinics, IVF and hair-transplant centres, and mid-sized hospitals. The AI receptionist, WhatsApp automation, and booking engine adapt to each setup — there is nothing that requires you to be a specific size or specialty.',
  },
  {
    q: 'What does "AI missed call recovery" actually do for my clinic?',
    a: 'When a call to your clinic or hospital goes unanswered for 15 seconds, it auto-forwards to Engageo. The AI receptionist answers in the patient\u2019s language, handles their questions (timings, fees, doctor, directions), checks your calendar, and books the appointment right there on the call. You get a WhatsApp summary and the slot shows up in your existing calendar — without adding staff.',
  },
  {
    q: 'Which Indian languages does the AI receptionist support?',
    a: 'Twelve languages spanning the major Indian languages and Indian English. The system detects the patient\u2019s language from their first response and switches accordingly, so a Marathi-speaking patient in Pune and a Tamil-speaking patient in Chennai both feel taken care of.',
  },
  {
    q: 'How fast does the AI pick up compared to a human receptionist?',
    a: 'The AI picks up within 15 seconds of a missed call being forwarded. A human front desk that is already on another call, attending to a walk-in, or off-duty cannot match that. Across the 47+ clinics we are live in, this consistently recovers patients who would otherwise hang up and dial the next clinic on Google.',
  },
  {
    q: 'Does Engageo handle WhatsApp automation too, or only voice calls?',
    a: 'Both. Every booking confirmation, 24-hour reminder, 3-hour reminder, and post-visit follow-up goes out on WhatsApp automatically. Patients can also message your clinic number at any hour — the same Engageo brain answers in text, rebooks missed appointments, and flags complex messages for a human callback.',
  },
  {
    q: 'Will this integrate with my clinic\u2019s existing phone number and HMS?',
    a: 'Yes. You keep your existing clinic or hospital number — we configure call-forwarding so Engageo only picks up on missed calls. Booked appointments sync in real time to Google Calendar, iCal, or your HMS. No hardware to install, no number to port, no app for your team to learn.',
  },
  {
    q: 'Is patient data safe and compliant with Indian data laws?',
    a: 'All conversations are encrypted in transit and at rest. Data is hosted on AWS Mumbai (ap-south-1) and never leaves India. We operate under ISO 27001 controls and are aligned with the DPDP Act 2023 from day one. You own the data — export or delete it within 72 hours on request.',
  },
  {
    q: 'How quickly can a clinic or hospital go live on Engageo?',
    a: 'Most clinics go live in 3\u20135 working days. That includes mapping your FAQs (fees, doctors, timings, specialties), setting up call-forwarding on your existing number, and dry-testing a few mock recovery flows end-to-end before real patients hit it.',
  },
  {
    q: 'Is there a free trial, and what does pricing look like?',
    a: 'Three plans by clinic size, each with a 14-day free trial — no setup fees, no contracts. Solo (1 clinic) is ₹7,500/month with 150 included calls; Growth (up to 3 clinics) is ₹22,500/month with 450 included calls; Enterprise (4+ locations) is custom. After your included calls it’s ₹7 per minute. Every plan includes a free CRM, WhatsApp recovery and reminders, and calendar sync — monthly or annual billing.',
  },
  {
    q: 'How do I book a demo or get a free missed-call audit?',
    a: 'The fastest route is WhatsApp — tap the WhatsApp card above and we reply in under 8 seconds during IST working hours (Mon\u2013Sat, 10am\u20137pm). You can also pick a 20-minute slot on our Cal.com page for a live recovery walkthrough, or fill the form on this page and we will reply by email and WhatsApp within 4 working hours.',
  },
];

export function ContactFAQ(): JSX.Element {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <SectionWrapper id="contact-faq" ariaLabel="Frequently asked questions">
      <Script
        id="contact-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>

      <div className="mx-auto max-w-3xl text-center">
        <span className="section-label justify-center">FAQ</span>
        <h2 className="mt-6 font-display text-[32px] font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-4xl lg:text-[44px]">
          Questions clinics &amp; hospitals ask before booking a demo.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
          Covers the most common questions we hear on the first call — from
          how AI missed call recovery fits a hospital of 80 beds, to
          onboarding timelines, WhatsApp automation, and pricing. Still
          unclear?{' '}
          <a
            href="/contact#contact-form"
            className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-[3px] transition-colors hover:text-primary-800"
          >
            Send us a note
          </a>{' '}
          and a human from {SITE_CONFIG.name} replies the same working day.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-neutral-200 overflow-hidden rounded-3xl border border-neutral-200 bg-surface md:mt-16">
        {FAQS.map((item, index) => (
          <details
            key={item.q}
            className="group"
            {...(index === 0 ? { open: true } : {})}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 font-display text-[15.5px] font-semibold leading-snug text-obsidian transition-colors hover:bg-neutral-50 md:px-8 md:py-6 md:text-[17px]">
              <span>{item.q}</span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 font-mono text-[18px] leading-none text-subtle transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-6 pb-6 pt-0 text-[14px] leading-relaxed text-subtle md:px-8 md:pb-8 md:text-[15px]">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </SectionWrapper>
  );
}
