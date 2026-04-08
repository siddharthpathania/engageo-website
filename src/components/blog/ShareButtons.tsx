'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

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
        icon={
          <path
            d="M17.3 3H20l-6.3 7.2L21 19h-5.8l-4.5-5.9L5.5 19H3l6.8-7.7L3 3h5.9l4.1 5.4L17.3 3z"
            fill="currentColor"
          />
        }
      />
      <ShareLink
        href={linkedinHref}
        label="Share on LinkedIn"
        title="LinkedIn"
        icon={
          <path
            d="M4.5 3.5a2 2 0 11-.001 4.001A2 2 0 014.5 3.5zM3 9h3v11H3V9zm5.5 0h2.87v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V20h-3v-5.5c0-1.3 0-3-1.83-3s-2.11 1.43-2.11 2.9V20h-3V9z"
            fill="currentColor"
          />
        }
      />
      <ShareLink
        href={whatsappHref}
        label="Share on WhatsApp"
        title="WhatsApp"
        icon={
          <path
            d="M12 3a9 9 0 00-7.6 13.8L3 21l4.3-1.4A9 9 0 1012 3zm0 16.4a7.4 7.4 0 01-3.9-1.1l-.3-.2-2.6.9.9-2.5-.2-.3A7.4 7.4 0 1112 19.4zm4.2-5.5c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4.2-.3v-.4c0-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1 .2-.5.2-1 .1-1-.1-.1-.3-.2-.5-.3z"
            fill="currentColor"
          />
        }
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
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {copied ? (
            <path
              d="M5 10l3 3 7-7"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M8 3h8a1 1 0 011 1v10a1 1 0 01-1 1h-2M4 6h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
        <span>{copied ? 'Copied' : 'Copy link'}</span>
      </button>
    </div>
  );
}

type ShareLinkProps = {
  href: string;
  label: string;
  title: string;
  icon: JSX.Element;
};

function ShareLink({ href, label, title, icon }: ShareLinkProps): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={title}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-surface text-subtle transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-700"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {icon}
      </svg>
    </a>
  );
}
