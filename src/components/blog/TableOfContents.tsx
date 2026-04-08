'use client';

import { useEffect, useState } from 'react';
import type { TocHeading } from '@/lib/blog';
import { cn } from '@/lib/utils';

export type TableOfContentsProps = {
  headings: TocHeading[];
  className?: string;
};

/**
 * Sticky sidebar TOC with scrollspy. Uses IntersectionObserver to highlight
 * the heading closest to the top of the viewport. Falls back gracefully if
 * no headings are provided.
 */
export function TableOfContents({
  headings,
  className,
}: TableOfContentsProps): JSX.Element | null {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Track which entries are intersecting and pick the topmost one.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-96px 0px -60% 0px',
        threshold: [0, 1.0],
      },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn('text-[13px] leading-relaxed', className)}
    >
      <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle">
        On this page
      </p>
      <ol className="space-y-2 border-l border-neutral-200">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className={cn(heading.depth === 3 && 'pl-4')}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  '-ml-px block border-l-2 py-0.5 pl-3 transition-colors duration-200',
                  isActive
                    ? 'border-primary-500 font-semibold text-obsidian'
                    : 'border-transparent text-subtle hover:border-neutral-300 hover:text-obsidian',
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
