import { NextResponse, type NextRequest } from 'next/server';

/* ──────────────────────────────────────────────────────────────
   In-memory rate limiter — stores { ip: timestamp[] }.
   Resets when the serverless function cold-starts.
   For stricter limits, swap with Upstash Redis.
   ────────────────────────────────────────────────────────────── */

const RATE_LIMIT = Number(process.env.CONTACT_RATE_LIMIT) || 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const ipMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  ipMap.set(ip, timestamps);
  return false;
}

/* ──────────────────────────────────────────────────────────────
   Validation
   ────────────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+]?[\d\s\-()]{8,16}$/;

type ContactBody = {
  name: string;
  email: string;
  phone: string;
  clinic: string;
  message: string;
};

function validateBody(
  body: unknown,
): { ok: true; data: ContactBody } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body.' };
  }
  const b = body as Record<string, unknown>;
  const name = String(b.name ?? '').trim();
  const email = String(b.email ?? '').trim();
  const phone = String(b.phone ?? '').trim();
  const clinic = String(b.clinic ?? '').trim();
  const message = String(b.message ?? '').trim();

  if (!name || name.length < 2) return { ok: false, error: 'Name is required (2+ chars).' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Valid email is required.' };
  if (!PHONE_RE.test(phone)) return { ok: false, error: 'Valid phone number is required.' };
  if (!clinic || clinic.length < 2) return { ok: false, error: 'Clinic name is required.' };
  if (!message || message.length < 10) return { ok: false, error: 'Message must be 10+ characters.' };

  return { ok: true, data: { name, email, phone, clinic, message } };
}

/* ──────────────────────────────────────────────────────────────
   POST /api/contact
   ────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest): Promise<NextResponse> {
  /* ── CORS ── */
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

  /* ── Rate limit ── */
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

  /* ── Parse + validate ── */
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

  /* ── Send email via Resend (if configured) ── */
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
          from: 'Engageo Website <onboarding@resend.dev>',
          to: [toEmail],
          reply_to: data.email,
          subject: `New enquiry from ${data.name} — ${data.clinic}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(data.name)}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Clinic</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(data.clinic)}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px;">${escapeHtml(data.message).replace(/\n/g, '<br>')}</td></tr>
            </table>
          `,
        }),
      });

      if (!res.ok) {
        console.error('[contact] Resend error:', await res.text());
        return NextResponse.json(
          { error: 'Failed to send message. Please try again.' },
          { status: 502, headers: corsHeaders },
        );
      }
    } catch (err) {
      console.error('[contact] Resend exception:', err);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 502, headers: corsHeaders },
      );
    }
  } else {
    // No email provider configured — log submission to server console.
    console.log('[contact] Submission (no email provider):', data);
  }

  return NextResponse.json(
    { success: true, message: 'Message received. We will get back to you shortly.' },
    { status: 200, headers: corsHeaders },
  );
}

/* ── OPTIONS handler for CORS preflight ── */
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

/* ──────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────── */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
