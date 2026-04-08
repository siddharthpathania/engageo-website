import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type CalloutTone = 'info' | 'success' | 'warning' | 'error';

export type CalloutProps = {
  type?: CalloutTone;
  title?: string;
  children: ReactNode;
};

const TONE_STYLES: Record<
  CalloutTone,
  { container: string; iconBg: string; iconFg: string; icon: ReactNode }
> = {
  info: {
    container: 'border-primary-200 bg-primary-50/60',
    iconBg: 'bg-primary-100',
    iconFg: 'text-primary-700',
    icon: (
      <path
        d="M10 6.5v4M10 13.5h.01M17.5 10a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  success: {
    container: 'border-success-100 bg-success-50/60',
    iconBg: 'bg-success-100',
    iconFg: 'text-success-700',
    icon: (
      <path
        d="M6 10l3 3 5-6M17.5 10a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  warning: {
    container: 'border-warning-100 bg-warning-50/60',
    iconBg: 'bg-warning-100',
    iconFg: 'text-warning-700',
    icon: (
      <path
        d="M10 7v4M10 13.5h.01M10 2.5l8 14H2l8-14z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  error: {
    container: 'border-error-100 bg-error-50/60',
    iconBg: 'bg-error-100',
    iconFg: 'text-error-700',
    icon: (
      <path
        d="M7 7l6 6M13 7l-6 6M17.5 10a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
};

/**
 * Inline alert box for blog content — used to surface warnings, results,
 * and key stats inside the editorial flow.
 */
export function Callout({
  type = 'info',
  title,
  children,
}: CalloutProps): JSX.Element {
  const tone = TONE_STYLES[type];

  return (
    <aside
      className={cn(
        'my-8 flex gap-4 rounded-2xl border p-5 md:p-6',
        tone.container,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          tone.iconBg,
          tone.iconFg,
        )}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          {tone.icon}
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        {title ? (
          <p className="font-display text-[15px] font-semibold leading-tight tracking-tight text-obsidian md:text-[16px]">
            {title}
          </p>
        ) : null}
        <div
          className={cn(
            'text-[14.5px] leading-relaxed text-charcoal [&_p]:m-0 [&_p+p]:mt-2.5 [&_strong]:font-semibold [&_strong]:text-obsidian',
            title && 'mt-1.5',
          )}
        >
          {children}
        </div>
      </div>
    </aside>
  );
}
