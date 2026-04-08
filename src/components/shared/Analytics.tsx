import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4 — loads via next/script (afterInteractive strategy).
 *
 * Only renders in production when NEXT_PUBLIC_GA_ID is set.
 * Vercel Analytics is loaded separately via `@vercel/analytics/react` in layout.tsx.
 */
export function GoogleAnalytics(): JSX.Element | null {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            send_page_view: true,
          });
        `}
      </Script>
    </>
  );
}

const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

/**
 * Google Search Console verification — renders a <meta> tag.
 *
 * Only renders when NEXT_PUBLIC_GSC_VERIFICATION is set.
 * Must be placed inside <head> — use Next.js metadata export instead
 * if you prefer the App Router metadata API.
 */
export function SearchConsoleVerification(): JSX.Element | null {
  if (!GSC_VERIFICATION) return null;

  return (
    <meta name="google-site-verification" content={GSC_VERIFICATION} />
  );
}
