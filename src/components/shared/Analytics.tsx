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

// Microsoft Clarity project ID. Overridable via env; defaults to the live
// Engageo project so it works without extra deploy config. Public by design
// (the tag is client-side and visible in page source).
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'xoah1hl60w';

/**
 * Microsoft Clarity — session replay + heatmaps.
 *
 * Loads the official Clarity tag via next/script (afterInteractive). Only runs
 * in production so local dev sessions don't pollute the Clarity data.
 */
export function MicrosoftClarity(): JSX.Element | null {
  if (!CLARITY_ID || process.env.NODE_ENV !== 'production') return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}

// Funnel Agent — funnel / journey tracking. Overridable via env; defaults to
// the live project so it works without extra deploy config. The publishable
// key (pk_live_…) is client-side by design and visible in page source.
// NOTE: the Funnel host must be allowed in `script-src` + `connect-src` in the
// CSP (next.config.mjs) or track.js and its event uploads will be blocked.
const FUNNEL_API =
  process.env.NEXT_PUBLIC_FUNNEL_API || 'https://funnel-agent-production-669a.up.railway.app';
const FUNNEL_KEY =
  process.env.NEXT_PUBLIC_FUNNEL_KEY || 'pk_live_e3xCWaiCb_WBkLK8MusyRSCz0zinCRGx';

/**
 * Funnel Agent tracking — loads site-wide via next/script (afterInteractive).
 * Sets the API + key globals, then loads track.js from the Funnel Agent host.
 * Loads whenever the key is set (including local dev) so the connection can be
 * verified before deploy.
 */
export function FunnelAgent(): JSX.Element | null {
  if (!FUNNEL_KEY) return null;

  return (
    <>
      <Script id="funnel-agent-config" strategy="afterInteractive">
        {`window.FUNNEL_API=${JSON.stringify(FUNNEL_API)};window.FUNNEL_KEY=${JSON.stringify(FUNNEL_KEY)};`}
      </Script>
      <Script src={`${FUNNEL_API}/track.js`} strategy="afterInteractive" />
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
