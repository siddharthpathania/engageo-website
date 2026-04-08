import type { Metadata } from 'next';
import Link from 'next/link';
import { MAIN_NAV } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: true },
};

export default function NotFound(): JSX.Element {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-24 text-center">
      {/* Big 404 numeral */}
      <p className="font-display text-[120px] font-bold leading-none tracking-tighter text-primary-500/15 md:text-[180px]">
        404
      </p>

      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-obsidian md:text-4xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-subtle">
        The page you&rsquo;re looking for doesn&rsquo;t exist, may have been moved, or
        is temporarily unavailable. Try one of the links below.
      </p>

      {/* Quick links */}
      <nav aria-label="Quick navigation" className="mt-10">
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {MAIN_NAV.filter((item) => !item.href.includes('#')).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex items-center rounded-full border border-neutral-200 bg-surface px-4 py-2 text-[13px] font-medium text-obsidian transition-all duration-200 hover:-translate-y-px hover:border-primary-300 hover:shadow-sm"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* CTA */}
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-obsidian px-6 py-3 text-[13px] font-semibold text-surface transition-all hover:shadow-card"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-0.5"
          >
            <path
              d="M9 3L5 7l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-[13px] font-semibold text-obsidian transition-all hover:border-primary-300 hover:bg-surface"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
