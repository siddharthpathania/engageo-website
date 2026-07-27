'use client';

import { Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Billing = 'monthly' | 'annual';

const PLAN = {
  name: 'Growth',
  audience: 'Clinics & hospitals of every size',
  tagline: 'One plan. Every missed call answered, every patient booked.',
  price: {
    monthly: { label: '₹7,500', cadence: '/ month', meter: '150 calls included each month, then ₹7 / minute.' },
    annual: { label: '₹90,000', cadence: '/ year', meter: '1,800 calls included per year, then ₹7 / minute.' },
  },
  // Note under the price, showing the alternative cadence.
  altNote: {
    monthly: 'or ₹90,000 / year, billed annually',
    annual: '₹7,500 / month, billed once a year',
  },
  features: [
    'Up to 150 patient appointments booked / month',
    'Free CRM to track every patient',
    'WhatsApp recovery (Meta-verified) + reminders',
    'Google Calendar sync',
    'All 12 Indian languages',
    '< 30-second response to every missed call',
    'Weekly recovery report + live dashboard',
  ],
  ctaLabel: 'Start Free Trial',
  ctaHref: '/contact?plan=growth',
} as const;

export function PricingTable(): JSX.Element {
  const [billing, setBilling] = useState<Billing>('annual');
  const price = PLAN.price[billing];

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          role="tablist"
          aria-label="Billing period"
          className="inline-flex items-center rounded-full border border-neutral-200 bg-surface p-1 shadow-subtle"
        >
          <button
            type="button"
            role="tab"
            aria-selected={billing === 'monthly'}
            onClick={() => setBilling('monthly')}
            className={cn(
              'rounded-full px-5 py-2 text-[13px] font-semibold transition-all',
              billing === 'monthly'
                ? 'bg-obsidian text-surface shadow-subtle'
                : 'text-subtle hover:text-obsidian',
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={billing === 'annual'}
            onClick={() => setBilling('annual')}
            className={cn(
              'rounded-full px-5 py-2 text-[13px] font-semibold transition-all',
              billing === 'annual'
                ? 'bg-obsidian text-surface shadow-subtle'
                : 'text-subtle hover:text-obsidian',
            )}
          >
            Annual
          </button>
        </div>
        <p className="text-[12px] text-subtle">
          Includes a 14-day free trial. No credit card required.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md md:mt-12">
        <article className="relative flex flex-col rounded-3xl border border-primary-600 bg-primary-500 p-8 text-surface shadow-glow md:p-9">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-surface md:text-[22px]">
              {PLAN.name}
            </h3>
            <p className="mt-1 text-[12px] font-medium uppercase tracking-widest text-surface/70">
              {PLAN.audience}
            </p>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-surface/90">{PLAN.tagline}</p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-4xl font-semibold tracking-tight text-surface md:text-[42px]">
              {price.label}
            </span>
            <span className="text-sm font-medium text-surface/70">{price.cadence}</span>
          </div>
          <p className="mt-1 text-[12px] text-surface/60">{PLAN.altNote[billing]}</p>
          <p className="mt-2 text-[12px] text-surface/70">{price.meter}</p>

          <div className="my-7 h-px w-full bg-surface/20" />

          <ul className="flex-1 space-y-3">
            {PLAN.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug">
                <Check
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-surface"
                />
                <span className="text-surface/95">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href={PLAN.ctaHref}
            className="mt-8 inline-flex items-center justify-center gap-1.5 rounded-full bg-surface px-5 py-3 text-[13px] font-semibold text-primary-600 transition-all hover:bg-surface/90"
          >
            {PLAN.ctaLabel}
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </article>
      </div>
    </div>
  );
}
