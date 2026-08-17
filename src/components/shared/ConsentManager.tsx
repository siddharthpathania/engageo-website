'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FunnelAgent, GoogleAnalytics, MicrosoftClarity } from './Analytics';

/**
 * Cookie-consent gate for opt-in analytics.
 *
 * Google Analytics and Microsoft Clarity load ONLY after the visitor clicks
 * "Accept". Funnel Agent runs regardless of the choice — the site treats it as
 * operational funnel measurement — and this is disclosed in the Privacy Policy.
 * Until a choice is made a banner is shown; the choice is remembered in
 * localStorage so it isn't asked again on every visit. The footer "Cookie
 * preferences" link re-opens the banner via a window event.
 *
 * Vercel Analytics / Speed Insights (cookieless, aggregate) also run ungated,
 * from layout.tsx.
 */

const STORAGE_KEY = 'engageo:cookie-consent';
/** Footer dispatches this to let a visitor change their earlier choice. */
export const CONSENT_EVENT = 'engageo:open-cookie-preferences';

type Choice = 'granted' | 'denied';
// undefined → not yet read from storage (server + first client render, so no
// hydration mismatch); null → read, no stored choice (show banner).
type State = Choice | null | undefined;

export function ConsentManager(): JSX.Element | null {
  const [choice, setChoice] = useState<State>(undefined);
  // Tracks whether analytics have been mounted this page session, so that
  // withdrawing consent can force a reload to actually stop the trackers
  // (unmounting a <Script> does not unload code the browser already ran).
  const wasGranted = useRef(false);

  useEffect(() => {
    if (choice === 'granted') wasGranted.current = true;
  }, [choice]);

  // Read the stored choice once on mount.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage blocked (private mode / cookies disabled) — treat as unset.
    }
    setChoice(stored === 'granted' || stored === 'denied' ? stored : null);
  }, []);

  // Let the footer link re-open the banner.
  useEffect(() => {
    function reopen(): void {
      setChoice(null);
    }
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  const decide = useCallback((value: Choice): void => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore write failures — the session still honours the in-memory choice
    }
    if (value === 'denied' && wasGranted.current) {
      // Consent withdrawn after trackers loaded — reload to clear them cleanly.
      window.location.reload();
      return;
    }
    setChoice(value);
  }, []);

  return (
    <>
      {/* Funnel Agent is operational funnel measurement — runs regardless of the
          cookie choice (disclosed in the Privacy Policy). */}
      <FunnelAgent />

      {/* Google Analytics + Microsoft Clarity are opt-in — only after Accept. */}
      {choice === 'granted' ? (
        <>
          <GoogleAnalytics />
          <MicrosoftClarity />
        </>
      ) : null}

      {choice === null ? (
        <ConsentBanner
          onAcceptAll={() => decide('granted')}
          onNecessaryOnly={() => decide('denied')}
        />
      ) : null}
    </>
  );
}

function ConsentBanner({
  onAcceptAll,
  onNecessaryOnly,
}: {
  onAcceptAll: () => void;
  onNecessaryOnly: () => void;
}): JSX.Element {
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[120] px-4 pb-4 sm:inset-x-auto sm:right-4 sm:w-[22rem]"
    >
      <div className="rounded-2xl border border-neutral-200 bg-surface p-5 shadow-2xl">
        <p className="text-[13px] font-semibold text-obsidian">We value your privacy</p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-subtle">
          We use cookies to run and measure our site. See our{' '}
          <a
            href="/privacy-policy"
            className="font-medium text-primary-600 underline-offset-2 hover:underline"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={onAcceptAll}
            className="w-full rounded-lg bg-primary-600 px-3 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={onNecessaryOnly}
            className="w-full rounded-lg border border-neutral-300 bg-surface px-3 py-2 text-[13px] font-semibold text-obsidian transition-colors hover:bg-neutral-50"
          >
            Accept only necessary
          </button>
        </div>
      </div>
    </div>
  );
}
