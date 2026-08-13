import { ChevronRight, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CTASection } from '@/components/home/CTASection';
import { ProviderWall } from '@/components/home/ProviderWall';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { cn } from '@/lib/utils';

const HIW_TITLE = 'How It Works — Patient Follow-Up Automation India';
const HIW_DESCRIPTION =
  'Missed call text back for hospitals and clinics. Engageo fires a WhatsApp within 30 seconds of any unanswered call. Live in 15 minutes on your existing number.';

export const metadata: Metadata = {
  title: { absolute: `${HIW_TITLE} | Engageo` },
  description: HIW_DESCRIPTION,
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: `${HIW_TITLE} | Engageo`,
    description: HIW_DESCRIPTION,
    url: '/how-it-works',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${HIW_TITLE} | Engageo`,
    description: HIW_DESCRIPTION,
  },
};

type FlowStage = {
  stage: string;
  title: string;
  body: string;
  latency: string;
  side: 'left' | 'right';
};

const FLOW: readonly FlowStage[] = [
  {
    stage: '00:00',
    title: 'Patient dials your clinic number',
    body: 'Monday 9 PM. Patient scrolls Practo, finds you, dials. Your front desk closed at 7. The call rings out.',
    latency: 'T = 0s',
    side: 'left',
  },
  {
    stage: '00:03',
    title: 'Engageo intercepts the missed call event',
    body: 'Your telecom provider pushes the missed-call webhook to Engageo. We parse caller number, time, and doctor the patient was trying to reach (if mapped).',
    latency: '+3 seconds',
    side: 'right',
  },
  {
    stage: '00:08',
    title: 'AI classifies intent + picks language',
    body: 'Was this a booking query, a follow-up, or a billing call? Language detection uses the caller\u2019s state code and prior history. Across all 12 of our supported languages.',
    latency: '+5 seconds',
    side: 'left',
  },
  {
    stage: '00:22',
    title: 'Meta-verified WhatsApp template fires',
    body: 'Personalised with clinic name, doctor name, specialty, and a one-tap booking link. Official WABA template — 94% open rate within 2 minutes.',
    latency: '+14 seconds',
    side: 'right',
  },
  {
    stage: '02:30',
    title: 'Patient taps link, picks a slot',
    body: 'Calendar syncs from Google/iCal/Practo/HMS. Patient selects time, receives confirmation WhatsApp. Slot locked in your calendar.',
    latency: '+2 minutes avg',
    side: 'left',
  },
  {
    stage: '24:00',
    title: 'Dashboard updates, you see the win',
    body: 'Recovery logged with call metadata, patient response, booked slot, estimated LTV. Weekly summary email Monday morning.',
    latency: 'Live in ledger',
    side: 'right',
  },
];

type TimelineStep = {
  time: string;
  title: string;
  body: string;
};

const TIMELINE: readonly TimelineStep[] = [
  {
    time: '0–5 min',
    title: 'Add your clinic number',
    body: 'Paste it into the onboarding form. We detect your provider automatically.',
  },
  {
    time: '5–10 min',
    title: 'Confirm doctor + specialty mapping',
    body: 'Tell us which number routes to which doctor. Multi-doctor clinics take 2 extra minutes.',
  },
  {
    time: '10–13 min',
    title: 'Review + customise your default template',
    body: 'We ship clinic-vertical defaults. Edit tone, swap CTAs, approve, done.',
  },
  {
    time: '13–15 min',
    title: 'Forward test call, see the WhatsApp land',
    body: 'Call your own number, let it ring out. Watch the WhatsApp arrive in 30 seconds. You are live.',
  },
];

type SecurityPoint = {
  title: string;
  body: string;
};

const SECURITY: readonly SecurityPoint[] = [
  {
    title: 'Encrypted in transit + at rest',
    body: 'TLS 1.3 on every connection. AES-256 for stored call metadata, WhatsApp transcripts, and booking records.',
  },
  {
    title: 'Data stored in Mumbai (ap-south-1)',
    body: 'All patient data lives on AWS ap-south-1 — no cross-border transfers. Compliant with Indian data-residency norms.',
  },
  {
    title: 'ISO 27001 infrastructure',
    body: 'We run on ISO 27001-certified cloud infrastructure with SOC 2 Type II controls at the platform layer.',
  },
  {
    title: 'DPDP Act 2023 compliant',
    body: 'Aligned with India\u2019s Digital Personal Data Protection Act. Patient consent flows + deletion on request within 72 hours.',
  },
  {
    title: 'No third-party data sharing',
    body: 'We do not sell, rent, or share patient data. Period. Your ledger is yours.',
  },
  {
    title: 'Meta Business verified',
    body: 'Every WhatsApp message goes through the official Meta Business API with verified templates — no grey-area messaging.',
  },
];

export default function HowItWorksPage(): JSX.Element {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'How It Works', href: '/how-it-works' },
        ]}
      />

      {/* Page hero */}
      <SectionWrapper id="hiw-hero" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">The engine</span>
          <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-6xl lg:text-[72px]">
            From missed ring to booked slot in{' '}
            <span className="serif-hero">under 3 minutes.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-subtle md:text-lg">
            A real timeline of what happens the second a patient calls
            your clinic and no one picks up. No magic. Just infrastructure
            that does its job.
          </p>
        </div>
      </SectionWrapper>

      {/* Timeline flow */}
      <SectionWrapper id="flow" className="bg-sand/40 pt-12 md:pt-16">
        <div className="mx-auto max-w-4xl">
          <ol className="relative">
            {/* Vertical rail */}
            <div
              aria-hidden="true"
              className="absolute left-4 -top-16 bottom-8 w-px bg-gradient-to-b from-transparent via-primary-300 to-transparent md:-top-20 md:left-1/2"
            />

            {FLOW.map((item) => {
              const isLeft = item.side === 'left';
              return (
                <li
                  key={item.stage}
                  className="relative pb-12 last:pb-0"
                >
                  {/* Dot on center rail */}
                  <div
                    aria-hidden="true"
                    className="absolute left-4 top-1.5 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary-500 bg-surface shadow-subtle md:left-1/2"
                  />

                  {/* Card — anchored left or right of the rail */}
                  <div
                    className={cn(
                      'ml-10 rounded-2xl border border-neutral-200 bg-surface p-5 shadow-subtle md:ml-0 md:w-[calc(50%-2rem)] md:p-6',
                      isLeft
                        ? 'md:mr-auto md:text-right'
                        : 'md:ml-auto md:text-left',
                    )}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-700">
                      <span className="h-1 w-1 rounded-full bg-primary-500" />
                      {item.stage} · {item.latency}
                    </span>
                    <h3 className="mt-3 font-display text-[18px] font-semibold leading-tight tracking-tight text-obsidian md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-subtle md:text-[15px]">
                      {item.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-success-200 bg-success-50 px-4 py-2 text-[12px] font-semibold uppercase tracking-widest text-success-700">
              <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
              Total: under 3 minutes, patient to booking
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Provider compatibility */}
      <SectionWrapper id="providers">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Works with everything</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
            Every Indian phone provider.{' '}
            <span className="serif-hero">No exceptions.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            If you can forward a call, Engageo can recover it. We
            integrate with cloud telephony stacks, legacy landlines, VoIP,
            and staff mobiles — simultaneously.
          </p>
        </div>

        <ProviderWall />
      </SectionWrapper>

      {/* Setup timeline */}
      <SectionWrapper id="setup" className="bg-sand/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-20">
          <div>
            <span className="section-label">Setup</span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
              Go live in{' '}
              <span className="serif-hero">15 minutes.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-subtle md:text-base">
              No hardware shipment. No IT ticket. No consultant visit.
              The entire setup is you, a browser tab, and your clinic
              number.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-subtle md:text-base">
              Multi-doctor clinics take 2–3 extra minutes for routing
              rules. Multi-location chains go live in under an hour.
            </p>
          </div>

          <ol className="space-y-4">
            {TIMELINE.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-5 rounded-2xl border border-neutral-200 bg-surface p-5 md:p-6"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-obsidian font-display text-sm font-semibold text-surface"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-[15px] font-semibold tracking-tight text-obsidian">
                      {step.title}
                    </h3>
                    <span className="rounded-full bg-primary-50 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-700">
                      {step.time}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-subtle">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </SectionWrapper>

      {/* Security & compliance */}
      <SectionWrapper id="security">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Security & compliance</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
            Patient data is{' '}
            <span className="serif-hero">not a side-quest.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            Encryption, data residency, and consent flows built for
            Indian clinics from day one — not bolted on when the first
            enterprise asks.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 md:mt-18 md:grid-cols-2 lg:grid-cols-3">
          {SECURITY.map((point) => (
            <li
              key={point.title}
              className="rounded-2xl border border-neutral-200 bg-surface p-6"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-50 text-success-600"
              >
                <ShieldCheck size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-[15px] font-semibold leading-tight tracking-tight text-obsidian">
                {point.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-subtle">
                {point.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/contact?intent=security"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-obsidian hover:text-primary-600"
          >
            Request our security whitepaper
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
