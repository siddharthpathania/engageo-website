import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { cn } from '@/lib/utils';

type Step = {
  title: string;
  body: string;
  icon: JSX.Element;
};

const STEPS: readonly Step[] = [
  {
    title: 'Forward your unanswered calls',
    body: 'Set your clinic number to forward calls that go unanswered after 15 seconds. Takes under 20 minutes. Your receptionist\u2019s workflow doesn\u2019t change at all.',
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
    title: 'Every missed call gets answered',
    body: 'Whether it\u2019s 11 AM during a packed waiting room or 10 PM on a Sunday, the patient hears a warm, trained voice that knows your clinic inside out. Nothing goes to voicemail.',
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
    title: 'Appointment booked on the spot',
    body: 'The patient\u2019s questions get answered — timings, fees, procedures, directions. If they want to book, a slot is confirmed right there on the call and synced to your Google Calendar in real time.',
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
    title: 'Confirmed, reminded, followed up',
    body: 'WhatsApp confirmation goes out immediately. Reminders at 24 hours and 3 hours before. After the visit, follow-ups adapt — no-show rebooking, treatment aftercare, or a feedback request. All automatic.',
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
          No hardware. No app for your team. Forward your unanswered calls
          to Engageo and every missed patient gets recovered from day one.
        </p>
      </div>

      <div className="relative mt-14 md:mt-20">
        {/* Dotted connecting line — desktop only */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 lg:block"
        >
          <div
            className="h-px w-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, rgb(202 191 176) 0px, rgb(202 191 176) 6px, transparent 6px, transparent 14px)',
            }}
          />
        </div>

        <ol className="relative grid gap-10 md:gap-12 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <ScrollReveal
                as="li"
                key={step.title}
                direction="up"
                distance={30}
                delay={index * 0.15}
                className={cn(
                  'group relative',
                  /* Zigzag: even steps nudge up, odd steps nudge down — desktop only */
                  isEven ? 'lg:-translate-y-6' : 'lg:translate-y-6',
                )}
              >
                {/* Step card */}
                <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                  {/* Number circle */}
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-obsidian bg-surface font-mono text-sm font-bold text-obsidian shadow-card transition-all duration-350 group-hover:border-primary-500 group-hover:bg-primary-50 group-hover:text-primary-600 group-hover:shadow-glow-sm lg:h-20 lg:w-20 lg:text-base"
                    >
                      0{index + 1}
                    </span>
                    {/* Glow ring on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-350 group-hover:opacity-100"
                      style={{ boxShadow: '0 0 24px rgba(61,90,254,0.25)' }}
                    />
                  </div>

                  {/* Icon */}
                  <span
                    aria-hidden="true"
                    className="mt-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-100"
                  >
                    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                      {step.icon}
                    </svg>
                  </span>

                  <h3 className="mt-4 font-display text-base font-semibold leading-tight tracking-tight text-obsidian md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-subtle">
                    {step.body}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </ol>
      </div>
    </SectionWrapper>
  );
}
