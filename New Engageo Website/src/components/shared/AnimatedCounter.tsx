'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type AnimatedCounterProps = {
  /** Final value to count to. */
  value: number;
  /** Count duration in seconds. Default: 1.6s. */
  duration?: number;
  /** Delay before the counter starts (after entering viewport). Default: 0. */
  delay?: number;
  /** Starting value. Default: 0. */
  from?: number;
  /** Optional prefix rendered before the number (e.g. "₹", "<"). */
  prefix?: string;
  /** Optional suffix rendered after the number (e.g. "K", "%", "+", "s"). */
  suffix?: string;
  /** Custom formatter, overrides the default `toLocaleString('en-IN')`. */
  formatter?: (_value: number) => string;
  /** Only run once. Default: true. */
  once?: boolean;
  className?: string;
};

/**
 * Counts from `from` to `value` when it enters the viewport.
 *
 * - Respects `prefers-reduced-motion` — renders the final value instantly.
 * - Uses framer-motion's `animate()` for a frame-paced, cancellable tween.
 * - Rounds on each frame to avoid jittering decimal digits.
 */
export function AnimatedCounter({
  value,
  duration = 1.6,
  delay = 0,
  from = 0,
  prefix,
  suffix,
  formatter,
  once = true,
  className,
}: AnimatedCounterProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.5 });
  const [display, setDisplay] = useState<number>(shouldReduceMotion ? value : from);

  useEffect(() => {
    if (!inView) return;

    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(from, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, value, from, duration, delay, shouldReduceMotion]);

  const rendered = formatter
    ? formatter(display)
    : display.toLocaleString('en-IN');

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {rendered}
      {suffix}
    </span>
  );
}
