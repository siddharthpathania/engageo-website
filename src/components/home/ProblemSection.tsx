'use client';

import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  type LucideIcon,
  Moon,
  PhoneOff,
  Users,
} from 'lucide-react';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { cn } from '@/lib/utils';

type PainPoint = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

const PAIN_POINTS: readonly PainPoint[] = [
  {
    title: 'Calls ring out during consults',
    body: "You're with a patient, the phone rings, nobody picks up. The caller doesn't leave a voicemail — they just dial the next clinic.",
    Icon: PhoneOff,
  },
  {
    title: 'After-hours calls vanish',
    body: 'Someone calls at 9:42 PM with a toothache. You see it at 9 AM. They booked at Apollo by 9:15 PM the night before.',
    Icon: Moon,
  },
  {
    title: 'Front desk overwhelmed at peak',
    body: 'Between 10 AM and 2 PM, three calls land at once. The receptionist picks one up. Two go to voicemail — and then the void.',
    Icon: Users,
  },
  {
    title: 'Patients scroll to the next clinic',
    body: "If they can't reach you in 60 seconds, they're on a competitor's Google listing. Hair transplant patients comparison-shop in real time.",
    Icon: ArrowRight,
  },
];

/* Scroll-driven reveal — each element occupies a slice of the header's
   scroll-progress window, so the more the user scrolls down, the more
   of the composition appears. The full reveal completes by the time
   the header's center reaches the viewport center. */

export function ProblemSection(): JSX.Element {
  return (
    <MotionConfig reducedMotion="never">
      <ProblemSectionInner />
    </MotionConfig>
  );
}

