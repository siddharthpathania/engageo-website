import { waitUntil } from '@vercel/functions';
import { NextResponse, type NextRequest } from 'next/server';
import { saveLead } from '@/lib/lead-store';
import { verifyOtp, type LeadPayload } from '@/lib/otp-store';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function triggerExotelDemoCall(phone: string): Promise<{ ok: boolean; sid?: string; error?: string }> {
  const sid = process.env.EXOTEL_SID;
  const apiKey = process.env.EXOTEL_API_KEY;
  const apiToken = process.env.EXOTEL_API_TOKEN;
  const callerId = process.env.EXOTEL_CALLER_ID;
  const flowAppId = process.env.EXOTEL_FLOW_APP_ID;
  const region = (process.env.EXOTEL_REGION ?? 'mumbai').toLowerCase();
  const host = region === 'singapore' ? 'api.exotel.com' : 'api.in.exotel.com';

  if (!sid || !apiKey || !apiToken || !callerId || !flowAppId) {
    return { ok: false, error: 'exotel-call-not-configured' };
  }

  const auth = Buffer.from(`${apiKey}:${apiToken}`).toString('base64');
  const body = new URLSearchParams({
    From: phone,
    CallerId: callerId,
    Url: `http://my.exotel.com/${sid}/exoml/start_voice/${flowAppId}`,
    CallType: 'trans',
  });

  try {
    const res = await fetch(`https://${host}/v1/Accounts/${sid}/Calls/connect`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('[otp/verify] Exotel call error:', res.status, text);
      return { ok: false, error: 'call-provider-failed' };
    }
    const json = (await res.json().catch(() => ({}))) as { Call?: { Sid?: string } };
    return { ok: true, sid: json.Call?.Sid };
  } catch (err) {
    console.error('[otp/verify] Exotel call exception:', err);
    return { ok: false, error: 'call-provider-failed' };
  }
}

async function emailLead(data: LeadPayload, callSid: string | undefined): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_FORM_TO || 'engageoagency@gmail.com';

  if (!resendKey) {
    console.log('[otp/verify] Lead (no email provider):', { ...data, callSid });
    return;
  }

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Engageo <noreply@engageoagency.com>',
        to: [toEmail],
        reply_to: data.email,
        subject: `Verified demo trial — ${data.name} (${data.clinic})`,
        html: `
          <h2>Verified Demo Trial — Engageo Experience</h2>
          <p>This lead verified their phone with an OTP and was sent a live AI demo call.</p>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Clinic / Hospital</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(data.clinic)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone (verified)</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">State</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(data.state)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Country</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(data.country)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Exotel Call SID</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(callSid ?? 'n/a')}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Source</td><td style="padding:8px;border-bottom:1px solid #eee;">/experience-engageo (OTP-verified)</td></tr>
          </table>
        `,
      }),
    });
  } catch (err) {
    console.error('[otp/verify] Resend exception:', err);
  }
}

/**
 * Append the verified lead to a Google Sheet via a Google Apps Script web app.
 * Set GOOGLE_SHEETS_WEBHOOK_URL to the deployed web-app URL (the script's
 * doPost appends a row). Fire-and-forget — never blocks or fails the response.
 */
async function appendToSheet(data: LeadPayload, callSid: string | undefined): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        clinic: data.clinic,
        phone: data.phone,
        email: data.email,
        state: data.state,
        country: data.country,
        callSid: callSid ?? '',
        source: 'website (OTP-verified)',
      }),
    });
  } catch (err) {
    console.error('[otp/verify] Google Sheet append exception:', err);
  }
}

/**
 * Tell the Funnel Agent who this visitor is, now that the OTP has proved it.
 *
 * `fa_anon` is the first-party cookie track.js sets on this domain, and it is
 * the only link between the anonymous history already recorded for this browser
 * (pages, clicks, dwell time) and the person who just verified.
 *
 * It is sent when present and omitted when not. A blocked tracker, a private
 * window or a second device all arrive without it, and dropping the lead in
 * those cases would throw away a phone number someone just proved they own —
 * far more valuable than the pages they happened to read.
 *
 * `phone_verified` is only honoured for callers holding the server key: the
 * publishable key in Analytics.tsx ships in page source, so anything a browser
 * can send could otherwise forge a verified lead.
 *
 * Fire-and-forget, like emailLead/appendToSheet — analytics must never delay or
 * fail someone's verification.
 */
