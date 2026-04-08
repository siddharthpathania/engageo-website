'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Tier = {
  id: 'starter' | 'growth' | 'enterprise';
  name: string;
  audience: string;
  monthlyPrice: number | null;
  cadence: string;
  tagline: string;
  features: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

const TIERS: readonly Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    audience: 'Solo practitioner · 1 clinic',
    monthlyPrice: 25000,
    cadence: '/ month',
    tagline: 'Plug in one number. Never miss another call.',
    features: [
      '1 clinic number',
      '200 missed-call recoveries / month',
      'WhatsApp recovery (Meta-verified)',
      'Single calendar sync',
      'Weekly summary email',
      'English + Hindi templates',
    ],
    ctaLabel: 'Start Free Trial',
    ctaHref: '/contact?plan=starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    audience: 'Multi-doctor clinic · 2–3 branches',
    monthlyPrice: 55000,
    cadence: '/ month',
    tagline: 'For clinics that already have inbound volume.',
    features: [
      '3 clinic numbers',
      'Unlimited recoveries',
      'WhatsApp + SMS fallback',
      '4-touchpoint follow-up journeys',
      'Analytics dashboard + A/B tests',
      'All 7 Indian languages',
      'Multi-doctor routing',
      'Custom templates + tone tuning',
    ],
    ctaLabel: 'Start Free Trial',
    ctaHref: '/contact?plan=growth',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    audience: 'Hospital chain · 4+ locations',
    monthlyPrice: null,
    cadence: 'custom',
    tagline: 'For chains expanding across cities.',
    features: [
      'Unlimited numbers + branches',
      'Unlimited recoveries + SMS volume',
      'API access + webhook events',
      'HMS/PMS integration (custom)',
      'Dedicated success manager',
      'SLA + priority incident support',
      'SSO + role-based access',
      'Quarterly business review',
    ],
    ctaLabel: 'Talk to Sales',
    ctaHref: '/contact?plan=enterprise',
  },
];

const ANNUAL_DISCOUNT = 0.2;

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function PricingTable(): JSX.Element {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

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
              'relative rounded-full px-5 py-2 text-[13px] font-semibold transition-all',
              billing === 'annual'
                ? 'bg-obsidian text-surface shadow-subtle'
                : 'text-subtle hover:text-obsidian',
            )}
          >
            Annual
            <span
              className={cn(
                'ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-colors',
                billing === 'annual'
                  ? 'bg-success-500 text-surface'
                  : 'bg-success-50 text-success-700',
              )}
            >
              Save 20%
            </span>
          </button>
        </div>
        <p className="text-[12px] text-subtle">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>

      {/* Tier cards */}
      <div className="mt-12 grid gap-5 md:mt-14 lg:grid-cols-3">
        {TIERS.map((tier) => {
          const featured = Boolean(tier.featured);
          const displayPrice =
            tier.monthlyPrice === null
              ? 'Custom'
              : billing === 'annual'
                ? formatINR(Math.round(tier.monthlyPrice * (1 - ANNUAL_DISCOUNT)))
                : formatINR(tier.monthlyPrice);
          const strikePrice =
            billing === 'annual' && tier.monthlyPrice !== null
              ? formatINR(tier.monthlyPrice)
              : null;

          return (
            <article
              key={tier.id}
              className={cn(
                'relative flex flex-col rounded-3xl p-8 transition-all duration-450 md:p-9',
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

              <p
                className={cn(
                  'mt-4 text-sm leading-relaxed',
                  featured ? 'text-surface/90' : 'text-subtle',
                )}
              >
                {tier.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className={cn(
                    'font-display text-4xl font-semibold tracking-tight md:text-[42px]',
                    featured ? 'text-surface' : 'text-obsidian',
                  )}
                >
                  {displayPrice}
                </span>
                <span
                  className={cn(
                    'text-sm font-medium',
                    featured ? 'text-surface/70' : 'text-subtle',
                  )}
                >
                  {tier.cadence}
                </span>
              </div>
              {strikePrice ? (
                <p
                  className={cn(
                    'mt-1 text-[12px]',
                    featured ? 'text-surface/60' : 'text-subtle',
                  )}
                >
                  <span className="line-through">{strikePrice}</span>
                  {' · billed annually'}
                </p>
              ) : (
                <p
                  className={cn(
                    'mt-1 text-[12px]',
                    featured ? 'text-surface/60' : 'text-subtle',
                  )}
                >
                  {tier.monthlyPrice === null
                    ? 'Annual contract · volume pricing'
                    : 'Billed monthly · cancel anytime'}
                </p>
              )}

              <div
                className={cn(
                  'my-7 h-px w-full',
                  featured ? 'bg-surface/20' : 'bg-neutral-200',
                )}
              />

              <ul className="flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-snug"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={cn(
                        'mt-0.5 shrink-0',
                        featured ? 'text-surface' : 'text-primary-500',
                      )}
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8l3.5 3.5L13 4.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className={featured ? 'text-surface/95' : 'text-obsidian/85'}
                    >
                      {feature}
                    </span>
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
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M5 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
