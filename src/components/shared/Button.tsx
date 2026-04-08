import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-sm hover:bg-primary-600 hover:shadow-md hover:-translate-y-px active:bg-primary-700 active:translate-y-0',
  secondary:
    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md hover:-translate-y-px active:bg-secondary/70 active:translate-y-0',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground hover:-translate-y-px active:translate-y-0',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  link: 'bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto',
  destructive:
    'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md hover:-translate-y-px active:bg-destructive/80 active:translate-y-0',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-[3.25rem] px-7 text-base gap-2.5',
  icon: 'h-10 w-10 p-0',
};

const BASE_STYLES =
  'inline-flex items-center justify-center rounded-md font-medium whitespace-nowrap ' +
  'transition-all duration-200 ease-out select-none will-change-transform active:scale-[0.98] ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  type?: never;
  disabled?: never;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      children,
      ...rest
    } = props;

    const classes = cn(
      BASE_STYLES,
      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      fullWidth && 'w-full',
      className,
    );

    const content = (
      <>
        {leftIcon ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
        {children}
        {rightIcon ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
      </>
    );

    if ('href' in rest && rest.href !== undefined) {
      const { href, external, ...linkRest } = rest;
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            {...linkRest}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...linkRest}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);
