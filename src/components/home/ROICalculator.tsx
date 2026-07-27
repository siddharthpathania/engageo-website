'use client';

import { ArrowDown, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { CTA } from '@/lib/constants';
import { cn } from '@/lib/utils';

// ─── Animated number counter ──────────────────────────────────────
function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}): JSX.Element {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    const tick = (now: number): void => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (end - start) * eased);
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevRef.current = end;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

// ─── Custom slider ────────────────────────────────────────────────
function Slider({
  value,
  min,
  max,
  step,
  onChange,
  label,
  format,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
  label: string;
  format: (n: number) => string;
}): JSX.Element {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <label className="font-mono text-[11px] font-semibold uppercase tracking-widest text-subtle">
          {label}
        </label>
        <span className="font-display text-xl font-semibold tracking-tight text-obsidian">
          {format(value)}
        </span>
      </div>

      <div className="relative h-2 overflow-visible rounded-full border border-neutral-200 bg-neutral-100">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-primary-500"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-600 bg-surface shadow-subtle"
          style={{ left: `${pct}%` }}
        />
      </div>

      <div className="flex justify-between">
        <span className="font-mono text-[11px] text-subtle">{format(min)}</span>
        <span className="font-mono text-[11px] text-subtle">{format(max)}</span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────
export function ROICalculator(): JSX.Element {
  const [missedPerWeek, setMissedPerWeek] = useState(20);
  const [avgCaseValue, setAvgCaseValue] = useState(18000);

  // Math
  const RECOVERY_RATE = 0.68; // 68% recovery rate (pilot data)
  const ENGAGEO_COST = 7_500; // Growth plan base — ₹7,500/month

  const monthlyMissed = Math.round(missedPerWeek * 4.33);
  const monthlyLoss = monthlyMissed * avgCaseValue;
  const engageoRecovers = Math.round(monthlyLoss * RECOVERY_RATE);
  const netGain = engageoRecovers - ENGAGEO_COST;
  const roiMultiple = (engageoRecovers / ENGAGEO_COST).toFixed(1);

  const lossIntensity = Math.min(monthlyLoss / 1_000_000, 1);

  return (
    <SectionWrapper id="roi-calculator" ariaLabel="Revenue recovery calculator">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(ellipse, rgba(61,90,254,${0.04 + lossIntensity * 0.06}) 0%, transparent 65%)`,
          transition: 'background 0.8s ease',
        }}
      />

      {/* Header */}
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="section-label justify-center">Revenue Calculator</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
          See what you&rsquo;re{' '}
          <span className="serif-hero">actually losing.</span>
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
          Adjust the sliders to match your clinic. Watch your number appear.
        </p>
      </div>

      {/* Card */}
      <div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border border-neutral-200 bg-surface shadow-subtle md:mt-18">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-neutral-200">
          {/* Left — inputs */}
          <div className="space-y-8 border-b border-neutral-200 p-6 md:space-y-10 md:p-10 lg:border-b-0">
            <Slider
              value={missedPerWeek}
              min={5}
              max={100}
              step={1}
              onChange={setMissedPerWeek}
              label="Missed calls per week"
              format={(n) => `${n} calls`}
            />
            <Slider
              value={avgCaseValue}
              min={2000}
              max={150_000}
              step={1000}
              onChange={setAvgCaseValue}
              label="Average case value (₹)"
              format={(n) => `₹${(n / 1000).toFixed(0)}K`}
            />

            <p className="text-[13px] leading-relaxed text-subtle">
              Based on recovery data from{' '}
              <span className="font-semibold text-obsidian">47 Indian specialist clinics</span>.
              Engageo&rsquo;s average call-back success rate is{' '}
              <span className="font-semibold text-primary-600">68%</span>.
            </p>
          </div>

          {/* Right — output */}
          <div className="flex flex-col justify-between gap-6 p-6 md:gap-8 md:p-10">
            {/* Loss card */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-subtle">
                Monthly revenue walking out the door
              </span>
              <div className="font-display text-4xl font-semibold leading-none tracking-tighter text-obsidian md:text-5xl">
                <AnimatedNumber value={monthlyLoss} prefix="₹" />
              </div>
              <p className="mt-2 text-[13px] text-subtle">
                <AnimatedNumber value={monthlyMissed} /> missed calls × ₹
                {avgCaseValue.toLocaleString('en-IN')} avg value
              </p>
            </div>

            {/* Divider with arrow */}
            <div className="flex items-center gap-3 py-2 md:py-0">
              <div className="h-px flex-1 bg-neutral-200" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-200 bg-primary-50 text-primary-600">
                <ArrowDown size={12} strokeWidth={2} aria-hidden="true" />
              </div>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Recovery card */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                Engageo recovers for you
              </span>
              <div
                className={cn(
                  'font-display text-4xl font-semibold leading-none tracking-tighter md:text-5xl',
                  'text-gradient py-1 md:py-0',
                )}
              >
                <AnimatedNumber value={engageoRecovers} prefix="₹" />
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-subtle">
                Net gain after Engageo fee:{' '}
                <span className="font-semibold text-obsidian">
                  <AnimatedNumber value={netGain} prefix="₹" />
                </span>{' '}
                <span className="hidden md:inline">·</span>
                <br className="block md:hidden" />
                <span className="font-bold text-primary-600">{roiMultiple}× ROI</span>
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2 md:pt-0">
              <a
                href={CTA.audit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-5 py-3.5 text-sm font-semibold text-surface shadow-glow transition-all duration-200 hover:bg-primary-600 active:scale-[0.98] md:py-4"
              >
                <span>Get My Free Recovery Audit</span>
                <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
              </a>
              <p className="mt-3 text-center text-[12px] text-subtle md:mt-2">
                Free audit · No credit card · Results in 24 hrs
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
