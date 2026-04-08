import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'elevated' | 'outline' | 'ghost';

const VARIANT_STYLES: Record<CardVariant, string> = {
  default: 'bg-card text-card-foreground border border-border shadow-sm',
  elevated: 'bg-card text-card-foreground border border-border shadow-soft',
  outline: 'bg-transparent text-card-foreground border border-border',
  ghost: 'bg-muted/40 text-card-foreground border border-transparent',
};

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  interactive?: boolean;
  as?: 'div' | 'article' | 'section';
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', interactive = false, as: Component = 'div', className, children, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'rounded-lg',
        VARIANT_STYLES[variant],
        interactive &&
          'transition-all duration-300 ease-out will-change-transform hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});

export function CardHeader({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={cn('flex flex-col gap-1.5 p-6', className)} {...rest}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>): JSX.Element {
  return (
    <h3
      className={cn('font-display text-xl font-semibold leading-tight tracking-tight', className)}
      {...rest}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>): JSX.Element {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...rest}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={cn('px-6 pb-6', className)} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={cn('flex items-center gap-3 border-t border-border p-6', className)} {...rest}>
      {children}
    </div>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}): JSX.Element {
  return (
    <Card variant="elevated" interactive className={cn('group p-6', className)}>
      {icon ? (
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-primary/15">
          {icon}
        </div>
      ) : null}
      <h3 className="font-display text-lg font-semibold leading-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </Card>
  );
}
