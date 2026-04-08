import type { Metadata } from 'next';
import Link from 'next/link';
import { CTASection } from '@/components/home/CTASection';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

const CS_TITLE = 'Case Studies — Missed Call Recovery for Clinics India';
const CS_DESCRIPTION =
  'Real numbers from 47+ Indian clinics running AI missed call recovery. Dental, derm, IVF, and physio practices recovering ₹2–5 lakhs a month with Engageo.';

export const metadata: Metadata = {
  title: { absolute: `${CS_TITLE} | Engageo` },
  description: CS_DESCRIPTION,
  alternates: { canonical: '/case-studies' },
  openGraph: {
    title: `${CS_TITLE} | Engageo`,
    description: CS_DESCRIPTION,
    url: '/case-studies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CS_TITLE} | Engageo`,
    description: CS_DESCRIPTION,
  },
};

type CaseStudy = {
  slug: string;
  clinic: string;
  specialty: string;
  city: string;
  headline: string;
  summary: string;
  metric: {
    value: string;
    label: string;
  };
  stats: readonly {
    value: string;
    label: string;
  }[];
  accent: string;
};

const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: 'sharma-dental-pune',
    clinic: "Dr. Sharma's Dental Clinic",
    specialty: 'Dental & Oral Surgery',
    city: 'Pune, Maharashtra',
    headline: '47% increase in appointment bookings in 60 days',
    summary:
      'A 3-chair dental practice losing 18–22 calls a week to voicemail. After plugging in Engageo, 47% of those missed calls converted to booked consults. Front desk freed up for walk-ins.',
    metric: { value: '+47%', label: 'bookings / month' },
    stats: [
      { value: '₹3.4L', label: 'recovered in month 1' },
      { value: '28s', label: 'avg response time' },
      { value: '89', label: 'missed calls recovered' },
    ],
    accent: 'from-primary-400 to-primary-600',
  },
  {
    slug: 'krishnan-derm-bengaluru',
    clinic: 'Krishnan Dermatology',
    specialty: 'Dermatology & Aesthetics',
    city: 'Bengaluru, Karnataka',
    headline: '₹3.1L recovered in the first 30 days',
    summary:
      'Solo dermatologist running a high-margin laser + cosmetic practice. Was losing ₹2.8L/month to missed calls — mostly after-hours queries from working professionals. Engageo caught them all.',
    metric: { value: '₹3.1L', label: 'recovered · month 1' },
    stats: [
      { value: '23', label: 'patients booked' },
      { value: '94%', label: 'WhatsApp open rate' },
      { value: '11pm', label: 'peak query time' },
    ],
    accent: 'from-accent-400 to-accent-600',
  },
  {
    slug: 'malhotra-dental-mumbai',
    clinic: 'Malhotra Dental & Oral Surgery',
    specialty: 'Dental (Multi-doctor)',
    city: 'Mumbai, Maharashtra',
    headline: '41 appointments booked in October alone',
    summary:
      'Premium 4-chair dental group competing against Apollo Clinic down the road. Implemented multi-doctor routing with Engageo. 41 consults booked in a single month that would have walked to the competitor.',
    metric: { value: '41', label: 'bookings · October' },
    stats: [
      { value: '4', label: 'doctors routed' },
      { value: '22s', label: 'avg WhatsApp send time' },
      { value: '₹4.8L', label: 'estimated LTV recovered' },
    ],
    accent: 'from-premium-400 to-premium-600',
  },
  {
    slug: 'reddy-ivf-hyderabad',
    clinic: 'Reddy IVF & Fertility Centre',
    specialty: 'IVF & Reproductive Health',
    city: 'Hyderabad, Telangana',
    headline: '18 IVF consults booked in 45 days',
    summary:
      'High-ticket IVF practice where each consult is worth ₹15,000+ in immediate revenue and ₹2L+ in LTV. WhatsApp templates run in Hindi + English — receptionist now focuses on in-clinic couples instead of chasing voicemails.',
    metric: { value: '18', label: 'IVF consults booked' },
    stats: [
      { value: '₹2.7L', label: 'consult revenue' },
      { value: '2', label: 'languages live' },
      { value: '8', label: 'recoveries / week avg' },
    ],
    accent: 'from-success-400 to-success-600',
  },
];

