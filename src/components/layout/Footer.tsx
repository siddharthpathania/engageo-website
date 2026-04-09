'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CONTACT, SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';

type FooterLink = { label: string; href: string };

const QUICK_LINKS: readonly FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

const SERVICES: readonly FooterLink[] = [
  { label: 'Missed Call Recovery', href: '/services#recovery' },
  { label: 'Lead Gen + Recovery', href: '/services#growth' },
  { label: 'Full Clinic Growth', href: '/services#dominate' },
  { label: 'WhatsApp Automation', href: '/services#whatsapp' },
] as const;

const SOCIAL_ICONS: Record<string, JSX.Element> = {
  LinkedIn: (
    <path
      d="M4.5 3.5a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 014.5 3.5zM3 8h3v10H3V8zm5 0h2.9v1.37h.04c.4-.76 1.4-1.57 2.88-1.57C16.9 7.8 18 9.3 18 12.1V18h-3v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V18H8V8z"
      fill="currentColor"
    />
  ),
  Twitter: (
    <path
      d="M14.9 3h2.6l-5.68 6.5L18.5 18h-5.23l-4.1-5.36L4.5 18H1.9l6.07-6.94L1.5 3h5.36l3.7 4.9L14.9 3zm-.92 13.4h1.44L6.1 4.5H4.55L13.98 16.4z"
      fill="currentColor"
    />
  ),
  WhatsApp: (
    <path
      d="M10 2a8 8 0 00-6.93 12.01L2 18l4.08-1.07A8 8 0 1010 2zm0 14.54a6.54 6.54 0 01-3.33-.91l-.24-.14-2.42.63.65-2.36-.16-.24a6.54 6.54 0 115.5 3.02zm3.6-4.9c-.2-.1-1.17-.58-1.35-.64-.18-.07-.32-.1-.45.1-.14.2-.52.64-.63.77-.12.14-.23.15-.43.05-.2-.1-.84-.31-1.6-.99-.59-.52-.99-1.17-1.1-1.37-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.14.03-.26-.02-.36-.05-.1-.45-1.08-.62-1.47-.16-.39-.33-.34-.45-.34h-.38c-.13 0-.34.05-.52.26-.18.2-.68.67-.68 1.63 0 .97.7 1.9.8 2.03.1.14 1.38 2.1 3.35 2.94.47.2.84.32 1.12.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.17-.46.17-.85.12-.94-.05-.09-.18-.14-.38-.24z"
      fill="currentColor"
    />
  ),
  Instagram: (
    <path
      d="M10 6.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm0 5.75a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zm4.4-5.9a.82.82 0 11-1.64 0 .82.82 0 011.64 0zM10 3.4c-1.78 0-2-.01-2.7.04-.7.03-1.17.14-1.59.3a3.2 3.2 0 00-1.16.75c-.36.36-.58.72-.75 1.16-.16.42-.27.9-.3 1.59C3.45 7.94 3.4 8.22 3.4 10s.01 2 .04 2.7c.03.7.14 1.17.3 1.59.17.44.39.8.75 1.16.36.36.72.58 1.16.75.42.16.9.27 1.59.3.7.03.92.04 2.7.04s2-.01 2.7-.04c.7-.03 1.17-.14 1.59-.3a3.2 3.2 0 001.16-.75c.36-.36.58-.72.75-1.16.16-.42.27-.9.3-1.59.03-.7.04-.92.04-2.7s-.01-2-.04-2.7c-.03-.7-.14-1.17-.3-1.59a3.2 3.2 0 00-.75-1.16 3.2 3.2 0 00-1.16-.75c-.42-.16-.9-.27-1.59-.3-.7-.03-.92-.04-2.7-.04zm0 1.19c1.75 0 1.96.01 2.65.04.64.03.99.13 1.22.22.31.12.53.26.76.49.23.23.37.45.49.76.09.23.2.58.22 1.22.03.69.04.9.04 2.65s-.01 1.96-.04 2.65c-.03.64-.13.99-.22 1.22-.12.31-.26.53-.49.76a2.05 2.05 0 01-.76.49c-.23.09-.58.2-1.22.22-.69.03-.9.04-2.65.04s-1.96-.01-2.65-.04c-.64-.03-.99-.13-1.22-.22a2.05 2.05 0 01-.76-.49 2.05 2.05 0 01-.49-.76c-.09-.23-.2-.58-.22-1.22-.03-.69-.04-.9-.04-2.65s.01-1.96.04-2.65c.03-.64.13-.99.22-1.22.12-.31.26-.53.49-.76.23-.23.45-.37.76-.49.23-.09.58-.2 1.22-.22.69-.03.9-.04 2.65-.04z"
      fill="currentColor"
    />
  ),
};

const FEATURED_SOCIALS = ['LinkedIn', 'Instagram', 'WhatsApp'] as const;

export function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  function scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="relative border-t border-neutral-200 bg-canvas" role="contentinfo">
      <div className="container py-14 md:py-20">
        {/* Top row: columns */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Company */}
          <div>
            <Link
              href="/"
              aria-label={`${SITE_CONFIG.name} — home`}
              className="flex items-center gap-1.5"
            >
              <Image
                src="/logo.png"
                alt=""
                width={28}
                height={28}
                className="rounded-lg"
              />
              <span className="font-display text-[17px] font-semibold tracking-tight text-obsidian">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-subtle">
              We recover the calls your clinic misses. Every missed call is a
              patient someone else books if we don&rsquo;t. Live in 47+ Indian
              clinics.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-success-200 bg-success-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-success-700">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success-500" />
              System Operational
            </div>

            {/* Socials */}
            <ul className="mt-6 flex items-center gap-2" aria-label="Social media">
              {SOCIAL_LINKS.filter((s) =>
                (FEATURED_SOCIALS as readonly string[]).includes(s.label),
              ).map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in new tab)`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-surface text-obsidian/70 transition-all hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600"
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                      {SOCIAL_ICONS[social.label]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-subtle">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-obsidian/75 transition-colors hover:text-obsidian"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-subtle">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-obsidian/75 transition-colors hover:text-obsidian"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-subtle">
              Contact
            </h4>
            <ul className="mt-4 space-y-2.5 text-[13px] text-obsidian/75">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-obsidian"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phoneE164}`}
                  className="transition-colors hover:text-obsidian"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-primary-600 transition-colors hover:text-primary-700"
                >
                  WhatsApp Us
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M4 3h5v5M9 3L3 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </li>
              <li className="pt-2 text-[12px] text-subtle">{CONTACT.hours.label}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-neutral-200 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 text-xs text-subtle md:flex-row md:items-center md:gap-4">
            <p>
              &copy; {year} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <span
              aria-hidden="true"
              className="hidden h-1 w-1 rounded-full bg-neutral-300 md:inline-block"
            />
            <span className="inline-flex items-center gap-1.5 font-medium text-obsidian/70">
              <span
                aria-hidden="true"
                className="h-2.5 w-3.5 rounded-[1px] bg-gradient-to-b from-accent-500 via-surface to-success-600"
              />
              Made in India · Built for Indian clinics
            </span>
          </div>

          <div className="flex items-center gap-4">
<button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-surface px-3 py-1.5 text-[11px] font-medium text-obsidian/75 transition-all hover:border-primary-200 hover:text-primary-600"
            >
              Back to top
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                <path
                  d="M6 10V2M3 5l3-3 3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
