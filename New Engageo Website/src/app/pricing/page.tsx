import type { Metadata } from 'next';
import { Fragment } from 'react';
import { CTASection } from '@/components/home/CTASection';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { PricingTable } from '@/components/pricing/PricingTable';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

const PRICING_TITLE = 'Pricing — Clinic Appointment Recovery Software';
const PRICING_DESCRIPTION =
  'Transparent INR pricing for Indian clinics. Starter ₹25,000/mo, Growth ₹55,000/mo, Enterprise custom. 14-day free trial. No setup fees. Save 20% annual.';

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

type MatrixRow = {
  feature: string;
  starter: string | boolean;
  growth: string | boolean;
  enterprise: string | boolean;
};

type MatrixSection = {
  title: string;
  rows: readonly MatrixRow[];
};

const MATRIX: readonly MatrixSection[] = [
  {
    title: 'Core recovery',
    rows: [
      { feature: 'Clinic numbers', starter: '1', growth: '3', enterprise: 'Unlimited' },
      { feature: 'Missed-call recoveries / month', starter: '200', growth: 'Unlimited', enterprise: 'Unlimited' },
      { feature: 'Response time', starter: '< 30 seconds', growth: '< 30 seconds', enterprise: '< 15 seconds (SLA)' },
      { feature: 'WhatsApp recovery', starter: true, growth: true, enterprise: true },
      { feature: 'SMS fallback', starter: false, growth: true, enterprise: true },
    ],
  },
  {
    title: 'Language + templates',
    rows: [
      { feature: 'Indian languages', starter: 'English + Hindi', growth: 'All 7', enterprise: 'All 7 + custom' },
      { feature: 'Custom templates', starter: '2 variants', growth: 'Unlimited', enterprise: 'Unlimited + A/B' },
      { feature: 'A/B testing', starter: false, growth: true, enterprise: true },
      { feature: 'Doctor-specific tone', starter: false, growth: true, enterprise: true },
    ],
  },
  {
    title: 'Follow-up & journeys',
    rows: [
      { feature: 'Initial recovery message', starter: true, growth: true, enterprise: true },
      { feature: '4-touchpoint journey', starter: false, growth: true, enterprise: true },
      { feature: 'Custom sequences', starter: false, growth: '3 sequences', enterprise: 'Unlimited' },
    ],
  },
  {
    title: 'Analytics & reporting',
    rows: [
      { feature: 'Weekly summary email', starter: true, growth: true, enterprise: true },
      { feature: 'Live dashboard', starter: true, growth: true, enterprise: true },
      { feature: 'Per-doctor breakdown', starter: false, growth: true, enterprise: true },
      { feature: 'Hour-of-day heatmap', starter: false, growth: true, enterprise: true },
      { feature: 'CSV + API export', starter: false, growth: 'CSV', enterprise: 'CSV + API' },
    ],
  },
  {
    title: 'Integrations',
    rows: [
      { feature: 'Google Calendar / iCal', starter: true, growth: true, enterprise: true },
      { feature: 'Practo', starter: false, growth: true, enterprise: true },
      { feature: 'HMS / PMS (DocPulse, Halemind, etc.)', starter: false, growth: '1 system', enterprise: 'Unlimited + custom' },
      { feature: 'Webhook events', starter: false, growth: false, enterprise: true },
      { feature: 'Full REST API', starter: false, growth: false, enterprise: true },
    ],
  },
  {
    title: 'Support',
    rows: [
      { feature: 'Email support', starter: '48h', growth: '24h', enterprise: '4h SLA' },
      { feature: 'WhatsApp support', starter: false, growth: true, enterprise: true },
      { feature: 'Dedicated success manager', starter: false, growth: false, enterprise: true },
      { feature: 'Quarterly business review', starter: false, growth: false, enterprise: true },
      { feature: 'Priority incident response', starter: false, growth: false, enterprise: true },
    ],
  },
];

function MatrixCell({ value }: { value: string | boolean }): JSX.Element {
  if (value === true) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-label="Included"
        className="mx-auto text-primary-500"
      >
        <path
          d="M4 9l3.5 3.5L14 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (value === false) {
    return (
      <span aria-label="Not included" className="mx-auto block h-px w-3 bg-neutral-300" />
    );
  }
  return (
    <span className="text-[13px] font-medium text-obsidian/85">{value}</span>
  );
}

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
            Priced for{' '}
            <span className="serif-hero">every clinic.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-subtle md:text-lg">
            Three plans. No setup fees. No contracts. Pay monthly or save
            20% annual. A 14-day free trial on every tier — no credit
            card required.
          </p>
        </div>
      </SectionWrapper>

      {/* Tier cards + toggle */}
      <SectionWrapper id="pricing-tiers" className="pt-0 md:pt-0">
        <PricingTable />
      </SectionWrapper>

      {/* Feature comparison matrix */}
      <SectionWrapper id="comparison" className="bg-sand/40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Everything compared</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
            Full feature matrix.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            Every feature, every tier. No hidden gates.
          </p>
        </div>

        {/* Desktop matrix */}
        <div className="mt-14 hidden overflow-hidden rounded-2xl border border-neutral-200 bg-surface shadow-subtle md:block">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-surface">
              <tr className="border-b border-neutral-200 bg-neutral-50/60">
                <th className="w-[40%] px-6 py-4 font-display text-[13px] font-semibold uppercase tracking-widest text-subtle">
                  Feature
                </th>
                <th className="w-[20%] px-6 py-4 text-center font-display text-[13px] font-semibold uppercase tracking-widest text-obsidian">
                  Starter
                </th>
                <th className="w-[20%] px-6 py-4 text-center font-display text-[13px] font-semibold uppercase tracking-widest text-primary-600">
                  Growth
                </th>
                <th className="w-[20%] px-6 py-4 text-center font-display text-[13px] font-semibold uppercase tracking-widest text-obsidian">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((section) => (
                <Fragment key={section.title}>
                  <tr className="border-t border-neutral-200 bg-neutral-50/30">
                    <th
                      colSpan={4}
                      className="px-6 py-3 text-left font-display text-[11px] font-semibold uppercase tracking-widest text-primary-600"
                    >
                      {section.title}
                    </th>
                  </tr>
                  {section.rows.map((row) => (
                    <tr
                      key={`${section.title}-${row.feature}`}
                      className="border-t border-neutral-200"
                    >
                      <td className="px-6 py-3.5 text-[13.5px] font-medium text-obsidian">
                        {row.feature}
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <MatrixCell value={row.starter} />
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <MatrixCell value={row.growth} />
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <MatrixCell value={row.enterprise} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked matrix */}
        <div className="mt-14 space-y-8 md:hidden">
          {MATRIX.map((section) => (
            <div key={section.title}>
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                {section.title}
              </h3>
              <ul className="mt-3 divide-y divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-surface">
                {section.rows.map((row) => (
                  <li key={row.feature} className="p-4">
                    <p className="font-display text-[13.5px] font-semibold text-obsidian">
                      {row.feature}
                    </p>
                    <dl className="mt-2 grid grid-cols-3 gap-2 text-[12px]">
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-subtle">Starter</dt>
                        <dd className="mt-1">
                          <MatrixCell value={row.starter} />
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-primary-600">Growth</dt>
                        <dd className="mt-1">
                          <MatrixCell value={row.growth} />
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-subtle">Enterprise</dt>
                        <dd className="mt-1">
                          <MatrixCell value={row.enterprise} />
                        </dd>
                      </div>
                    </dl>
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
            Trial, billing, switching plans, WhatsApp fees — here is how
            it all works.
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
