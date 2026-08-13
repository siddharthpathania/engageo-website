import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SITE_CONFIG } from './constants';

/**
 * Merge Tailwind class names safely, resolving conflicts in favour of the last value.
 * Standard shadcn-style helper used across components.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Build a fully-qualified URL against the configured site origin.
 * Accepts an absolute path (must start with "/") and returns an absolute URL.
 *
 * The origin comes from SITE_CONFIG so there is exactly one definition of
 * "this site's domain". This previously carried its own fallback of
 * `https://engageo.com` while SITE_CONFIG fell back to
 * `https://www.engageoagency.com` — so any build without
 * NEXT_PUBLIC_SITE_URL set emitted structured data, canonical images, and
 * breadcrumbs pointing at a domain the site does not serve. Entity and
 * canonical signals only work if every URL agrees.
 */
export function absoluteUrl(path: string): string {
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.url}${normalised}`;
}

/**
 * Format a date using a locale-aware long format.
 * Accepts Date objects or ISO strings.
 */
export function formatDate(
  input: Date | string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
): string {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Estimate reading time (in minutes) for a chunk of text.
 * Uses a conservative 225 words per minute.
 */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 225));
}

/**
 * Convert an arbitrary string into a URL-safe slug.
 */
export function slugify(value: string): string {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to a max length, preserving whole words where possible.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}

/**
 * Debounce a function call by the specified delay (ms).
 */
export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: TArgs) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Type-safe object entries helper.
 */
export function entries<T extends Record<string, unknown>>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}
