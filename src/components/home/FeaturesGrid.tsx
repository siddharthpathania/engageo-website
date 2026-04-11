import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { StaggerContainer } from '@/components/shared/StaggerContainer';
import { cn } from '@/lib/utils';

type Feature = {
  title: string;
  body: string;
  icon: JSX.Element;
};

const FEATURES: readonly Feature[] = [
  {
    title: 'WhatsApp Integration',
    body: 'Official Meta Business API. Template-verified. 94% open rate within 2 minutes — the only channel patients actually read.',
    icon: (
      <path
        d="M4 16l1-3a7 7 0 1110 0 7 7 0 01-10 0zm4-6h4m-4 3h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Multi-language Support',
    body: 'Hindi, Marathi, Tamil, Kannada, Telugu, Bengali, English. Messages match the patient, not the clinic owner.',
    icon: (
      <path
        d="M3 5h9M7 3v2c0 4-2 6-4 7m4-4c0 3 2 5 5 5m3 2l3-7 3 7m-5-2h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Smart Scheduling Links',
    body: 'One-tap booking. Syncs with Google Calendar, iCal, Practo, or your HMS. No back-and-forth DMs.',
    icon: (
      <>
        <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3 8h14M7 2v4m6-4v4M10 11v3m-1.5-1.5h3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: 'Real-time Dashboard',
    body: 'Every call, every recovery, every booking — in one ledger. See exactly what Engageo saved you this week.',
    icon: (
      <path
        d="M3 17V7m4 10v-6m4 6V5m4 12v-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Custom Message Templates',
    body: "Your clinic's voice, not ours. Edit tone, add doctor names, swap CTAs — we ship with defaults, you tune from there.",
    icon: (
      <path
        d="M4 4h12a1 1 0 011 1v9a1 1 0 01-1 1H8l-4 3V5a1 1 0 011-1zm3 4h6m-6 3h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'After-hours Auto-response',
    body: 'The 9 PM toothache call gets answered. The 2 AM laser-pigmentation query gets answered. You do not.',
    icon: (
      <path
        d="M15 11A7 7 0 018 4a1 1 0 00-1.2 1.2A7 7 0 0015 13a1 1 0 001.2-1.2A6.9 6.9 0 0115 11z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Analytics & Reports',
    body: 'Weekly email: calls missed, calls recovered, revenue locked. Monthly: trends, conversion by doctor, hour-of-day heatmap.',
    icon: (
      <>
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 4v6l4 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: 'Works with Any Phone',
    body: 'Landline, VoIP, Exotel, Knowlarity, MTNL, a mobile — doesn&rsquo;t matter. We sit on top of what you already have.',
    icon: (
      <path
        d="M4 4h4l1 4-2 1a8 8 0 004 4l1-2 4 1v4a1 1 0 01-1 1A13 13 0 013 5a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export function FeaturesGrid(): JSX.Element {
  return (
    <SectionWrapper id="features" ariaLabel="Product capabilities">
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-label justify-center">Capabilities</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
          Built for Indian clinics,{' '}
          <span className="serif-hero">end to end.</span>
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
          Eight pieces doing one job: never let a patient hang up and not
          hear back.
        </p>
      </div>

      <StaggerContainer
        as="ul"
        staggerDelay={0.07}
        amount={0.1}
        className="mt-14 grid gap-4 md:mt-18 md:grid-cols-2 md:gap-5 lg:grid-cols-6"
      >
        {FEATURES.map((feature, index) => {
          /* First 2 features are "hero" cards — span 3 cols each on lg */
          const isHero = index < 2;

          return (
            <ScrollReveal
              as="li"
              key={feature.title}
              direction="up"
              distance={20}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-350 will-change-transform hover:-translate-y-1 hover:shadow-card-hover',
                isHero
                  ? 'border-primary-100 bg-gradient-to-br from-primary-50/80 to-surface p-8 hover:border-primary-300 md:p-10 lg:col-span-3'
                  : 'border-neutral-200 bg-surface p-6 hover:border-primary-300 lg:col-span-2',
              )}
            >
              {/* Ghost numeral — visible on hero cards only */}
              {isHero ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -top-6 select-none font-serif text-[140px] font-normal italic leading-none text-primary-500/[0.06]"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              ) : null}

              <span
                aria-hidden="true"
                className={cn(
                  'flex items-center justify-center rounded-xl text-primary-600 transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-primary-700',
                  isHero
                    ? 'h-14 w-14 bg-primary-100/80 group-hover:bg-primary-200/80'
                    : 'h-11 w-11 bg-primary-50 group-hover:bg-primary-100',
                )}
              >
                <svg
                  width={isHero ? '28' : '22'}
                  height={isHero ? '28' : '22'}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  {feature.icon}
                </svg>
              </span>

              <h3
                className={cn(
                  'font-display font-semibold leading-tight tracking-tight text-obsidian',
                  isHero ? 'mt-6 text-xl md:text-[22px]' : 'mt-5 text-base',
                )}
              >
                {feature.title}
              </h3>
              <p
                className={cn(
                  'leading-relaxed text-subtle',
                  isHero ? 'mt-3 text-sm md:text-base' : 'mt-2 text-sm',
                )}
              >
                {feature.body}
              </p>
            </ScrollReveal>
          );
        })}
      </StaggerContainer>
    </SectionWrapper>
  );
}
