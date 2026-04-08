import { cn } from '@/lib/utils';

export type BlogCardSkeletonProps = {
  className?: string;
};

/**
 * Loading placeholder that mirrors the blog card layout in CategoryFilter.
 *
 * - Uses Tailwind's `animate-pulse` — a single CSS keyframe, GPU-cheap.
 * - `aria-hidden` + `role="status"` keeps screen readers from announcing
 *   skeleton noise while still signalling a loading region.
 */
export function BlogCardSkeleton({ className }: BlogCardSkeletonProps): JSX.Element {
  return (
    <div
      role="status"
      aria-label="Loading article"
      aria-busy="true"
      className={cn(
        'flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-surface p-6 md:p-7',
        'motion-safe:animate-pulse',
        className,
      )}
    >
      {/* Category pill + read time */}
      <div className="flex items-center justify-between gap-2">
        <div className="h-[26px] w-24 rounded-full bg-neutral-100" />
        <div className="h-3 w-12 rounded bg-neutral-100" />
      </div>

      {/* Title — two lines */}
      <div className="space-y-2 pt-1">
        <div className="h-5 w-full rounded bg-neutral-100" />
        <div className="h-5 w-4/5 rounded bg-neutral-100" />
      </div>

      {/* Description — three lines */}
      <div className="space-y-2 pt-1">
        <div className="h-3 w-full rounded bg-neutral-100" />
        <div className="h-3 w-full rounded bg-neutral-100" />
        <div className="h-3 w-2/3 rounded bg-neutral-100" />
      </div>

      {/* Footer — author + date */}
      <div className="mt-auto flex items-center gap-3 border-t border-neutral-100 pt-4">
        <div className="h-3 w-20 rounded bg-neutral-100" />
        <div className="h-1 w-1 rounded-full bg-neutral-200" />
        <div className="h-3 w-16 rounded bg-neutral-100" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/**
 * Grid of skeleton cards — drop-in replacement for the blog index while
 * posts are loading. Matches CategoryFilter's grid breakpoints.
 */
export function BlogCardSkeletonGrid({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}): JSX.Element {
  return (
    <ul
      role="status"
      aria-label="Loading articles"
      className={cn(
        'mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6',
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <BlogCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
