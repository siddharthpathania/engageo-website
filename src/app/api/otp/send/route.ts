import { NextResponse, type NextRequest } from 'next/server';
import { generateOtp, setOtp, type LeadPayload } from '@/lib/otp-store';

const RATE_LIMIT_PER_IP = Number(process.env.OTP_RATE_LIMIT_IP) || 10;
const RATE_LIMIT_PER_PHONE = Number(process.env.OTP_RATE_LIMIT_PHONE) || 3;
const WINDOW_MS = 60 * 60 * 1000;
const ipMap = new Map<string, number[]>();
const phoneMap = new Map<string, number[]>();

function checkLimit(map: Map<string, number[]>, key: string, max: number): boolean {
  const now = Date.now();
  const timestamps = (map.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= max) return true;
  timestamps.push(now);
  map.set(key, timestamps);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+]?[\d\s\-()]{8,16}$/;

function normalisePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return digits;
  if (digits.length === 10) return `+91${digits}`;
  if (digits.startsWith('91') && digits.length === 12) return `+${digits}`;
  return digits.startsWith('0') ? `+91${digits.slice(1)}` : `+${digits}`;
}

function validateBody(
  body: unknown,
): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request body.' };
  const b = body as Record<string, unknown>;
  const name = String(b.name ?? '').trim();
  const clinic = String(b.clinic ?? '').trim();
  const email = String(b.email ?? '').trim();
  const phoneRaw = String(b.phone ?? '').trim();
  const state = String(b.state ?? '').trim();
  const country = String(b.country ?? '').trim() || 'India';
  // Marketing opt-in checkbox. Optional and never required to submit; only an
  // explicit `true` counts as consent (a missing/false value is not consent).
  const whatsappOptIn = b.whatsappOptIn === true;

  if (!name || name.length < 2) return { ok: false, error: 'Name is required.' };
  if (!clinic || clinic.length < 2) return { ok: false, error: 'Clinic or hospital name is required.' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Valid email is required.' };
  if (!PHONE_RE.test(phoneRaw)) return { ok: false, error: 'Valid phone number is required.' };
  if (!state || state.length < 2) return { ok: false, error: 'State is required.' };

  const phone = normalisePhone(phoneRaw);
  return { ok: true, data: { name, clinic, email, phone, state, country, whatsappOptIn } };
}

/**
 * Deliver the OTP over WhatsApp via the Meta WhatsApp Cloud API using an
 * approved Authentication template (the code is passed to both the body and the
 * copy-code button, which is how authentication templates are sent).
 *
 * Requires (set in the environment / Vercel):
 *   WHATSAPP_PHONE_NUMBER_ID   — sender phone number ID from WhatsApp Manager
 *   WHATSAPP_ACCESS_TOKEN      — permanent System User token (whatsapp_business_messaging)
 *   WHATSAPP_OTP_TEMPLATE_NAME — name of the approved Authentication template
 *   WHATSAPP_OTP_TEMPLATE_LANG — template language code (default 'en')
 *   WHATSAPP_API_VERSION       — Graph API version (default 'v21.0')
 */
async function sendWhatsAppOtp(phone: string, code: string): Promise<{ ok: boolean; error?: string }> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const template = process.env.WHATSAPP_OTP_TEMPLATE_NAME;
  const lang = process.env.WHATSAPP_OTP_TEMPLATE_LANG || 'en';
  const version = process.env.WHATSAPP_API_VERSION || 'v21.0';

  if (!phoneNumberId || !accessToken || !template) {
    return { ok: false, error: 'whatsapp-not-configured' };
  }

  // Graph API expects the recipient in E.164 without the leading '+'.
  const to = phone.replace(/[^\d]/g, '');

  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: {
      name: template,
      language: { code: lang },
      components: [
        { type: 'body', parameters: [{ type: 'text', text: code }] },
        {
          // Copy-code / one-tap button on the authentication template.
          type: 'button',
          sub_type: 'url',
          index: '0',
          parameters: [{ type: 'text', text: code }],
        },
      ],
    },
  };

  try {
    const res = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('[otp/send] WhatsApp Cloud API error:', res.status, text);
      return { ok: false, error: 'whatsapp-provider-failed' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[otp/send] WhatsApp Cloud API exception:', err);
    return { ok: false, error: 'whatsapp-provider-failed' };
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (checkLimit(ipMap, ip, RATE_LIMIT_PER_IP)) {
    return NextResponse.json(
      { error: 'Too many requests from this IP. Try again later.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const result = validateBody(body);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 422 });

  const { data } = result;

  if (checkLimit(phoneMap, data.phone, RATE_LIMIT_PER_PHONE)) {
    return NextResponse.json(
      { error: 'Too many OTP requests for this phone. Try again later.' },
      { status: 429 },
    );
  }

  const code = generateOtp();
  await setOtp(data.phone, code, data);

  const delivery = await sendWhatsAppOtp(data.phone, code);

  if (!delivery.ok && delivery.error !== 'whatsapp-not-configured') {
    return NextResponse.json(
      { error: 'Could not send OTP right now. Try again in a minute.' },
      { status: 502 },
    );
  }

  const devMock = delivery.error === 'whatsapp-not-configured';
  if (devMock) {
    // Which of the required WhatsApp env vars are actually present at runtime?
    // Logs booleans only (never the values) so the missing one is obvious in
    // the Vercel function logs.
    const present = {
      WHATSAPP_PHONE_NUMBER_ID: Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID),
      WHATSAPP_ACCESS_TOKEN: Boolean(process.env.WHATSAPP_ACCESS_TOKEN),
      WHATSAPP_OTP_TEMPLATE_NAME: Boolean(process.env.WHATSAPP_OTP_TEMPLATE_NAME),
    };

    // In production, do NOT fake success — the message wasn't sent. Fail loudly
    // so the UI shows an error instead of a code screen for a code that will
    // never arrive.
    if (process.env.NODE_ENV === 'production') {
      console.error('[otp/send] WhatsApp NOT configured in production — present:', present);
      return NextResponse.json(
        { error: 'OTP delivery is not configured yet. Please try again shortly.' },
        { status: 503 },
      );
    }

    console.log(`[otp/send] DEV MOCK — OTP for ${data.phone}: ${code} — present:`, present);
  }

  return NextResponse.json({
    ok: true,
    phone: data.phone,
    ...(devMock && process.env.NODE_ENV !== 'production' ? { devOtp: code } : {}),
  });
}
