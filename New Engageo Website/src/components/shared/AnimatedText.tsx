'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimatedTextMode = 'words' | 'chars' | 'lines';

export type AnimatedTextProps = {
  text: string;
  mode?: AnimatedTextMode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
};

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const itemVariants = (duration: number): Variants => ({
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration, ease: [0.16, 1, 0.3, 1] },
  },
});

/**
 * Animate text by word / character / line on scroll into view.
 * Renders as an inline <span> — wrap in a semantic heading/paragraph tag as needed.
 */
export function AnimatedText({
  text,
  mode = 'words',
  className,
  delay = 0,
  stagger = 0.04,
  duration = 0.6,
  once = true,
}: AnimatedTextProps): JSX.Element {
  const segments: string[] =
    mode === 'chars'
      ? Array.from(text)
      : mode === 'lines'
        ? text.split('\n')
        : text.split(' ');

  const separator = mode === 'words' ? ' ' : '';

  return (
    <motion.span
      className={cn('inline-block', className)}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      aria-label={text}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          variants={itemVariants(duration)}
          className="inline-block"
          aria-hidden="true"
        >
          {segment}
          {index < segments.length - 1 ? separator : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 20,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
}): JSX.Element {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
