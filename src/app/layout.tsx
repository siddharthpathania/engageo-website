import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { GoogleAnalytics } from '@/components/shared/Analytics';
import { ReducedMotionProvider } from '@/components/shared/ReducedMotionProvider';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
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
  // Static favicons — stable URLs that Google's favicon crawler can cache.
  // We previously generated these dynamically via src/app/icon*.tsx but the
  // hashed URLs and ImageResponse runtime caused both indexing and Vercel
  // build issues. All sizes below come from public/ and are pre-generated
  // from the source logo.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
  },
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
        <ScrollProgress />
        <SkipLink />
        <ReducedMotionProvider>
          <Header />
          <main id="main-content" className="flex-1 pt-16 md:pt-18">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ReducedMotionProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
