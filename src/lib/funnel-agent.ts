import type { LeadPayload } from '@/lib/otp-store';

const API =
  process.env.NEXT_PUBLIC_FUNNEL_API || 'https://funnel-agent-production-669a.up.railway.app';
const WRITE_KEY =
  process.env.NEXT_PUBLIC_FUNNEL_KEY || 'pk_live_e3xCWaiCb_WBkLK8MusyRSCz0zinCRGx';

/**
 * Tell the Funnel Agent who a visitor is.
 *
 * Called twice in the OTP flow, on purpose:
 *   - on SEND, the moment someone asks for a code. They have already handed
 *     over their name, number and email, so the lead is captured then and
 *     there. Most people who drop out do so at the code screen, and waiting
 *     for verification throws those details away.
 *   - on VERIFY, to upgrade the same lead to phone_verified. It resolves to
 *     the same row by phone or email, so this enriches rather than duplicates.
 *
 * `anonymousId` is the fa_anon cookie track.js sets on this domain. It links
 * the person to what they browsed beforehand and is sent when present, but it
 * is not required: blocked trackers, private windows and second devices all
 * arrive without one, and the contact details matter more than the history.
 *
 * `verified` is only honoured by the Funnel Agent for callers holding the
 * server key — the publishable key above ships in page source, so a browser
 * could otherwise forge a verified lead.
 *
 * Never throws and never blocks: analytics must not delay or fail an OTP.
 */
export async function identifyLead(
  data: LeadPayload,
  anonymousId: string | undefined,
  opts: { verified: boolean },
): Promise<void> {
  const serverKey = process.env.FUNNEL_SERVER_KEY;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Write-Key': WRITE_KEY,
  };
  if (serverKey) headers['X-Server-Key'] = serverKey;

  try {
    const res = await fetch(`${API}/identify`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...(anonymousId ? { anonymous_id: anonymousId } : {}),
        name: data.name,
        phone: data.phone,
        email: data.email,
        // Proof of ownership, not permission to market. Opt-ins are omitted so
        // this cannot grant consent nobody gave, and omitting them leaves any
        // consent captured elsewhere untouched.
        phone_verified: opts.verified && Boolean(serverKey),
        // Sent only when ticked. Omitting it leaves existing consent untouched,
        // so an unticked box on a later submission never silently revokes a
        // choice made earlier.
        ...(data.whatsapp_opt_in ? { whatsapp_opt_in: true } : {}),
        consent_source: opts.verified ? 'otp_verified' : 'otp_requested',
      }),
    });

    if (!res.ok) {
      console.error('[funnel-agent] identify failed:', res.status, await res.text().catch(() => ''));
      return;
    }
    // A mismatched key is accepted silently — the lead lands but is never
    // marked verified — so say so rather than letting it go unnoticed.
    const out = (await res.json().catch(() => ({}))) as { phone_verified?: boolean };
    if (opts.verified && serverKey && !out.phone_verified) {
      console.error(
        '[funnel-agent] phone_verified was ignored — FUNNEL_SERVER_KEY does not match SERVER_KEY',
      );
    }
  } catch (err) {
    console.error('[funnel-agent] identify exception:', err);
  }
}
