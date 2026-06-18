import {
  BarChart3,
  Building2,
  CalendarCheck,
  Check,
  ChevronRight,
  type LucideIcon,
  MessageCircle,
  PhoneCall,
  Repeat,
  X,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CTASection } from '@/components/home/CTASection';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

const SERVICES_TITLE = 'AI Call Recovery & WhatsApp Automation';
const SERVICES_DESCRIPTION =
  'Six services for Indian clinics: AI call recovery for doctors, WhatsApp automation for clinics, booking links, follow-up journeys, analytics, multi-clinic ops.';

export const metadata: Metadata = {
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: '/services' },
  openGraph: {
    title: `${SERVICES_TITLE} | Engageo`,
    description: SERVICES_DESCRIPTION,
    url: '/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SERVICES_TITLE} | Engageo`,
    description: SERVICES_DESCRIPTION,
  },
};

type Service = {
  title: string;
  tagline: string;
  body: string;
  benefits: readonly string[];
  Icon: LucideIcon;
};

const SERVICES: readonly Service[] = [
  {
    title: 'Missed Call Recovery',
    tagline: 'The core engine',
    body: 'Every call your front desk misses is intercepted in under 3 seconds. The patient gets a personalised WhatsApp with your clinic name, the doctor, and a one-tap booking link — before they scroll to a competitor.',
    benefits: [
      'Works with any phone system — landline, VoIP, mobile',
      'Response fired in under 30 seconds, 24/7',
      'No hardware, no new app for your staff',
    ],
    Icon: PhoneCall,
  },
  {
    title: 'WhatsApp Auto-Reply',
    tagline: 'Conversation that converts',
    body: 'Meta-verified templates across 12 languages — the major Indian languages and Indian English. Messages match the patient — not the clinic owner. 94% open rate within 2 minutes.',
    benefits: [
      'Official Meta Business API — zero compliance risk',
      '12 Indian languages out of the box',
      'Clinic-specific tone, doctor names, CTAs',
    ],
    Icon: MessageCircle,
  },
  {
    title: 'Appointment Booking Links',
    tagline: 'One tap, booked slot',
    body: 'Smart scheduling links that sync with Google Calendar, iCal, Practo, or your HMS. Patients pick a time, you get a confirmed slot — no back-and-forth DMs, no phone tag.',
    benefits: [
      'Google Calendar, iCal, Outlook, Practo sync',
      'Doctor-specific availability rules',
      'Confirmation + reminder automation built in',
    ],
    Icon: CalendarCheck,
  },
  {
    title: 'Follow-up Sequences',
    tagline: 'Nurture without spam',
    body: 'A 4-touchpoint WhatsApp journey for every missed call: initial recovery, 24-hour nudge, 72-hour re-engagement with a new angle, 7-day final check-in. After that — archived. No burn-out, no reputation damage.',
    benefits: [
      '4 touchpoints over 7 days — then stop',
      'A/B test message angles per sequence',
      'Auto-pause when patient books or replies',
    ],
    Icon: Repeat,
  },
  {
    title: 'Analytics Dashboard',
    tagline: 'What Engageo saved you — in numbers',
    body: 'Real-time ledger: every call, every recovery, every booking, every rupee. Weekly email summary. Monthly deep-dive: trends, conversion by doctor, hour-of-day heatmap.',
    benefits: [
      'Live call + recovery + revenue ledger',
      'Weekly summary email, Monday 8am IST',
      'Per-doctor conversion and hour heatmap',
    ],
    Icon: BarChart3,
  },
  {
    title: 'Multi-Clinic Management',
    tagline: 'One dashboard, every location',
    body: 'Run 2 branches or 20. Central control of templates, doctor rosters, and routing rules — plus per-location performance views. Built for expanding chains.',
    benefits: [
      'Unified dashboard across all locations',
      'Per-branch templates + doctor routing',
      'Role-based access for local managers',
    ],
    Icon: Building2,
  },
];

type ComparisonRow = {
  label: string;
  without: string;
  with: string;
};

