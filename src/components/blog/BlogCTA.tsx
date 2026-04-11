import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export type BlogCTAProps = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

/**
 * Mid-article conversion prompt — dark editorial card with a direct CTA.
 * Used once per post to convert reading intent into a trial / audit signup.
 */
export function BlogCTA({
  title,
  body,
  ctaLabel,
  ctaHref,
}: BlogCTAProps): JSX.Element {
  return (
    <aside className="not-prose relative my-12 overflow-hidden rounded-3xl bg-obsidian p-8 md:my-14 md:p-10">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-accent-500/15 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="min-w-0 flex-1">
          <p className="font-display text-[20px] font-semibold leading-tight tracking-tight text-surface md:text-[22px]">
            {title}
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-surface/70 md:text-[14.5px]">
            {body}
          </p>
        </div>
        <Link
          href={ctaHref}
          className="group inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-surface px-6 py-3.5 text-[13.5px] font-semibold text-obsidian shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-50 md:self-center"
        >
          {ctaLabel}
          <ChevronRight
            size={14}
            strokeWidth={2}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </aside>
  );
}
