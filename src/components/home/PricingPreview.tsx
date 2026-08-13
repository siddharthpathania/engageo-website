'use client';

import { ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, type MouseEvent } from 'react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { cn } from '@/lib/utils';

type Billing = 'monthly' | 'quarterly' | 'annual';

const BILLING_OPTIONS: readonly { value: Billing; label: string }[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: '3 Months' },
  { value: 'annual', label: '12 Months' },
];

type PriceView = {
  price: string;
  cadence: string;
  altNote: string;
};

type Tier = {
  id: 'solo' | 'growth' | 'enterprise';
  name: string;
  audience: string;
  view: Record<Billing, PriceView>;
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
    view: {
      monthly: { price: '₹7,499', cadence: '/ month', altNote: 'Billed monthly · cancel anytime' },
      quarterly: { price: '₹7,000', cadence: '/ month', altNote: '₹20,999 billed every 3 months' },
      annual: { price: '₹6,833', cadence: '/ month', altNote: '₹81,999 billed yearly' },
    },
    features: [
      '1 clinic number',
      '150 calls / month, then ₹7 / minute',
      'Up to 150 patient appointments / month',
      'Free CRM to track every patient',
      'WhatsApp recovery + reminders',
      'Google Calendar sync',
    ],
    ctaLabel: 'Start Free Trial',
    ctaHref: '/contact?plan=solo',
  },
  {
    id: 'growth',
    name: 'Growth',
    audience: 'Up to 3 clinics',
    view: {
      monthly: { price: '₹22,497', cadence: '/ month', altNote: 'Billed monthly · cancel anytime' },
      quarterly: { price: '₹20,999', cadence: '/ month', altNote: '₹62,997 billed every 3 months' },
      annual: { price: '₹20,500', cadence: '/ month', altNote: '₹2,45,997 billed yearly' },
    },
    features: [
      'Up to 3 clinic numbers / locations',
      '450 calls / month, then ₹7 / minute',
      'Up to 450 patient appointments / month',
      'Multi-clinic dashboard + routing',
      'Free CRM + priority support',
      'All 12 Indian languages',
    ],
    ctaLabel: 'Start Free Trial',
    ctaHref: '/contact?plan=growth',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    audience: 'Hospital chains',
    view: {
      monthly: { price: 'Custom', cadence: '', altNote: 'Annual contract · volume pricing' },
      quarterly: { price: 'Custom', cadence: '', altNote: 'Annual contract · volume pricing' },
      annual: { price: 'Custom', cadence: '', altNote: 'Annual contract · volume pricing' },
    },
    features: [
      'Unlimited locations & calls',
      'HMS / PMS integration',
      'Dedicated success manager',
      'SLA + priority support',
      'Custom onboarding',
    ],
    ctaLabel: 'Talk to Sales',
    ctaHref: '/contact?plan=enterprise',
  },
];

export function PricingPreview(): JSX.Element {
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <SectionWrapper id="pricing" ariaLabel="Pricing plans">
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-label justify-center">Investment</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
          Plans for every clinic size.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
          Start solo at ₹7,499/month, scale to three clinics, or go custom for a
          hospital chain. Pay monthly, quarterly, or yearly — a free CRM on every
          plan.
        </p>

        {/* Billing toggle */}
        <div className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Billing period"
            className="inline-flex items-center rounded-full border border-neutral-200 bg-surface p-1 shadow-subtle"
          >
            {BILLING_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={billing === option.value}
                onClick={() => setBilling(option.value)}
                className={cn(
                  'rounded-full px-4 py-2 text-[13px] font-semibold transition-all sm:px-5',
                  billing === option.value
                    ? 'bg-obsidian text-surface shadow-subtle'
                    : 'text-subtle hover:text-obsidian',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:mt-14 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <PricingCard key={tier.id} tier={tier} billing={billing} />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-2 text-[13px] font-medium text-obsidian transition-colors hover:text-primary-600"
        >
          View full pricing + what’s included
          <ChevronRight
            size={14}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
        <p className="text-[11px] text-subtle">
          14-day free trial. No setup fees. No contracts.
        </p>
      </div>
    </SectionWrapper>
  );
}

function PricingCard({ tier, billing }: { tier: Tier; billing: Billing }): JSX.Element {
  const featured = Boolean(tier.featured);
  const view = tier.view[billing];
  const cardRef = useRef<HTMLElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLElement>): void {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }

  function handleMouseLeave(): void {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative flex flex-col rounded-3xl p-8 transition-all duration-300 ease-out will-change-transform md:p-9',
        featured
          ? 'border border-primary-600 bg-primary-500 text-surface shadow-glow gradient-border-spin'
          : 'border border-neutral-200 bg-surface text-obsidian hover:shadow-card-hover',
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {featured ? (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-600 shadow-subtle">
          Most Popular
        </span>
      ) : null}

      <div style={{ transform: 'translateZ(20px)' }}>
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

      <div className="mt-7 flex items-baseline gap-2" style={{ transform: 'translateZ(30px)' }}>
        <span
          className={cn(
            'font-display text-4xl font-semibold tracking-tight',
            featured ? 'text-surface' : 'text-obsidian',
          )}
        >
          {view.price}
        </span>
        {view.cadence ? (
          <span className={cn('text-sm font-medium', featured ? 'text-surface/70' : 'text-subtle')}>
            {view.cadence}
          </span>
        ) : null}
      </div>
      <p
        className={cn('mt-1 text-[12px]', featured ? 'text-surface/60' : 'text-subtle')}
        style={{ transform: 'translateZ(30px)' }}
      >
        {view.altNote}
      </p>

      <div className={cn('my-7 h-px w-full', featured ? 'bg-surface/20' : 'bg-neutral-200')} />

      <ul className="flex-1 space-y-3" style={{ transform: 'translateZ(15px)' }}>
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug">
            <Check
              size={16}
              strokeWidth={2.25}
              className={cn('mt-0.5 shrink-0', featured ? 'text-surface' : 'text-primary-500')}
              aria-hidden="true"
            />
            <span className={featured ? 'text-surface/95' : 'text-obsidian/85'}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={tier.ctaHref}
        className={cn(
          'mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition-all',
          featured
            ? 'bg-surface text-primary-600 hover:bg-surface/90'
            : 'border border-obsidian bg-transparent text-obsidian hover:bg-obsidian hover:text-surface',
        )}
        style={{ transform: 'translateZ(25px)' }}
      >
        {tier.ctaLabel}
        <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
      </Link>
    </article>
  );
}
