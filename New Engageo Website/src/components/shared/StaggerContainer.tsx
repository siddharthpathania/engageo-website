'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { StaggerContext } from './ScrollReveal';

const MOTION_COMPONENTS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  section: motion.section,
  article: motion.article,
} as const;

export type StaggerContainerTag = keyof typeof MOTION_COMPONENTS;

export type StaggerContainerProps = {
  children: ReactNode;
  /** Delay between each child's reveal, in seconds. Default: 0.1. */
  staggerDelay?: number;
  /** Delay before the first child begins, in seconds. */
  delayChildren?: number;
  /** Only animate once (true) or every viewport entry (false). */
  once?: boolean;
  /** How much of the container must be visible to trigger. 0–1. */
  amount?: number;
  /** Element tag to render as. Default: 'div'. */
  as?: StaggerContainerTag;
  className?: string;
};

/**
 * Coordinates a staggered reveal for any number of <ScrollReveal> children.
 *
 * - Children should use <ScrollReveal> — it detects the parent context
 *   and hands animation control over to this container.
 * - Respects `prefers-reduced-motion` — renders children instantly.
 * - Sets StaggerContext so nested ScrollReveals don't self-trigger.
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  once = true,
  amount = 0.15,
  as = 'div',
  className,
}: StaggerContainerProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  const MotionTag = MOTION_COMPONENTS[as];

  return (
    <StaggerContext.Provider value={true}>
      <MotionTag
        className={cn(className)}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
      >
        {children}
      </MotionTag>
    </StaggerContext.Provider>
  );
}
