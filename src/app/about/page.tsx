import { ArrowUpRight, Globe, type LucideIcon, PhoneCall, Receipt, Star } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CTASection } from '@/components/home/CTASection';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { COMPANY } from '@/lib/constants';
import { FOUNDERS } from '@/lib/founders';

const ABOUT_TITLE = 'About Engageo — Built for Indian Clinics';
const ABOUT_DESCRIPTION =
  'Engageo was built in Pune by operators who watched Indian clinics lose crores to missed calls. Our mission: every patient call gets a reply in 8 seconds.';

export const metadata: Metadata = {
  title: { absolute: `${ABOUT_TITLE} | Engageo` },
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `${ABOUT_TITLE} | Engageo`,
    description: ABOUT_DESCRIPTION,
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${ABOUT_TITLE} | Engageo`,
    description: ABOUT_DESCRIPTION,
  },
};

type Value = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

const VALUES: readonly Value[] = [
  {
    title: 'No patient walks away unheard',
    body: 'This is the only metric that matters. Everything we build starts and ends with the unanswered call on a Sunday night.',
    Icon: PhoneCall,
  },
  {
    title: 'Built in India, for Indian clinics',
    body: 'Twelve Indian languages from day one. Indian telecom quirks understood. Indian price points respected. This is not a Bay Area SaaS tool with a localisation pass.',
    Icon: Globe,
  },
  {
    title: 'Receipts, not rhetoric',
    body: 'Every claim we make is backed by a live ledger in your dashboard. If we do not recover 15 bookings in your first 30 days, you do not pay.',
    Icon: Receipt,
  },
  {
    title: 'Ship on Friday',
    body: 'Clinics do not care about our sprint ceremonies. They care about whether the WhatsApp goes out when the 9 PM toothache call comes in. We ship weekly.',
    Icon: Star,
  },
];

type Trust = {
  value: string;
  label: string;
  hint: string;
};

const TRUST: readonly Trust[] = [
  { value: '99.97%', label: 'Uptime', hint: 'last 12 months' },
  { value: 'ap-south-1', label: 'Data residency', hint: 'Mumbai, AWS' },
  { value: 'ISO 27001', label: 'Certified infra', hint: 'SOC 2 Type II controls' },
  { value: 'DPDP 2023', label: 'Compliant', hint: 'aligned from day one' },
];

export default function AboutPage(): JSX.Element {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
        ]}
      />

      {/* Page hero */}
      <SectionWrapper id="about-hero" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">About</span>
          <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-6xl lg:text-[72px]">
            Built for the{' '}
            <span className="serif-hero">9 PM toothache call.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-subtle md:text-lg">
            Engageo started in Pune in {COMPANY.foundingYear}, after
            we watched {COMPANY.liveClinics}+ clinics leak lakhs every
            month through the same hole: the unanswered phone.
          </p>
        </div>
      </SectionWrapper>

      {/* Story */}
      <SectionWrapper id="story" className="pt-0 md:pt-0">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6 text-[16px] leading-relaxed text-obsidian/85 md:text-[17px] md:leading-[1.7]">
            <p>
              <span className="font-display text-[22px] font-semibold tracking-tight text-obsidian md:text-2xl">
                The problem was boring. The impact was not.
              </span>
            </p>
            <p>
              In 2023, we shadowed the front desks of 14 Indian clinics —
              dental, dermatology, IVF, physio. We counted missed calls
              for two weeks. The average clinic lost between ₹2 lakh and
              ₹4 lakh every month to calls that rang out.
            </p>
            <p>
              Meanwhile the clinic owner was convinced the problem was
              <em> marketing spend</em>. They were pouring money into
              Google Ads and Practo, generating more inbound — and
              leaking more of it.
            </p>
            <p>
              <span className="serif-hero text-[22px] text-primary-600 md:text-2xl">
                The fix was almost insultingly simple.
              </span>{' '}
              Catch the missed call in 3 seconds. Send a WhatsApp in 30.
              Let the patient self-book from there. The tech existed. It
              just hadn&rsquo;t been packaged for Indian clinics — at
              Indian price points, in Indian languages, working with
              Indian telecom.
            </p>
            <p>
              So we built it.{' '}
              {COMPANY.liveClinics}+ clinics later, the only metric that
              matters is the one we measured on day one: no patient who
              calls a doctor should walk away unheard.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper id="values" className="bg-sand/40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">What we believe</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
            Four things we refuse to compromise on.
          </h2>
        </div>

        <ul className="mt-14 grid gap-5 md:mt-18 md:grid-cols-2 lg:gap-6">
          {VALUES.map((value) => (
            <li
              key={value.title}
              className="rounded-2xl border border-neutral-200 bg-surface p-7 md:p-8"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
              >
                <value.Icon size={22} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-[18px] font-semibold leading-tight tracking-tight text-obsidian md:text-xl">
                {value.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-subtle md:text-[15px]">
                {value.body}
              </p>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* Team */}
      <SectionWrapper id="team">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">The team</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
            Operators, not{' '}
            <span className="serif-hero">consultants.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            Two founders. One from product, one from ML. Both have lived
            the problem they built Engageo to solve.
          </p>
        </div>

        <ul className="mx-auto mt-14 grid max-w-2xl gap-5 md:mt-18 md:grid-cols-2 lg:gap-6">
          {FOUNDERS.map((member) => (
            <li
              key={member.slug}
              className="group rounded-2xl border border-neutral-200 bg-surface p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover md:p-7"
            >
              <div className="relative">
                <div className="h-20 w-20 overflow-hidden rounded-2xl border-2 border-neutral-100 shadow-subtle">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo}
                    alt={member.photoAlt}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <h3 className="mt-5 font-display text-lg font-semibold leading-tight tracking-tight text-obsidian">
                <Link
                  href={`/about/${member.slug}`}
                  className="transition-colors hover:text-primary-600"
                >
                  {member.name}
                </Link>
              </h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-subtle">
                {member.bio}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Link
                  href={`/about/${member.slug}`}
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-primary-600 transition-colors hover:text-primary-700"
                >
                  Full profile
                  <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
                </Link>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn (opens in new tab)`}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-obsidian/60 transition-colors hover:text-primary-600"
                >
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* Built for India */}
      <SectionWrapper id="india" className="bg-sand/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <span className="section-label">Built for India</span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
              The first receptionist{' '}
              <span className="serif-hero">that speaks your language.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-subtle md:text-base">
              Most SaaS tools sold to Indian clinics are Silicon Valley
              products with a flag sticker. Templates in American
              English. Price points in USD. Phone integrations that
              assume Twilio.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-subtle md:text-base">
              Engageo is the opposite. Hindi and Marathi templates ship
              before English. Pricing is in rupees because it&rsquo;s
              built around what an Indian clinic actually earns.
              Telephony integrations start with Exotel, Knowlarity, and
              an MTNL landline — because that&rsquo;s what the market
              runs on.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-subtle md:text-base">
              Every patient interaction flows through a Mumbai data
              centre. No cross-border transfers. Full DPDP 2023
              compliance from day one.
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-primary-100/60 via-transparent to-accent-100/40 blur-3xl"
            />
            <div className="relative rounded-3xl border border-neutral-200 bg-surface p-8 shadow-card md:p-10">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                Trust signals
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4">
                {TRUST.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-neutral-200 bg-neutral-50/40 p-4"
                  >
                    <dt className="text-[11px] font-semibold uppercase tracking-widest text-subtle">
                      {item.label}
                    </dt>
                    <dd className="mt-2 font-display text-[20px] font-semibold tracking-tight text-obsidian md:text-[22px]">
                      {item.value}
                    </dd>
                    <p className="mt-1 text-[11px] text-subtle">{item.hint}</p>
                  </div>
                ))}
              </dl>

              {/* Tricolor stripe */}
              <div className="mt-8 flex items-center gap-3 border-t border-neutral-200 pt-6">
                <div className="flex h-3 w-16 overflow-hidden rounded-sm">
                  <div className="flex-1 bg-[#FF9933]" />
                  <div className="flex-1 bg-white border-y border-neutral-200" />
                  <div className="flex-1 bg-[#138808]" />
                </div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-obsidian/70">
                  Made in Pune · Built for Indian clinics
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
