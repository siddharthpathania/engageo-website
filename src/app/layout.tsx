import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { GoogleAnalytics } from '@/components/shared/Analytics';
import { ReducedMotionProvider } from '@/components/shared/ReducedMotionProvider';
import { SkipLink } from '@/components/shared/SkipLink';
import { OrganizationSchema, WebSiteSchema } from '@/components/seo/StructuredData';
import { COMPANY, SITE_CONFIG } from '@/lib/constants';
import { fontVariables } from '@/lib/fonts';
import '@/styles/globals.css';

const DEFAULT_TITLE = 'Engageo — Missed Call Recovery for Clinics India';
const DEFAULT_DESCRIPTION =
  'AI missed-call recovery for Indian clinics. Every unanswered call is qualified, booked, and WhatsApped back in 8 seconds. Live in 47+ clinics today.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Engageo',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.creator, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.creator,
  publisher: COMPANY.legalName,
  applicationName: SITE_CONFIG.name,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    // Reserved for future Hindi localisation:
    // languages: { 'en-IN': '/', 'hi-IN': '/hi' },
  },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    // images auto-injected from src/app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    // images auto-injected from src/app/opengraph-image.tsx
    creator: SITE_CONFIG.twitterHandle,
    site: SITE_CONFIG.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  // icons auto-injected from src/app/icon.tsx, icon1.tsx, icon2.tsx, apple-icon.tsx
  // manifest auto-injected from src/app/manifest.ts
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
  }),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F5F2' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0D0B' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-canvas text-obsidian">
        <OrganizationSchema />
        <WebSiteSchema />
        <SkipLink />
        <ReducedMotionProvider>
          <Header />
          <main id="main-content" className="flex-1 pt-16 md:pt-18">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ReducedMotionProvider>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