function ProblemSectionInner(): JSX.Element {
  return (
    <SectionWrapper id="problem" ariaLabel="The missed call problem" dark>
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
        <ScrollDrivenHeader />

        {/* Timeline */}
        <div className="relative mt-12 md:mt-16">
          {/* Center line — desktop only */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-neutral-700 via-neutral-700 to-transparent md:block"
          />

          <div className="flex flex-col gap-8 md:gap-12">
            {PAIN_POINTS.map((point, index) => {
              const isLeft = index % 2 === 0;
              const Icon = point.Icon;
              return (
                <ScrollReveal
                  key={point.title}
                  direction={isLeft ? 'left' : 'right'}
                  distance={30}
                  delay={index * 0.1}
                  className="relative"
                >
                  {/* Timeline dot — desktop only */}
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-6 hidden -translate-x-1/2 md:block"
                  >
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error-500 opacity-40" />
                      <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-neutral-800 bg-error-500" />
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      'group relative w-full rounded-2xl border border-neutral-800/60 bg-neutral-900/30 p-6 backdrop-blur-sm transition-all duration-350 hover:border-primary-500/30 hover:bg-neutral-900/50 md:w-[calc(50%-2rem)] md:p-7',
                      isLeft ? 'md:mr-auto' : 'md:ml-auto',
                    )}
                  >
                    {/* Step number */}
                    <span className="absolute -top-3 left-6 inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-error-400">
                      0{index + 1}
                    </span>

                    <div className="flex items-start gap-4 pt-2">
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-800/60 text-primary-400 transition-colors group-hover:border-primary-500/40 group-hover:text-primary-300"
                      >
                        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
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
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ──────────────────────────────────────────────────────────────
   Scroll-driven header — each element's opacity/transform is tied
   to a slice of the header's scroll-progress window. The composition
   "draws itself" as the user scrolls into the section.
   ────────────────────────────────────────────────────────────── */

function ScrollDrivenHeader(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  /* offset: progress = 0 when the header's top is at the viewport bottom;
     progress = 1 when the header's bottom reaches the viewport top.
     A full viewport-pass gives the reveal room to breathe so each element
     lingers as the user scrolls. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  /* Each element gets its own [start, end] slice of progress.
     Sliding slices overlap slightly so the reveal feels continuous,
     not stepped. The whole composition is front-loaded to complete by
     ~0.5 progress — i.e. the headline + subtitle are fully revealed by
     the time the section reaches the middle of its scroll pass, instead
     of lingering until you've scrolled almost past it. */
  const stripeOpacity = useTransform(scrollYProgress, [0.0, 0.08], [0, 1]);
  const stripeScaleX = useTransform(scrollYProgress, [0.0, 0.08], [0, 1]);

  const dripLineOpacity = useTransform(scrollYProgress, [0.06, 0.13], [0, 1]);
  const dripLineScaleY = useTransform(scrollYProgress, [0.06, 0.13], [0, 1]);

  const dripBlobOpacity = useTransform(scrollYProgress, [0.11, 0.18], [0, 1]);
  const dripBlobScale = useTransform(scrollYProgress, [0.11, 0.18], [0, 1]);

  const pillOpacity = useTransform(scrollYProgress, [0.16, 0.25], [0, 1]);
  const pillY = useTransform(scrollYProgress, [0.16, 0.25], [-24, 0]);
  const pillScale = useTransform(scrollYProgress, [0.16, 0.25], [0.7, 1]);

  const headlineOpacity = useTransform(scrollYProgress, [0.22, 0.34], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.22, 0.34], [40, 0]);

  const moneyOpacity = useTransform(scrollYProgress, [0.28, 0.4], [0, 1]);
  const moneyScale = useTransform(scrollYProgress, [0.28, 0.4], [0.6, 1]);

  const moneyFlashOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.5],
    [0, 0.9, 0.6],
  );
  const moneyFlashScale = useTransform(scrollYProgress, [0.28, 0.5], [0.4, 2.6]);

  const subtitleOpacity = useTransform(scrollYProgress, [0.36, 0.48], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.36, 0.48], [20, 0]);

  return (
    <div
      ref={ref}
      className="mx-auto flex max-w-3xl flex-col items-center text-center"
    >
      {/* Stripe bar — scales horizontally from center as you scroll in */}
      <motion.div
        className="stripe-bar w-full origin-center"
        style={{ opacity: stripeOpacity, scaleX: stripeScaleX }}
      >
        <span />
        <span />
      </motion.div>

      {/* Drip — vertical line + droplet under the stripe */}
      <div
        aria-hidden="true"
        className="pointer-events-none flex flex-col items-center"
      >
        <motion.span
          className="block h-12 w-px origin-top bg-gradient-to-b from-primary-400 to-primary-400/0"
          style={{ opacity: dripLineOpacity, scaleY: dripLineScaleY }}
        />
        <motion.span
          className="-mt-1 block h-2 w-2 rounded-full bg-primary-400 shadow-[0_0_16px_rgba(107,128,255,0.8)]"
          style={{ opacity: dripBlobOpacity, scale: dripBlobScale }}
        />
      </div>

      {/* "THE LEAK" pill */}
      <motion.span
        className="mt-2 inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-300"
        style={{ opacity: pillOpacity, y: pillY, scale: pillScale }}
      >
        The Leak
      </motion.span>

      {/* Headline — slides up; money phrase gets the showcase */}
      <motion.h2
        className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-surface md:text-5xl lg:text-[56px]"
        style={{ opacity: headlineOpacity, y: headlineY }}
      >
        Your clinic is losing{' '}
        <span className="relative inline-block">
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary-500/50 blur-2xl"
            style={{ opacity: moneyFlashOpacity, scale: moneyFlashScale }}
          />
          <motion.span
            className="serif-hero-neutral inline-block text-primary-400"
            style={{
              opacity: moneyOpacity,
              scale: moneyScale,
              willChange: 'transform',
            }}
          >
            ₹2–4 Lakhs
          </motion.span>
        </span>{' '}
        every month. Here&rsquo;s where.
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-400 md:text-base"
        style={{ opacity: subtitleOpacity, y: subtitleY }}
      >
        Most clinic owners know they miss calls. Almost none know how
        much it actually costs. These are the four gaps bleeding revenue
        every single day — and the patients walking to the clinic
        down the road.
      </motion.p>
    </div>
  );
}
