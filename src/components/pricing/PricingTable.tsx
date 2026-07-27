import { Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Plan = {
  name: string;
  audience: string;
  priceLabel: string;
  cadence: string;
  tagline: string;
  meter: string;
  features: readonly string[];
  ctaLabel: string;
  ctaHref: string;
};

const PLAN: Plan = {
  name: 'Growth',
  audience: 'Clinics & hospitals of every size',
  priceLabel: '₹7,500',
  cadence: '/ month',
  tagline: 'One plan. Every missed call answered, every patient booked.',
  meter: '150 calls included each month, then ₹7 / minute.',
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
};

export function PricingTable(): JSX.Element {
  return (
    <div>
      <p className="text-center text-[12px] text-subtle">
        Includes a 14-day free trial. No credit card required.
      </p>

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

          <p className="mt-4 text-sm leading-relaxed text-surface/90">
            {PLAN.tagline}
          </p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-4xl font-semibold tracking-tight text-surface md:text-[42px]">
              {PLAN.priceLabel}
            </span>
            <span className="text-sm font-medium text-surface/70">{PLAN.cadence}</span>
          </div>
          <p className="mt-1 text-[12px] text-surface/70">{PLAN.meter}</p>

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
            className={cn(
              'mt-8 inline-flex items-center justify-center gap-1.5 rounded-full bg-surface px-5 py-3 text-[13px] font-semibold text-primary-600 transition-all hover:bg-surface/90',
            )}
          >
            {PLAN.ctaLabel}
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </article>
      </div>
    </div>
  );
}
