'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { createContext, useContext, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────
   Context — lets StaggerContainer tell ScrollReveal children
   "I'm driving your animation state, don't self-trigger."
   ────────────────────────────────────────────────────────────── */

export const StaggerContext = createContext(false);

/* ──────────────────────────────────────────────────────────────
   Shared easing — matches SectionWrapper / AnimatedText so every
   scroll reveal across the site has the same rhythm.
   ────────────────────────────────────────────────────────────── */

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export type ScrollRevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

const MOTION_COMPONENTS = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  article: motion.article,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
} as const;

export type ScrollRevealTag = keyof typeof MOTION_COMPONENTS;

export type ScrollRevealProps = {
  children: ReactNode;
  /** Direction the element travels from as it reveals. Default: 'up'. */
  direction?: ScrollRevealDirection;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** Reveal duration in seconds. Default: 0.6s. */
  duration?: number;
  /** Distance the element travels in px. Default: 24. */
  distance?: number;
  /** Only animate once (true) or every time it enters viewport (false). */
  once?: boolean;
  /** How much of the element must be visible to trigger. 0–1. */
  amount?: number;
  /** Element tag to render as. Default: 'div'. */
  as?: ScrollRevealTag;
  className?: string;
};

/**
 * Wrap any content to fade/slide in as it enters the viewport.
 *
 * - Respects `prefers-reduced-motion` (renders instantly, no transforms).
 * - When nested inside <StaggerContainer>, defers trigger to the parent
 *   so staggerChildren drives the reveal cadence.
 * - Uses transform + opacity only (no layout-triggering animations).
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 24,
  once = true,
  amount = 0.15,
  as = 'div',
  className,
}: ScrollRevealProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion();
  const drivenByParent = useContext(StaggerContext);

  /* Accessibility — no motion, just render. */
  if (shouldReduceMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  const x =
    direction === 'left' ? distance : direction === 'right' ? -distance : 0;
  const y =
    direction === 'up' ? distance : direction === 'down' ? -distance : 0;

  const variants: Variants = {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: EASE_OUT_EXPO },
    },
  };

  const MotionTag = MOTION_COMPONENTS[as];

  /* When a StaggerContainer is driving us, supply variants only —
     the parent resolves the animate state so stagger works. */
  if (drivenByParent) {
    return (
      <MotionTag className={cn(className)} variants={variants}>
        {children}
      </MotionTag>
    );
  }

  /* Standalone — self-trigger when scrolled into view. */
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}
