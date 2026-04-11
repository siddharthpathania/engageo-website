'use client';

import { Check, Copy } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

/* Brand-accurate SVG paths sourced from Simple Icons (CC0). 24×24 viewBox. */
const BRAND_ICONS: Record<'twitter' | 'linkedin' | 'whatsapp', ReactNode> = {
  twitter: (
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
      fill="currentColor"
    />
  ),
  linkedin: (
    <path
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      fill="currentColor"
    />
  ),
  whatsapp: (
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      fill="currentColor"
    />
  ),
};

function BrandGlyph({ kind }: { kind: keyof typeof BRAND_ICONS }): JSX.Element {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {BRAND_ICONS[kind]}
    </svg>
  );
}

export type ShareButtonsProps = {
  /** Absolute URL of the post to share. */
  url: string;
  /** Post title — passed to Twitter/WhatsApp/LinkedIn. */
  title: string;
  className?: string;
};

/**
 * Post social share row: Twitter, LinkedIn, WhatsApp, plus a copy-link button
 * that flips to a "Copied" state for 2 seconds after click.
 */
export function ShareButtons({
  url,
  title,
  className,
}: ShareButtonsProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappHref = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API may be unavailable (older browsers, insecure context)
    }
  };

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3 text-[12px] font-semibold uppercase tracking-widest text-subtle',
        className,
      )}
    >
      <span className="mr-1 hidden md:inline">Share</span>
      <ShareLink
        href={twitterHref}
        label="Share on Twitter"
        title="Twitter"
        kind="twitter"
      />
      <ShareLink
        href={linkedinHref}
        label="Share on LinkedIn"
        title="LinkedIn"
        kind="linkedin"
      />
      <ShareLink
        href={whatsappHref}
        label="Share on WhatsApp"
        title="WhatsApp"
        kind="whatsapp"
      />
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className={cn(
          'inline-flex h-9 items-center gap-2 rounded-full border border-neutral-200 bg-surface px-3.5 text-[11px] font-semibold uppercase tracking-widest transition-all duration-200 hover:border-primary-300 hover:text-primary-700',
          copied && 'border-success-500 text-success-700 hover:border-success-500 hover:text-success-700',
        )}
      >
        {copied ? (
          <Check size={14} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Copy size={14} strokeWidth={1.75} aria-hidden="true" />
        )}
        <span>{copied ? 'Copied' : 'Copy link'}</span>
      </button>
    </div>
  );
}

type ShareLinkProps = {
  href: string;
  label: string;
  title: string;
  kind: keyof typeof BRAND_ICONS;
};

function ShareLink({ href, label, title, kind }: ShareLinkProps): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={title}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-surface text-subtle transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-700"
    >
      <BrandGlyph kind={kind} />
    </a>
  );
}
