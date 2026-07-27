'use client';

import { Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Billing = 'monthly' | 'annual';

type PriceView = {
  label: string;
  cadence: string;
  /** Alternative-cadence note under the price. */
  alt: string;
  /** Call-allowance line under the price. */
  meter: string;
};

type Tier = {
  id: 'solo' | 'growth' | 'enterprise';
  name: string;
  audience: string;
  tagline: string;
  price: Record<Billing, PriceView>;
  features: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

const TIERS: readonly Tier[] = [
  {
    id: 'solo',
    name: 'Solo',
    audience: '1 clinic',
    tagline: 'One number, never a missed call.',
    price: {
      monthly: {
        label: '₹7,499',
        cadence: '/ month',
        alt: 'or ₹89,988 / year, billed annually',
        meter: '150 calls included each month, then ₹7 / minute.',
      },
      annual: {
        label: '₹89,988',
        cadence: '/ year',
        alt: '₹7,499 / month, billed once a year',
        meter: '1,800 calls included per year, then ₹7 / minute.',
      },
    },
    features: [
      '1 clinic number',
      'Up to 150 patient appointments booked / month',
      'Free CRM to track every patient',
      'WhatsApp recovery (Meta-verified) + reminders',
      'Google Calendar sync',
      'All 12 Indian languages',
    ],
    ctaLabel: 'Start Free Trial',
    ctaHref: '/contact?plan=solo',
  },
  {
    id: 'growth',
    name: 'Growth',
    audience: 'Up to 3 clinics',
    tagline: 'Multi-doctor clinics and small chains.',
    price: {
      monthly: {
        label: '₹22,497',
        cadence: '/ month',
        alt: 'or ₹2,69,964 / year, billed annually',
        meter: '450 calls included each month, then ₹7 / minute.',
      },
      annual: {
        label: '₹2,69,964',
        cadence: '/ year',
        alt: '₹22,497 / month, billed once a year',
        meter: '5,400 calls included per year, then ₹7 / minute.',
      },
    },
    features: [
      'Up to 3 clinic numbers / locations',
      'Up to 450 patient appointments booked / month',
      'Multi-clinic dashboard + call routing',
      'Free CRM to track every patient',
      'WhatsApp recovery + reminders',
      'All 12 Indian languages',
      'Priority support',
    ],
    ctaLabel: 'Start Free Trial',
    ctaHref: '/contact?plan=growth',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    audience: 'Hospital chains · 4+ locations',
    tagline: 'For chains expanding across cities.',
    price: {
      monthly: {
        label: 'Custom',
        cadence: '',
        alt: 'Annual contract · volume pricing',
        meter: 'Unlimited calls and locations — custom quote.',
      },
      annual: {
        label: 'Custom',
        cadence: '',
        alt: 'Annual contract · volume pricing',
        meter: 'Unlimited calls and locations — custom quote.',
      },
    },
    features: [
      'Unlimited clinic numbers + locations',
      'Unlimited calls & appointments',
      'HMS / PMS integration',
      'Dedicated success manager',
      'SLA + priority incident support',
      'Custom onboarding',
    ],
    ctaLabel: 'Talk to Sales',
    ctaHref: '/contact?plan=enterprise',
  },
];

export function PricingTable(): JSX.Element {
  const [billing, setBilling] = useState<Billing>('annual');

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          role="tablist"
          aria-label="Billing period"
          className="inline-flex items-center rounded-full border border-neutral-200 bg-surface p-1 shadow-subtle"
        >
          {(['monthly', 'annual'] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={billing === option}
              onClick={() => setBilling(option)}
              className={cn(
                'rounded-full px-5 py-2 text-[13px] font-semibold capitalize transition-all',
                billing === option
                  ? 'bg-obsidian text-surface shadow-subtle'
                  : 'text-subtle hover:text-obsidian',
              )}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="text-[12px] text-subtle">
          Includes a 14-day free trial. No credit card required.
        </p>
      </div>

      {/* Tier cards */}
      <div className="mt-12 grid gap-5 md:mt-14 lg:grid-cols-3">
        {TIERS.map((tier) => {
          const featured = Boolean(tier.featured);
          const view = tier.price[billing];
          return (
            <article
              key={tier.id}
              className={cn(
                'relative flex flex-col rounded-3xl p-8 transition-all md:p-9',
                featured
                  ? 'border border-primary-600 bg-primary-500 text-surface shadow-glow'
                  : 'border border-neutral-200 bg-surface text-obsidian',
              )}
            >
              {featured ? (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-600 shadow-subtle">
                  Most Popular
                </span>
              ) : null}

              <div>
                <h3
                  className={cn(
                    'font-display text-xl font-semibold tracking-tight md:text-[22px]',
                    featured ? 'text-surface' : 'text-obsidian',
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={cn(
                    'mt-1 text-[12px] font-medium uppercase tracking-widest',
                    featured ? 'text-surface/70' : 'text-subtle',
                  )}
                >
                  {tier.audience}
                </p>
              </div>

              <p className={cn('mt-4 text-sm leading-relaxed', featured ? 'text-surface/90' : 'text-subtle')}>
                {tier.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className={cn(
                    'font-display text-4xl font-semibold tracking-tight md:text-[42px]',
                    featured ? 'text-surface' : 'text-obsidian',
                  )}
                >
                  {view.label}
                </span>
                {view.cadence ? (
                  <span className={cn('text-sm font-medium', featured ? 'text-surface/70' : 'text-subtle')}>
                    {view.cadence}
                  </span>
                ) : null}
              </div>
              <p className={cn('mt-1 text-[12px]', featured ? 'text-surface/60' : 'text-subtle')}>
                {view.alt}
              </p>
              <p className={cn('mt-2 text-[12px]', featured ? 'text-surface/70' : 'text-subtle')}>
                {view.meter}
              </p>

              <div className={cn('my-7 h-px w-full', featured ? 'bg-surface/20' : 'bg-neutral-200')} />

              <ul className="flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug">
                    <Check
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      className={cn('mt-0.5 shrink-0', featured ? 'text-surface' : 'text-primary-500')}
                    />
                    <span className={featured ? 'text-surface/95' : 'text-obsidian/85'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className={cn(
                  'mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-[13px] font-semibold transition-all',
                  featured
                    ? 'bg-surface text-primary-600 hover:bg-surface/90'
                    : 'border border-obsidian bg-transparent text-obsidian hover:bg-obsidian hover:text-surface',
                )}
              >
                {tier.ctaLabel}
                <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
