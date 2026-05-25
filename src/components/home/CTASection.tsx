'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

type CTASectionProps = {
  label?: string;
  headline?: string;
  headlineAccent?: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function CTASection({
  label = 'Your move',
  headline = 'Stop losing patients',
  headlineAccent = 'today.',
  body = 'Somewhere right now, a patient is calling your clinic and nobody\u2019s picking up. That patient is worth \u20B96,000\u2013\u20B912,000 over their lifetime. With Engageo, that call still gets answered, that patient still gets booked. Set it up this week \u2014 see your first recovery by Friday.',
  primaryCta = { label: 'Book Your Strategy Call', href: 'https://calendly.com/engageoagency' },
  secondaryCta = { label: 'WhatsApp Us Instead', href: 'https://wa.me/919699670806' },
}: CTASectionProps): JSX.Element {
  return (
    <SectionWrapper id="cta" ariaLabel="Call to action" dark bleed className="py-24 md:py-32">
      {/* Ambient gradient glow — slow drifting motion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/25 blur-3xl"
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-15%] h-[500px] w-[500px] rounded-full bg-accent-500/15 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center text-primary-300 before:bg-primary-300 after:bg-primary-300/40">
            {label}
          </span>

          <h2 className="mt-6 font-display text-[44px] font-semibold leading-[1.04] tracking-tighter text-surface md:text-6xl lg:text-[72px]">
            {headline}{' '}
            <span className="serif-hero text-accent-400">{headlineAccent}</span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-surface/70 md:text-lg">
            {body}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-surface px-7 py-4 text-[14px] font-semibold text-obsidian shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-50 hover:shadow-card-hover motion-reduce:transform-none"
            >
              {/* Shimmer sweep — runs on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary-200/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
              />
              <span className="relative">{primaryCta.label}</span>
              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="relative transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
              />
            </a>

            <a
              href={secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-surface/30 bg-transparent px-7 py-4 text-[14px] font-semibold text-surface transition-all duration-300 hover:border-surface/60 hover:bg-surface/5"
            >
              <MessageCircle size={16} strokeWidth={1.75} aria-hidden="true" />
              {secondaryCta.label}
            </a>
          </div>

          {/* Trust row */}
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] font-medium uppercase tracking-widest text-surface/60">
            {[
              'No credit card required',
              '15-booking guarantee',
              'Live in 48 hours',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check
                  size={14}
                  strokeWidth={2.25}
                  aria-hidden="true"
                  className="text-primary-400"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