export default function CaseStudiesPage(): JSX.Element {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Case Studies', href: '/case-studies' },
        ]}
      />

      {/* Page hero */}
      <SectionWrapper id="cs-hero" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Case studies</span>
          <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-6xl lg:text-[72px]">
            Real clinics.{' '}
            <span className="serif-hero">Real recovery.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-subtle md:text-lg">
            Numbers from the last 90 days across four specialties,
            five Indian cities. No cherry-picking — these are the
            clinics whose founders let us write about them.
          </p>
        </div>
      </SectionWrapper>

      {/* Case study grid */}
      <SectionWrapper id="cs-grid" className="pt-0 md:pt-0">
        <ul className="grid gap-6 md:grid-cols-2">
          {CASE_STUDIES.map((study) => (
            <li key={study.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-surface transition-all duration-350 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover">
                {/* Header strip */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${study.accent}`} />

                <div className="flex flex-1 flex-col p-7 md:p-8">
                  {/* Big metric */}
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="font-display text-4xl font-semibold tracking-tight text-obsidian md:text-5xl">
                        {study.metric.value}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                        {study.metric.label}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-success-200 bg-success-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-success-700">
                      <span className="h-1 w-1 rounded-full bg-success-500" />
                      Verified
                    </span>
                  </div>

                  {/* Clinic info */}
                  <div className="mt-6 border-t border-neutral-200 pt-5">
                    <h2 className="font-display text-[18px] font-semibold leading-tight tracking-tight text-obsidian md:text-xl">
                      {study.clinic}
                    </h2>
                    <p className="mt-1 text-[12px] uppercase tracking-widest text-subtle">
                      {study.specialty} · {study.city}
                    </p>
                  </div>

                  {/* Headline + summary */}
                  <p className="mt-5 font-display text-[16px] font-semibold leading-snug tracking-tight text-obsidian md:text-[17px]">
                    {study.headline}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-subtle md:text-[14.5px]">
                    {study.summary}
                  </p>

                  {/* Stats */}
                  <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-neutral-200 pt-5">
                    {study.stats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="text-[10px] font-semibold uppercase tracking-widest text-subtle">
                          {stat.label}
                        </dt>
                        <dd className="mt-1 font-display text-[15px] font-semibold text-obsidian">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Read more (placeholder) */}
                  <div className="mt-6 flex items-center justify-between pt-4">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle">
                      Case study #{CASE_STUDIES.indexOf(study) + 1}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-obsidian transition-colors group-hover:text-primary-600">
                      Full story coming soon
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                      >
                        <path
                          d="M4 2l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* Aggregate numbers strip */}
      <SectionWrapper id="aggregate" className="bg-sand/40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">The portfolio view</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
            47 clinics. 90 days. One number.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            Aggregate recovery across every Engageo clinic in Q1 2026.
          </p>
        </div>

        <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 md:mt-18 md:grid-cols-4 md:gap-5">
          {[
            { value: '₹1.4Cr', label: 'Total recovery', hint: 'Q1 2026' },
            { value: '2,847', label: 'Patients booked', hint: 'via missed-call recovery' },
            { value: '29s', label: 'Avg response', hint: 'call → WhatsApp' },
            { value: '94%', label: 'Open rate', hint: 'under 2 min' },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-neutral-200 bg-surface p-6 text-center md:text-left"
            >
              <p className="font-display text-3xl font-semibold tracking-tight text-obsidian md:text-4xl">
                {metric.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                {metric.label}
              </p>
              <p className="mt-1 text-[11px] text-subtle">{metric.hint}</p>
            </div>
          ))}
        </dl>

        <div className="mt-12 text-center">
          <Link
            href="/contact?intent=case-study"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-obsidian hover:text-primary-600"
          >
            Want us to write about your clinic? Get in touch
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
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