async function identifyToFunnelAgent(
  data: LeadPayload,
  anonymousId: string | undefined,
): Promise<void> {
  const api =
    process.env.NEXT_PUBLIC_FUNNEL_API || 'https://funnel-agent-production-669a.up.railway.app';
  const writeKey =
    process.env.NEXT_PUBLIC_FUNNEL_KEY || 'pk_live_e3xCWaiCb_WBkLK8MusyRSCz0zinCRGx';
  const serverKey = process.env.FUNNEL_SERVER_KEY;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Write-Key': writeKey,
  };
  if (serverKey) headers['X-Server-Key'] = serverKey;

  try {
    const res = await fetch(`${api}/identify`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...(anonymousId ? { anonymous_id: anonymousId } : {}),
        name: data.name,
        phone: data.phone,
        email: data.email,
        // Proof of ownership, not permission to market — verifying a number
        // never sets whatsapp_opt_in. The lead form's marketing checkbox is the
        // ONLY thing that does.
        phone_verified: Boolean(serverKey),
        // Ticked → send the consent explicitly. Not ticked → OMIT the field (do
        // NOT send false): to the funnel, false actively revokes an opt-in given
        // earlier, while omitting leaves any existing consent untouched. The
        // opt-out path is replying STOP on WhatsApp, which the backend honours.
        ...(data.whatsappOptIn
          ? { whatsapp_opt_in: true, consent_source: 'popup_whatsapp_optin' }
          : { consent_source: 'otp_verified' }),
      }),
    });
    if (!res.ok) {
      console.error(
        '[otp/verify] Funnel Agent identify failed:',
        res.status,
        await res.text().catch(() => ''),
      );
      return;
    }
    // A mismatched key is accepted silently — the lead is still created, just
    // never marked verified — so say so rather than letting it go unnoticed.
    const out = (await res.json().catch(() => ({}))) as { phone_verified?: boolean };
    if (serverKey && !out.phone_verified) {
      console.error(
        '[otp/verify] Funnel Agent ignored phone_verified — FUNNEL_SERVER_KEY does not match SERVER_KEY on the Funnel Agent',
      );
    }
  } catch (err) {
    console.error('[otp/verify] Funnel Agent identify exception:', err);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 422 });
  }
  const b = body as Record<string, unknown>;
  const phone = String(b.phone ?? '').trim();
  const code = String(b.code ?? '').trim();

  if (!phone || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: 'Phone and 6-digit code required.' }, { status: 422 });
  }

  const result = await verifyOtp(phone, code);
  if (!result.ok) {
    const status = result.reason === 'wrong-code' ? 401 : 410;
    const message =
      result.reason === 'not-found'
        ? 'No active code for this number. Resend the OTP.'
        : result.reason === 'expired'
          ? 'This code expired. Resend a new OTP.'
          : result.reason === 'too-many-attempts'
            ? 'Too many incorrect attempts. Resend a new OTP.'
            : 'Incorrect code. Check the SMS and try again.';
    return NextResponse.json({ error: message, reason: result.reason }, { status });
  }

  const call = await triggerExotelDemoCall(result.payload.phone);

  // Durable system of record FIRST: persist the lead to our own store (the
  // Upstash Redis this app already uses), awaited, before any external delivery.
  // Redis just served the OTP verify above, so it's known-up here. A failure
  // must never fail the user's verification, so it's caught and logged — the
  // waitUntil deliveries below still act as a backup path.
  try {
    await saveLead({
      ...result.payload,
      callSid: call.sid ?? '',
      source: 'website (OTP-verified)',
      verifiedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[otp/verify] Durable lead save failed:', err);
  }

  // Deliver the lead to every sink (email, Google Sheet, Funnel Agent). On
  // Vercel a serverless function can be frozen the instant it returns, dropping
  // un-awaited work — so we register these with waitUntil to keep the function
  // alive until they finish, and fall back to awaiting if that context is
  // unavailable (e.g. local dev). allSettled ensures one failure never blocks
  // the others. This is what makes the sheet update reliably instead of racing
  // the freeze.
  const deliverLead = Promise.allSettled([
    emailLead(result.payload, call.sid),
    appendToSheet(result.payload, call.sid),
    identifyToFunnelAgent(result.payload, request.cookies.get('fa_anon')?.value),
  ]);
  try {
    waitUntil(deliverLead);
  } catch {
    await deliverLead;
  }

  const callQueued = call.ok;
  const callConfigured = call.error !== 'exotel-call-not-configured';

  return NextResponse.json({
    ok: true,
    callQueued,
    callConfigured,
    message: callQueued
      ? "You're verified — your phone will ring in under 30 seconds."
      : callConfigured
        ? "You're verified. Our team will reach you shortly — we couldn't place the demo call automatically."
        : "You're verified. Our team will reach out within 4 working hours to walk you through the demo.",
  });
}
