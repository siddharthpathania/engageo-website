'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type SectionWrapperProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Skip the `.container` wrapper — section content goes edge-to-edge. */
  bleed?: boolean;
  /** Apply the `.dark-section` utility (inverts bg/fg/border CSS vars). */
  dark?: boolean;
  /** Disable the scroll-triggered fade-up. Default: true. */
  animate?: boolean;
  /** Aria label for the section landmark. */
  ariaLabel?: string;
  children: ReactNode;
};

/**
 * Section shell: consistent vertical rhythm (py-20 md:py-28), container max-width,
 * optional dark inversion, optional scroll-triggered fade-up.
 *
 * Children passed from server components are serialized transparently — only this
 * wrapper becomes client.
 */
export function SectionWrapper({
  id,
  className,
  containerClassName,
  bleed = false,
  dark = false,
  animate = true,
  ariaLabel,
  children,
}: SectionWrapperProps): JSX.Element {
  const sectionClass = cn(
    'relative py-20 md:py-28',
    dark && 'dark-section overflow-hidden',
    className,
  );

  const inner = bleed ? (
    children
  ) : (
    <div className={cn('container relative', containerClassName)}>
      {children}
    </div>
  );

  if (!animate) {
    return (
      <section id={id} aria-label={ariaLabel} className={sectionClass}>
        {inner}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      aria-label={ariaLabel}
      className={sectionClass}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {inner}
    </motion.section>
  );
}
