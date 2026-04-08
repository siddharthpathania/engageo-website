import { type ReactNode } from 'react';

export type PullQuoteProps = {
  attribution?: string;
  children: ReactNode;
};

/**
 * Editorial pull quote — uses the serif display face for an unmistakable
 * brand moment inside long-form posts.
 */
export function PullQuote({
  attribution,
  children,
}: PullQuoteProps): JSX.Element {
  return (
    <figure className="my-10 border-l-2 border-primary-500 pl-6 md:my-12 md:pl-8">
      <svg
        width="32"
        height="24"
        viewBox="0 0 32 24"
        fill="none"
        aria-hidden="true"
        className="mb-3 text-primary-500/40"
      >
        <path
          d="M0 24V14C0 6.268 6.268 0 14 0v4c-5.523 0-10 4.477-10 10h10v10H0zm18 0V14C18 6.268 24.268 0 32 0v4c-5.523 0-10 4.477-10 10h10v10H18z"
          fill="currentColor"
        />
      </svg>
      <blockquote className="serif-hero text-[22px] font-normal leading-[1.4] tracking-tight text-obsidian md:text-[28px] md:leading-[1.35]">
        {children}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-subtle">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
