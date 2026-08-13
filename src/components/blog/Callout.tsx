import { AlertCircle, AlertTriangle, CheckCircle2, Info, type LucideIcon } from 'lucide-react';
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
  { container: string; iconBg: string; iconFg: string; Icon: LucideIcon }
> = {
  info: {
    container: 'border-primary-200 bg-primary-50/60',
    iconBg: 'bg-primary-100',
    iconFg: 'text-primary-700',
    Icon: Info,
  },
  success: {
    container: 'border-success-100 bg-success-50/60',
    iconBg: 'bg-success-100',
    iconFg: 'text-success-700',
    Icon: CheckCircle2,
  },
  warning: {
    container: 'border-warning-100 bg-warning-50/60',
    iconBg: 'bg-warning-100',
    iconFg: 'text-warning-700',
    Icon: AlertTriangle,
  },
  error: {
    container: 'border-error-100 bg-error-50/60',
    iconBg: 'bg-error-100',
    iconFg: 'text-error-700',
    Icon: AlertCircle,
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
  const Icon = tone.Icon;

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
        <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
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
