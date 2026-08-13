import { type ReactNode } from 'react';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { isTodo } from '@/config/legal';
import { cn } from '@/lib/utils';

export type LegalDocProps = {
  /** Page H1. */
  title: string;
  /** Short intro line under the title. */
  intro?: string;
  /** Human-readable last-updated date, e.g. "2 June 2026". */
  lastUpdated: string;
  /** Breadcrumb label for the current page (root → current is built here). */
  breadcrumbLabel: string;
  /** Absolute path of the current page, e.g. "/privacy-policy". */
  breadcrumbHref: string;
  children: ReactNode;
};

/**
 * Shared shell for legal / policy pages (Privacy, Terms, Security).
 *
 * Single source of truth for the legal-page look so the three documents stay
 * visually consistent and free of copy-paste. Renders a JSON-LD breadcrumb,
 * a document header (title + last-updated), and a readable single-column body.
 *
 * Server component — no client interactivity needed.
 */
export function LegalDoc({
  title,
  intro,
  lastUpdated,
  breadcrumbLabel,
  breadcrumbHref,
  children,
}: LegalDocProps): JSX.Element {
  return (
    <article className="bg-canvas">
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: breadcrumbLabel, href: breadcrumbHref },
        ]}
      />

      <div className="container max-w-3xl py-12 md:py-16">
        <header className="border-b border-neutral-200 pb-8">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-obsidian md:text-4xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-4 text-[15px] leading-relaxed text-subtle md:text-base">
              {intro}
            </p>
          ) : null}
          <p className="mt-5 text-[13px] font-medium uppercase tracking-widest text-subtle">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="mt-10 space-y-10">{children}</div>
      </div>
    </article>
  );
}

export type LegalSectionProps = {
  /** Stable id for in-page anchoring. */
  id?: string;
  heading: string;
  children: ReactNode;
  className?: string;
};

/** A titled section within a legal document. */
export function LegalSection({
  id,
  heading,
  children,
  className,
}: LegalSectionProps): JSX.Element {
  return (
    <section id={id} className={cn('scroll-mt-24', className)}>
      <h2 className="font-display text-xl font-semibold tracking-tight text-obsidian md:text-2xl">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-obsidian/80">
        {children}
      </div>
    </section>
  );
}

/**
 * Visible placeholder marker for unconfirmed facts. Renders inline so drafts
 * are obvious on the page and grep-able in source as "[PLACEHOLDER:".
 */
export function Placeholder({ children }: { children: ReactNode }): JSX.Element {
  return (
    <mark className="rounded-sm bg-accent-100 px-1.5 py-0.5 text-[0.9em] font-semibold text-accent-700">
      [PLACEHOLDER: {children}]
    </mark>
  );
}

/**
 * Render a value from the legal config. Behaviour when the value is unfilled
 * depends on whether the field is REQUIRED or FALLBACK (see src/config/legal.ts):
 *
 *   - value present       → render the value
 *   - absent + required   → render a visible [PLACEHOLDER: label] marker so it
 *                           can't ship unnoticed (the dev completeness check
 *                           also warns)
 *   - absent + fallback   → render the neutral `fallback` prose, NO marker, so
 *                           the page reads as finished until counsel fills it
 *
 * Exactly one of `label` (required) or `fallback` should be provided.
 */
export function Field({
  value,
  required = false,
  label,
  fallback = '',
}: {
  value: string;
  /** Treat as a publish-blocking field: show a marker when unfilled. */
  required?: boolean;
  /** Marker text shown when a required field is unfilled. */
  label?: string;
  /** Neutral prose shown when a fallback field is unfilled. */
  fallback?: string;
}): JSX.Element {
  if (!isTodo(value)) return <>{value}</>;
  return required ? <Placeholder>{label ?? 'value required'}</Placeholder> : <>{fallback}</>;
}

/**
 * Render a list of values from the legal config (e.g. vendor names). When the
 * list is empty, behaviour mirrors {@link Field}: a `fallback` renders neutral
 * prose with no marker; otherwise a visible [PLACEHOLDER: label] marker shows.
 */
export function ListField({
  items,
  label,
  fallback,
}: {
  items: readonly string[];
  label?: string;
  fallback?: string;
}): JSX.Element {
  if (items.length > 0) return <>{items.join(', ')}</>;
  if (fallback !== undefined) return <>{fallback}</>;
  return <Placeholder>{label ?? 'value required'}</Placeholder>;
}