const COMPARISON: readonly ComparisonRow[] = [
  {
    label: 'Missed call at 8:47 PM',
    without: 'Patient leaves voicemail, forgets by morning',
    with: 'WhatsApp fires in 28 seconds with booking link',
  },
  {
    label: 'Response time',
    without: '6–48 hours (when staff gets to it)',
    with: 'Under 30 seconds, 24/7/365',
  },
  {
    label: 'Language support',
    without: 'Whatever your receptionist speaks',
    with: '12 Indian languages, patient-matched',
  },
  {
    label: 'Follow-up on no-reply',
    without: 'None — the lead is lost',
    with: '4 touchpoints over 7 days, then archived',
  },
  {
    label: 'Visibility into lost revenue',
    without: 'You guess. Maybe ₹2L? ₹4L?',
    with: 'Live ledger — down to the rupee',
  },
  {
    label: 'Front desk bandwidth',
    without: 'Juggling calls + walk-ins + chaos',
    with: 'Focused on in-clinic patients only',
  },
  {
    label: 'After-hours queries',
    without: 'Go unanswered, patient calls elsewhere',
    with: 'Answered automatically with booking CTA',
  },
];

export default function ServicesPage(): JSX.Element {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ]}
      />

      {/* Page hero */}
      <SectionWrapper id="services-hero" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">What we do</span>
          <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-6xl lg:text-[72px]">
            Six services.{' '}
            <span className="serif-hero">One outcome.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-subtle md:text-lg">
            Every piece of Engageo does one job: make sure no patient
            hangs up and doesn&rsquo;t hear back. Here is what you get
            on day one.
          </p>
        </div>
      </SectionWrapper>

      {/* Services grid */}
      <SectionWrapper id="services-grid" className="pt-0 md:pt-0">
        <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {SERVICES.map((service, index) => (
            <li
              key={service.title}
              className="group relative flex flex-col rounded-3xl border border-neutral-200 bg-surface p-7 transition-all duration-350 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100"
                >
                  <service.Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h2 className="mt-6 font-display text-[22px] font-semibold leading-tight tracking-tight text-obsidian md:text-2xl">
                {service.title}
              </h2>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                {service.tagline}
              </p>

              <p className="mt-4 text-[14px] leading-relaxed text-subtle md:text-[15px]">
                {service.body}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-neutral-200 pt-5">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2.5 text-[13px] leading-snug text-obsidian/85"
                  >
                    <Check
                      size={14}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-primary-500"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* Comparison table */}
      <SectionWrapper id="comparison" className="bg-sand/40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Before & after</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
            Without Engageo vs.{' '}
            <span className="serif-hero">with Engageo.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            The same missed call, two very different outcomes.
          </p>
        </div>

        <div className="mt-14 md:mt-18">
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-neutral-200 bg-surface shadow-subtle md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/60">
                  <th className="w-[28%] px-6 py-4 font-display text-[13px] font-semibold uppercase tracking-widest text-subtle">
                    Scenario
                  </th>
                  <th className="w-[36%] px-6 py-4 font-display text-[13px] font-semibold uppercase tracking-widest text-error-600">
                    Without Engageo
                  </th>
                  <th className="w-[36%] px-6 py-4 font-display text-[13px] font-semibold uppercase tracking-widest text-primary-600">
                    With Engageo
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, index) => (
                  <tr
                    key={row.label}
                    className={
                      index === COMPARISON.length - 1
                        ? ''
                        : 'border-b border-neutral-200'
                    }
                  >
                    <td className="px-6 py-5 font-display text-[14px] font-semibold text-obsidian">
                      {row.label}
                    </td>
                    <td className="px-6 py-5 text-[14px] leading-relaxed text-obsidian/70">
                      <span className="inline-flex items-start gap-2">
                        <X
                          size={14}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-error-500"
                        />
                        {row.without}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[14px] leading-relaxed text-obsidian">
                      <span className="inline-flex items-start gap-2">
                        <Check
                          size={14}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-primary-500"
                        />
                        {row.with}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <ul className="space-y-4 md:hidden">
            {COMPARISON.map((row) => (
              <li
                key={row.label}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-surface"
              >
                <div className="border-b border-neutral-200 bg-neutral-50/60 px-5 py-3">
                  <p className="font-display text-[13px] font-semibold uppercase tracking-widest text-obsidian">
                    {row.label}
                  </p>
                </div>
                <div className="divide-y divide-neutral-200">
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-error-600">
                      Without Engageo
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-obsidian/70">
                      {row.without}
                    </p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-600">
                      With Engageo
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-obsidian">
                      {row.with}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-obsidian bg-transparent px-6 py-3 text-[13px] font-semibold text-obsidian transition-all hover:bg-obsidian hover:text-surface"
          >
            See pricing
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-obsidian hover:text-primary-600"
          >
            How the engine works
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
