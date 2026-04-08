'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

export type PageTransitionProps = {
  children: ReactNode;
};

/**
 * Smooth fade + lift between routes. Keyed on pathname so Next.js App
 * Router page swaps trigger an AnimatePresence exit → enter cycle.
 *
 * - Respects `prefers-reduced-motion` — passes children through untouched.
 * - Kept intentionally short (0.35s) so navigation doesn't feel sluggish.
 * - Transform + opacity only — no layout thrash.
 */
export function PageTransition({ children }: PageTransitionProps): JSX.Element {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
