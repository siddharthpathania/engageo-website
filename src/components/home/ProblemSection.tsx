import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { StaggerContainer } from '@/components/shared/StaggerContainer';

type PainPoint = {
  title: string;
  body: string;
  icon: JSX.Element;
};

const PAIN_POINTS: readonly PainPoint[] = [
  {
    title: 'Calls ring out during consults',
    body: "You're with a patient, the phone rings, nobody picks up. The caller doesn't leave a voicemail — they just dial the next clinic.",
    icon: (
      <path
        d="M6 4l3 2-1.5 3 3 3 3-1.5 2 3-1.5 2a3 3 0 01-3 .8C8.4 16 4 11.6 3.2 7.5A3 3 0 014 4.5L6 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'After-hours calls vanish',
    body: 'Someone calls at 9:42 PM with a toothache. You see it at 9 AM. They booked at Apollo by 9:15 PM the night before.',
    icon: (
      <>
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 6v4l2.5 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: 'Front desk overwhelmed at peak',
    body: 'Between 10 AM and 2 PM, three calls land at once. The receptionist picks one up. Two go to voicemail — and then the void.',
    icon: (
      <path
        d="M3 14v-2a2 2 0 012-2h10a2 2 0 012 2v2M7 6a3 3 0 116 0 3 3 0 01-6 0z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Patients scroll to the next clinic',
    body: "If they can't reach you in 60 seconds, they're on a competitor's Google listing. Hair transplant patients comparison-shop in real time.",
    icon: (
      <path
        d="M4 10h12m0 0l-4-4m4 4l-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export function ProblemSection(): JSX.Element {
  return (
    <SectionWrapper id="problem" ariaLabel="The missed call problem" dark>
      {/* Top stripe bar */}
      <div className="stripe-bar absolute inset-x-0 top-0">
        <span />
        <span />
        <span />
      </div>

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-300">
            The Leak
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-surface md:text-5xl lg:text-[56px]">
            Your clinic is losing{' '}
            <span className="serif-hero-neutral text-primary-400">
              ₹2–4 Lakhs
            </span>{' '}
            every month. Here&rsquo;s where.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-400 md:text-base">
            Most clinic owners see the revenue number. Almost none see the
            four places it bleeds out. These are the calls nobody&rsquo;s
            tracking — and the patients nobody&rsquo;s recovering.
          </p>
        </div>

        <StaggerContainer as="ul" staggerDelay={0.09} amount={0.15} className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {PAIN_POINTS.map((point) => (
            <ScrollReveal
              as="li"
              key={point.title}
              direction="up"
              distance={20}
              className="group relative rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition-all duration-350 hover:border-primary-500/30 hover:bg-neutral-900/70 md:p-7"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-800/60 text-primary-400 transition-colors group-hover:border-primary-500/40 group-hover:text-primary-300"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    {point.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-surface md:text-xl">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {point.body}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
}
