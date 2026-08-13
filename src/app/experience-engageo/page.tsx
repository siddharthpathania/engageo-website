import { Clock, Globe2, PhoneCall, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { ExperienceForm } from '@/components/experience/ExperienceForm';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

const TITLE = 'Experience Engageo — Hear the AI Receptionist Live';
const DESCRIPTION =
  'Try Engageo as a patient would. Verify your phone with a one-time code and our AI receptionist calls you back so you can hear the missed-call recovery experience for yourself.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/experience-engageo' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/experience-engageo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const STEPS: ReadonlyArray<{ title: string; body: string; Icon: typeof PhoneCall }> = [
  {
    title: 'Enter your details',
    body: 'Name, clinic or hospital, phone, email, and where you are based.',
    Icon: ShieldCheck,
  },
  {
    title: 'Verify with a one-time code',
    body: 'We text a 6-digit code to your phone so we know it is really you.',
    Icon: Clock,
  },
  {
    title: 'Pick up the AI demo call',
    body: 'Within 30 seconds, our AI receptionist calls you. Talk to it like a patient would.',
    Icon: PhoneCall,
  },
];

const ASSURANCES: ReadonlyArray<{ label: string; body: string; Icon: typeof PhoneCall }> = [
  {
    label: 'Under 30 seconds',
    body: 'From verification to a ringing phone — no waiting room, no email follow-up.',
    Icon: Clock,
  },
  {
    label: '12 languages',
    body: 'Speak in whichever Indian language you’re most comfortable in. We cover 12, plus Indian English.',
    Icon: Globe2,
  },
  {
    label: 'Your data stays in India',
    body: 'Hosted on AWS Mumbai. DPDP-aligned. Nothing leaves the country.',
    Icon: ShieldCheck,
  },
];

export default function ExperienceEngageoPage(): JSX.Element {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Experience Engageo', href: '/experience-engageo' },
        ]}
      />

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <SectionWrapper id="experience-hero" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Live demo</span>
          <h1 className="mt-6 font-display text-[36px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-[52px] lg:text-[60px]">
            Talk to our AI <span className="serif-hero">like a patient would.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-subtle md:text-[17px]">
            Enter your details, verify your phone with a one-time code, and Engageo&rsquo;s
            AI receptionist calls you back in under 30 seconds. Ask about implant pricing,
            IVF consultations, or anything your clinic hears on a busy Monday morning.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
          {ASSURANCES.map((item) => (
            <li
              key={item.label}
              className="rounded-2xl border border-neutral-200 bg-surface p-4 md:p-5"
            >
              <span
                aria-hidden="true"
                className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
              >
                <item.Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-600">
                {item.label}
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-subtle">{item.body}</p>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* ─── Form ─────────────────────────────────────────────── */}
      <SectionWrapper id="experience-form" className="bg-sand/40 pt-12 md:pt-16">
        <ExperienceForm />
      </SectionWrapper>

      {/* ─── How it works ────────────────────────────────────── */}
      <SectionWrapper id="experience-how">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">What happens next</span>
          <h2 className="mt-6 font-display text-[28px] font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-[36px] lg:text-[40px]">
            From form to ringing phone in under a minute.
          </h2>
        </div>

        <ol className="mx-auto mt-12 grid max-w-5xl gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col gap-3 rounded-3xl border border-neutral-200 bg-surface p-6 md:p-7"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
                >
                  <step.Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle">
                  Step {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display text-[17px] font-semibold leading-tight tracking-tight text-obsidian md:text-[19px]">
                {step.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-subtle md:text-[14.5px]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </SectionWrapper>
    </>
  );
}
