import type { Metadata } from 'next';
import { CTASection } from '@/components/home/CTASection';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { COMPANY } from '@/lib/constants';

const ABOUT_TITLE = 'About Engageo — Built for Indian Clinics';
const ABOUT_DESCRIPTION =
  'Engageo was built in Bengaluru by operators who watched Indian clinics lose crores to missed calls. Our mission: every patient call gets a reply in 8 seconds.';

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

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  accent: string;
};

const TEAM: readonly TeamMember[] = [
  {
    name: 'Arjun Mehta',
    role: 'Co-founder & CEO',
    bio: 'Built growth ops for 3 Indian healthcare startups. Watched 60% of clinic inbound leak through voicemail. Decided to fix it.',
    initials: 'AM',
    accent: 'from-primary-400 to-primary-600',
  },
  {
    name: 'Kavya Iyer',
    role: 'Co-founder & CTO',
    bio: 'Previously staff engineer at a voice AI company. Speaks fluent webhook, telephony, and Meta WABA.',
    initials: 'KI',
    accent: 'from-accent-400 to-accent-600',
  },
  {
    name: 'Rohit Khanna',
    role: 'Head of Clinics',
    bio: 'Ran operations at a 12-clinic dental chain. Knows exactly where the front desk breaks down at 6:47 PM on a Tuesday.',
    initials: 'RK',
    accent: 'from-premium-400 to-premium-600',
  },
  {
    name: 'Meera Bhat',
    role: 'Head of Patient Experience',
    bio: 'Built conversational flows at a unicorn fintech. Now tunes message tone so it sounds like a clinic, not a bot.',
    initials: 'MB',
    accent: 'from-success-400 to-success-600',
  },
];

type Value = {
  title: string;
  body: string;
  icon: JSX.Element;
};

const VALUES: readonly Value[] = [
  {
    title: 'No patient walks away unheard',
    body: 'This is the only metric that matters. Everything we build starts and ends with the unanswered call on a Sunday night.',
    icon: (
      <path
        d="M4 16l1-3a7 7 0 1110 0 7 7 0 01-10 0z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Built in India, for Indian clinics',
    body: 'Hindi, Marathi, Tamil on day one. Indian telecom quirks understood. Indian price points respected. This is not a Bay Area SaaS tool with a localisation pass.',
    icon: (
      <>
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3 10h14M10 3c2 2 3 4 3 7s-1 5-3 7c-2-2-3-4-3-7s1-5 3-7z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: 'Receipts, not rhetoric',
    body: 'Every claim we make is backed by a live ledger in your dashboard. If we do not recover 15 bookings in your first 30 days, you do not pay.',
    icon: (
      <path
        d="M5 3h7l3 3v11a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1zm2 7h6m-6 3h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Ship on Friday',
    body: 'Clinics do not care about our sprint ceremonies. They care about whether the WhatsApp goes out when the 9 PM toothache call comes in. We ship weekly.',
    icon: (
      <path
        d="M10 2l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8L10 2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
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
            Engageo started in Bengaluru in {COMPANY.foundingYear}, after
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
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  {value.icon}
                </svg>
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
            Every person on the founding team has lived the pain they
            are now building against.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 md:mt-18 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {TEAM.map((member) => (
            <li
              key={member.name}
              className="rounded-2xl border border-neutral-200 bg-surface p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover"
            >
              <span
                aria-hidden="true"
                className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${member.accent} font-display text-lg font-semibold text-surface shadow-subtle`}
              >
                {member.initials}
              </span>
              <h3 className="mt-5 font-display text-[16px] font-semibold leading-tight tracking-tight text-obsidian md:text-[17px]">
                {member.name}
              </h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                {member.role}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-subtle">
                {member.bio}
              </p>
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
                  Made in Bengaluru · HQ in Koramangala
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
