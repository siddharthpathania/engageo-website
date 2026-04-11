'use client';

import Link from 'next/link';
import { useRef, type MouseEvent } from 'react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { cn } from '@/lib/utils';

type Tier = {
  id: 'starter' | 'growth' | 'enterprise';
  name: string;
  audience: string;
  price: string;
  cadence: string;
  features: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

const TIERS: readonly Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    audience: 'Solo practitioners',
    price: '₹25,000',
    cadence: '/ month',
    features: [
      'Up to 400 missed calls / mo',
      'WhatsApp recovery sequence',
      'Single calendar sync',
      'Weekly recovery report',
    ],
    ctaLabel: 'Start Free Trial',
    ctaHref: '/contact?plan=starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    audience: 'Multi-doctor clinics',
    price: '₹55,000',
    cadence: '/ month',
    features: [
      'Unlimited missed calls',
      'Multi-doctor routing',
      '4-touchpoint WhatsApp journey',
      'Custom templates + A/B tests',
      'Analytics dashboard',
    ],
    ctaLabel: 'Book a Strategy Call',
    ctaHref: 'https://calendly.com/engageoagency',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    audience: 'Hospital chains',
    price: 'Custom',
    cadence: 'annual',
    features: [
      'Multi-location rollout',
      'HMS / PMS integration',
      'Dedicated success manager',
      'SLA + priority support',
    ],
    ctaLabel: 'Talk to Sales',
    ctaHref: '/contact?plan=enterprise',
  },
];

export function PricingPreview(): JSX.Element {
  return (
    <SectionWrapper id="pricing" ariaLabel="Pricing plans">
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-label justify-center">Investment</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
          Priced for your growth stage.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
          One plan for the solo dermatologist. One for the 12-chair dental
          group. One for the chain expanding across five cities.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:mt-18 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-2 text-[13px] font-medium text-obsidian transition-colors hover:text-primary-600"
        >
          View full pricing + feature comparison
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path
              d="M5 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <p className="text-[11px] text-subtle">
          All plans include the 15-booking guarantee. No setup fees. No
          contracts.
        </p>
      </div>
    </SectionWrapper>
  );
}

function PricingCard({ tier }: { tier: Tier }): JSX.Element {
  const featured = Boolean(tier.featured);
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

      <div
        className="mt-7 flex items-baseline gap-2"
        style={{ transform: 'translateZ(30px)' }}
      >
        <span
          className={cn(
            'font-display text-4xl font-semibold tracking-tight',
            featured ? 'text-surface' : 'text-obsidian',
          )}
        >
          {tier.price}
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

      <div
        className={cn(
          'my-7 h-px w-full',
          featured ? 'bg-surface/20' : 'bg-neutral-200',
        )}
      />

      <ul className="flex-1 space-y-3" style={{ transform: 'translateZ(15px)' }}>
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug">
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
            <span className={featured ? 'text-surface/95' : 'text-obsidian/85'}>
              {feature}
            </span>
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
}
