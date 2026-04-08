import Link from 'next/link';
import { type AnchorHTMLAttributes, type ReactNode } from 'react';
import { BlogCTA } from './BlogCTA';
import { BlogImage } from './BlogImage';
import { Callout } from './Callout';
import { PullQuote } from './PullQuote';

/**
 * Smart anchor — internal hrefs go through next/link for client-side navigation;
 * external hrefs open in a new tab with rel="noopener".
 */
function SmartLink({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element {
  const url = href ?? '#';
  const isExternal =
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:');

  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary-700 underline decoration-primary-300 decoration-2 underline-offset-[3px] transition-colors hover:text-primary-800 hover:decoration-primary-500"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={url}
      className="font-medium text-primary-700 underline decoration-primary-300 decoration-2 underline-offset-[3px] transition-colors hover:text-primary-800 hover:decoration-primary-500"
    >
      {children}
    </Link>
  );
}

/**
 * Component map passed into MDXRemote. Standard HTML elements are styled to
 * match Engageo's editorial typography; custom elements are registered here
 * so MDX files can use `<Callout>`, `<PullQuote>`, `<BlogCTA>` inline.
 */
export const mdxComponents = {
  // ─── Headings ──────────────────────────────────────────────────
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="mt-12 font-display text-[34px] font-semibold leading-tight tracking-tight text-obsidian md:text-[42px]">
      {children}
    </h1>
  ),
  h2: ({ children, id }: { children?: ReactNode; id?: string }) => (
    <h2
      id={id}
      className="mt-14 scroll-mt-28 font-display text-[26px] font-semibold leading-tight tracking-tight text-obsidian md:text-[32px]"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }: { children?: ReactNode; id?: string }) => (
    <h3
      id={id}
      className="mt-10 scroll-mt-28 font-display text-[20px] font-semibold leading-snug tracking-tight text-obsidian md:text-[22px]"
    >
      {children}
    </h3>
  ),
  h4: ({ children, id }: { children?: ReactNode; id?: string }) => (
    <h4
      id={id}
      className="mt-8 scroll-mt-28 font-display text-[17px] font-semibold leading-snug tracking-tight text-obsidian md:text-[18px]"
    >
      {children}
    </h4>
  ),

  // ─── Body ──────────────────────────────────────────────────────
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mt-5 text-[16.5px] leading-[1.75] text-charcoal md:text-[17px]">
      {children}
    </p>
  ),

  a: SmartLink,

  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-obsidian">{children}</strong>
  ),

  em: ({ children }: { children?: ReactNode }) => (
    <em className="italic">{children}</em>
  ),

  // ─── Lists ─────────────────────────────────────────────────────
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mt-5 list-disc space-y-2.5 pl-6 text-[16.5px] leading-[1.7] text-charcoal marker:text-primary-500 md:text-[17px]">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mt-5 list-decimal space-y-2.5 pl-6 text-[16.5px] leading-[1.7] text-charcoal marker:font-semibold marker:text-primary-600 md:text-[17px]">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="pl-1.5 [&>p]:mt-0 [&>ul]:mt-2 [&>ol]:mt-2">{children}</li>
  ),

  // ─── Blockquote (markdown `> ...`) ─────────────────────────────
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-6 border-l-2 border-neutral-300 pl-5 font-serif text-[17px] italic leading-relaxed text-subtle md:text-[18px]">
      {children}
    </blockquote>
  ),

  // ─── Code ──────────────────────────────────────────────────────
  code: ({ children }: { children?: ReactNode }) => (
    <code className="rounded-md border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-obsidian">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: ReactNode }) => (
    <pre className="my-6 overflow-x-auto rounded-2xl border border-neutral-800 bg-obsidian p-5 font-mono text-[13px] leading-relaxed text-surface/90 md:text-[13.5px]">
      {children}
    </pre>
  ),

  // ─── Rule ──────────────────────────────────────────────────────
  hr: () => <hr className="my-12 border-t border-neutral-200" />,

  // ─── Table (GFM) ───────────────────────────────────────────────
  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-neutral-200">
      <table className="w-full border-collapse text-left text-[14px]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => (
    <thead className="bg-neutral-50">{children}</thead>
  ),
  tbody: ({ children }: { children?: ReactNode }) => (
    <tbody className="divide-y divide-neutral-200">{children}</tbody>
  ),
  tr: ({ children }: { children?: ReactNode }) => <tr>{children}</tr>,
  th: ({ children }: { children?: ReactNode }) => (
    <th className="border-b border-neutral-200 px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-subtle">
      {children}
    </th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="px-4 py-3 align-top text-charcoal">{children}</td>
  ),

  // ─── Custom registered components ──────────────────────────────
  Callout,
  PullQuote,
  BlogCTA,
  BlogImage,
};
