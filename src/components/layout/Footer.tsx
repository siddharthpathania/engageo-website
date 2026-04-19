'use client';

import { motion } from 'framer-motion';
import { ArrowUp, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CONTACT, SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
// Email address is intentionally NOT rendered in HTML. Cloudflare Email
// Obfuscation rewrites any visible email into /cdn-cgi/l/email-protection,
// which crawlers see as a broken internal link. The contact form posts
// to /api/contact where the recipient address lives server-side.

const COLUMN_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
  },
};

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

/* Brand-accurate SVG paths sourced from Simple Icons (CC0). 24×24 viewBox. */
const SOCIAL_ICONS: Record<string, JSX.Element> = {
  LinkedIn: (
    <path
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      fill="currentColor"
    />
  ),
  Twitter: (
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
      fill="currentColor"
    />
  ),
  WhatsApp: (
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      fill="currentColor"
    />
  ),
  Instagram: (
    <path
      d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
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
        <motion.div
          className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Company */}
          <motion.div variants={COLUMN_VARIANTS}>
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
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      {SOCIAL_ICONS[social.label]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.nav aria-label="Quick links" variants={COLUMN_VARIANTS}>
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
          </motion.nav>

          {/* Services */}
          <motion.nav aria-label="Services" variants={COLUMN_VARIANTS}>
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
          </motion.nav>

          {/* Contact */}
          <motion.div variants={COLUMN_VARIANTS}>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-subtle">
              Contact
            </h4>
            <ul className="mt-4 space-y-2.5 text-[13px] text-obsidian/75">
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-obsidian"
                >
                  Send us a message
                </Link>
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
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
              <li className="pt-2 text-[12px] text-subtle">{CONTACT.hours.label}</li>
            </ul>
          </motion.div>
        </motion.div>

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
              <ArrowUp
                size={12}
                strokeWidth={2}
                className="transition-transform group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
