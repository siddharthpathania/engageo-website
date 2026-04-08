import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default: 'bg-muted text-muted-foreground border-transparent',
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary text-secondary-foreground border-transparent',
  success: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-900',
  warning: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-900',
  outline: 'bg-transparent text-foreground border-border',
};

const SIZE_STYLES: Record<BadgeSize, string> = {
  sm: 'text-[0.6875rem] px-2 py-0.5 h-5',
  md: 'text-xs px-2.5 py-1 h-6',
  lg: 'text-sm px-3 py-1 h-7',
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  leftIcon?: ReactNode;
  dot?: boolean;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', size = 'md', leftIcon, dot = false, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium leading-none',
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className,
      )}
      {...rest}
    >
      {dot ? (
        <span
          className={cn(
            'inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-current',
            variant === 'success' && 'animate-pulse',
          )}
        />
      ) : null}
      {leftIcon ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
      {children}
    </span>
  );
});
