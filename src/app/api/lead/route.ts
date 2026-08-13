import { NextResponse, type NextRequest } from 'next/server';

const RATE_LIMIT = Number(process.env.LEAD_RATE_LIMIT) || 5;
const WINDOW_MS = 60 * 60 * 1000;
const ipMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  ipMap.set(ip, timestamps);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type LeadBody = {
  name: string;
  clinic: string;
  email: string;
  state: string;
  country: string;
};

function validateBody(
  body: unknown,
): { ok: true; data: LeadBody } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body.' };
  }
  const b = body as Record<string, unknown>;
  const name = String(b.name ?? '').trim();
  const clinic = String(b.clinic ?? '').trim();
  const email = String(b.email ?? '').trim();
  const state = String(b.state ?? '').trim();
  const country = String(b.country ?? '').trim();

  if (!name || name.length < 2) return { ok: false, error: 'Name is required (2+ chars).' };
  if (!clinic || clinic.length < 2) return { ok: false, error: 'Clinic or hospital name is required.' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Valid email is required.' };
  if (!state || state.length < 2) return { ok: false, error: 'State is required.' };
  if (!country || country.length < 2) return { ok: false, error: 'Country is required.' };

  return { ok: true, data: { name, clinic, email, state, country } };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get('origin') ?? '';
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
  ].filter(Boolean);
  const corsAllowed = allowedOrigins.some((o) => origin.startsWith(o!));

  const corsHeaders = {
    'Access-Control-Allow-Origin': corsAllowed ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: corsHeaders },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON.' },
      { status: 400, headers: corsHeaders },
    );
  }

  const result = validateBody(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: 422, headers: corsHeaders },
    );
  }

  const { data } = result;

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_FORM_TO || 'engageoagency@gmail.com';

  if (resendKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Engageo <noreply@engageoagency.com>',
          to: [toEmail],
          reply_to: data.email,
          subject: `New lead from popup — ${data.name} (${data.clinic})`,
          html: `
            <h2>New Lead — Website Popup</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(data.name)}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Clinic / Hospital</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(data.clinic)}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">State</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(data.state)}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Country</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(data.country)}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Source</td><td style="padding:8px;border-bottom:1px solid #eee;">Homepage popup</td></tr>
            </table>
          `,
        }),
      });

      if (!res.ok) {
        console.error('[lead] Resend error:', await res.text());
        return NextResponse.json(
          { error: 'Failed to send. Please try again.' },
          { status: 502, headers: corsHeaders },
        );
      }
    } catch (err) {
      console.error('[lead] Resend exception:', err);
      return NextResponse.json(
        { error: 'Failed to send. Please try again.' },
        { status: 502, headers: corsHeaders },
      );
    }
  } else {
    console.log('[lead] Submission (no email provider):', data);
  }

  return NextResponse.json(
    { success: true },
    { status: 200, headers: corsHeaders },
  );
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
