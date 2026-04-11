'use client';

import { AlertCircle, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    // Log to your error reporting service (Sentry, LogRocket, etc.)
    console.error('[error-boundary]', error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-24 text-center">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-error-50 text-error-500">
        <AlertCircle size={28} strokeWidth={1.75} aria-hidden="true" />
      </div>

      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-obsidian md:text-4xl">
        Something went wrong
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-subtle">
        We hit an unexpected error. This has been logged and our team will look
        into it. In the meantime, you can try again or head back home.
      </p>

      {error.digest ? (
        <p className="mt-3 font-mono text-[11px] text-subtle/60">
          Error ID: {error.digest}
        </p>
      ) : null}

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-obsidian px-6 py-3 text-[13px] font-semibold text-surface transition-all hover:shadow-card"
        >
          <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
          Try Again
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-[13px] font-semibold text-obsidian transition-all hover:border-primary-300 hover:bg-surface"
        >
          Back to Home
        </a>
      </div>
    </section>
  );
}
