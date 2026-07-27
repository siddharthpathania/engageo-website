import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import { CTASection } from '@/components/home/CTASection';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { PricingTable } from '@/components/pricing/PricingTable';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

const PRICING_TITLE = 'Pricing — Clinic Appointment Recovery Software';
const PRICING_DESCRIPTION =
  'Simple, transparent pricing for Indian clinics — ₹7,500/month or ₹90,000/year, with 150 calls a month (1,800 a year), then ₹7/minute. Up to 150 patient appointments booked and a free CRM. 14-day free trial, no setup fees, no contracts.';

export const metadata: Metadata = {
  title: { absolute: `${PRICING_TITLE} | Engageo` },
  description: PRICING_DESCRIPTION,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: `${PRICING_TITLE} | Engageo`,
    description: PRICING_DESCRIPTION,
    url: '/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PRICING_TITLE} | Engageo`,
    description: PRICING_DESCRIPTION,
  },
};

type IncludedSection = {
  title: string;
  items: readonly string[];
};

const INCLUDED: readonly IncludedSection[] = [
  {
    title: 'Call recovery',
    items: [
      '150 calls a month (1,800 a year), then ₹7 / minute',
      'Up to 150 patient appointments booked / month',
      '< 30-second response to every missed call',
      'WhatsApp recovery (Meta-verified)',
    ],
  },
  {
    title: 'Booking & CRM',
    items: [
      'Free CRM to track every patient',
      'Google Calendar / iCal sync',
      'WhatsApp confirmations + reminders',
    ],
  },
  {
    title: 'Language & templates',
    items: [
      'All 12 Indian languages',
      'Custom message templates',
      'Doctor-specific tone',
    ],
  },
  {
    title: 'Analytics & support',
    items: [
      'Weekly recovery report + live dashboard',
      'Email + WhatsApp support',
      'No setup fees, no contracts',
    ],
  },
];

export default function PricingPage(): JSX.Element {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Pricing', href: '/pricing' },
        ]}
      />

      {/* Page hero */}
      <SectionWrapper id="pricing-hero" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Pricing</span>
          <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-6xl lg:text-[72px]">
            One simple{' '}
            <span className="serif-hero">plan.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-subtle md:text-lg">
            ₹7,500 a month, or ₹90,000 a year. 150 calls a month (1,800 a year),
            then ₹7 per minute. Up to 150 patient appointments booked, and a free
            CRM to track them. A 14-day free trial, no credit card, no contracts.
          </p>
        </div>
      </SectionWrapper>

      {/* Plan card */}
      <SectionWrapper id="pricing-plan" className="pt-0 md:pt-0">
        <PricingTable />
      </SectionWrapper>

      {/* Everything included */}
      <SectionWrapper id="whats-included" className="bg-sand/40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Everything included</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
            Everything in Growth.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            One price, every feature. No gates, no add-on tiers.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:mt-18 md:grid-cols-2">
          {INCLUDED.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-neutral-200 bg-surface p-6 md:p-7"
            >
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-snug"
                  >
                    <Check
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-primary-500"
                    />
                    <span className="text-obsidian/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Pricing FAQ */}
      <SectionWrapper id="pricing-faq">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Pricing questions</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
            Before you sign up.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            Trial, billing, call minutes, WhatsApp fees — here is how it all
            works.
          </p>
        </div>

        <div className="mt-14 md:mt-18">
          <PricingFAQ />
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
