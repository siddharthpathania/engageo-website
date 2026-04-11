'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

type FlowStep = {
  label: string;
  sub: string;
  icon: JSX.Element;
  accent: 'neutral' | 'danger' | 'brand' | 'success';
};

const FLOW_STEPS: readonly FlowStep[] = [
  {
    label: 'Patient calls',
    sub: '+91 98••• rings',
    accent: 'neutral',
    icon: (
      <path
        d="M7 4l3 2-1.5 3 3 3 3-1.5 2 3-1.5 2a3 3 0 01-3 .8C9.4 16 5 11.6 4.2 7.5A3 3 0 015 4.5L7 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'Missed',
    sub: 'Nobody picks up',
    accent: 'danger',
    icon: (
      <>
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M7 7l6 6M13 7l-6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    label: 'AI detects',
    sub: 'Intercepted in 3s',
    accent: 'brand',
    icon: (
      <path
        d="M10 2a6 6 0 00-6 6c0 2.5 1.5 4 2 5v2a1 1 0 001 1h6a1 1 0 001-1v-2c.5-1 2-2.5 2-5a6 6 0 00-6-6zM8 17h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'WhatsApp sent',
    sub: 'Personalised · <30s',
    accent: 'success',
    icon: (
      <path
        d="M4 16l1-3a7 7 0 1110 0 7 7 0 01-10 0zm3-6h6m-6 3h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'Patient books',
    sub: 'Slot in your calendar',
    accent: 'brand',
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

const ACCENT_STYLES: Record<FlowStep['accent'], { wrap: string; icon: string }> = {
  neutral: {
    wrap: 'border-neutral-200 bg-surface text-obsidian',
    icon: 'bg-neutral-100 text-obsidian/70',
  },
  danger: {
    wrap: 'border-error-200 bg-error-50 text-error-700',
    icon: 'bg-error-100 text-error-600',
  },
  brand: {
    wrap: 'border-primary-200 bg-primary-50 text-primary-700',
    icon: 'bg-primary-100 text-primary-600',
  },
  success: {
    wrap: 'border-success-200 bg-success-50 text-success-700',
    icon: 'bg-success-100 text-success-600',
  },
};

export function SolutionSection(): JSX.Element {
  return (
    <SectionWrapper id="solution" ariaLabel="How Engageo solves missed calls">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        {/* Left: copy */}
        <ScrollReveal direction="left" distance={30}>
          <span className="section-label">The Aha Moment</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
            Engageo catches every call{' '}
            <span className="serif-hero">you can&rsquo;t.</span>
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-subtle md:text-base">
            An AI layer sits on top of your existing phone number. The second
            a call goes unanswered, it triggers a personalised WhatsApp
            message back to the patient — with your clinic name, the doctor
            they were trying to reach, and a one-tap booking link. Sent in
            under 30 seconds, read in under 2 minutes.
          </p>

          <ul className="mt-8 space-y-3.5">
            {[
              'No new hardware. Works with any phone system — landline, VoIP, mobile.',
              'Every interaction logged to your dashboard — you see who called, who booked, who ghosted.',
              'You stay in the consultation room. Patients get answered. That is the whole product.',
            ].map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 text-sm leading-relaxed text-obsidian/85"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-600"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path
                      d="M1.5 5l2.5 2.5L8.5 2"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {/* Right: flow diagram */}
        <ScrollReveal direction="right" distance={30} delay={0.15} className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-primary-100/50 via-transparent to-accent-100/30 blur-3xl"
          />

          <div className="relative rounded-3xl border border-neutral-200 bg-surface/80 p-6 shadow-card backdrop-blur-sm md:p-8">
            <ol className="relative flex flex-col gap-0">
              {FLOW_STEPS.map((step, index) => {
                const styles = ACCENT_STYLES[step.accent];
                const isLast = index === FLOW_STEPS.length - 1;

                return (
                  <motion.li
                    key={step.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.12,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Node circle */}
                      <div className="relative flex flex-col items-center">
                        <span
                          className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${styles.wrap} shadow-subtle transition-transform duration-300 hover:scale-110`}
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            {step.icon}
                          </svg>
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 py-3">
                        <div className="flex items-center gap-3">
                          <p className="font-display text-[15px] font-semibold leading-tight tracking-tight text-obsidian">
                            {step.label}
                          </p>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-subtle">
                            0{index + 1}
                          </span>
                        </div>
                        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-subtle/75">
                          {step.sub}
                        </p>
                      </div>
                    </div>

                    {/* Connecting line */}
                    {!isLast ? (
                      <motion.div
                        aria-hidden="true"
                        className="ml-[23px] h-5 w-0.5 rounded-full bg-neutral-200"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.12 + 0.2 }}
                        style={{ transformOrigin: 'top' }}
                      />
                    ) : null}
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
