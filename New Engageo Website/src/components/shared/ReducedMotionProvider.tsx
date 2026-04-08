'use client';

import { MotionConfig } from 'framer-motion';
import { type ReactNode } from 'react';

/**
 * Top-level motion config wrapper.
 *
 * `reducedMotion="user"` tells Framer Motion to skip all animations
 * when the OS-level `prefers-reduced-motion: reduce` flag is active.
 * This supplements the CSS-level rule in globals.css.
 */
export function ReducedMotionProvider({ children }: { children: ReactNode }): JSX.Element {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
