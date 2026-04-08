import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { StaggerContainer } from '@/components/shared/StaggerContainer';

type Step = {
  title: string;
  body: string;
  icon: JSX.Element;
};

const STEPS: readonly Step[] = [
  {
    title: 'Connect your clinic number',
    body: 'Port your existing line or point it at Engageo. Takes under 20 minutes — no hardware, no new app for your team to learn.',
    icon: (
      <path
        d="M6 4h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm2 4h4m-4 3h4m-4 3h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'AI monitors calls 24/7',
    body: 'Every missed call — consult hours, lunch break, 11 PM — gets intercepted in 3 seconds. Nothing falls through.',
    icon: (
      <>
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 10L13 7M10 6v4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: 'Recovery message fires',
    body: 'Personalised WhatsApp goes out in under 30 seconds — clinic name, doctor, one-tap booking link. Supports Hindi, Marathi, Tamil, English.',
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
    title: 'Patient books — you see it',
    body: 'Confirmed slots land in your calendar, reminders go out automatically. Open the dashboard to see every recovery, every week.',
    icon: (
      <>
        <rect
          x="3"
          y="4"
          width="14"
          height="13"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M3 8h14M7 2v4m6-4v4M7 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];

export function HowItWorks(): JSX.Element {
  return (
    <SectionWrapper id="how-it-works" ariaLabel="How Engageo works in four steps" className="bg-sand/40">
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-label justify-center">The Protocol</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
          Four steps. Live by Friday.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
          No lengthy onboarding. No change management. The recovery engine
          starts working the moment your number points at us.
        </p>
      </div>

      <StaggerContainer
        as="ol"
        staggerDelay={0.12}
        amount={0.1}
        className="relative mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-6"
      >
        {/* Connecting line (desktop only) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[46px] hidden h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent lg:block"
        />

        {STEPS.map((step, index) => (
          <ScrollReveal
            as="li"
            key={step.title}
            direction="up"
            distance={24}
            className="group relative"
          >
            <div className="flex flex-col">
              {/* Numbered circle */}
              <div className="relative flex items-center gap-3 lg:block">
                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-[92px] w-[92px] items-center justify-center rounded-full border-2 border-obsidian bg-surface font-display text-3xl font-semibold text-obsidian shadow-card transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                >
                  <span className="absolute left-4 top-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center text-primary-500 transition-transform duration-300 ease-out group-hover:scale-110"
                  >
                    <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
                      {step.icon}
                    </svg>
                  </span>
                </span>
              </div>

              <div className="mt-5">
                <h3 className="font-display text-[17px] font-semibold leading-tight tracking-tight text-obsidian md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-subtle">
                  {step.body}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
