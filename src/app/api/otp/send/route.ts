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

  if (!name || name.length < 2) return { ok: false, error: 'Name is required.' };
  if (!clinic || clinic.length < 2) return { ok: false, error: 'Clinic or hospital name is required.' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Valid email is required.' };
  if (!PHONE_RE.test(phoneRaw)) return { ok: false, error: 'Valid phone number is required.' };
  if (!state || state.length < 2) return { ok: false, error: 'State is required.' };

  const phone = normalisePhone(phoneRaw);
  return { ok: true, data: { name, clinic, email, phone, state, country } };
}

async function sendExotelSms(phone: string, code: string): Promise<{ ok: boolean; error?: string }> {
  const sid = process.env.EXOTEL_SID;
  const apiKey = process.env.EXOTEL_API_KEY;
  const apiToken = process.env.EXOTEL_API_TOKEN;
  const from = process.env.EXOTEL_SMS_FROM;
  const region = (process.env.EXOTEL_REGION ?? 'mumbai').toLowerCase();
  const host = region === 'singapore' ? 'api.exotel.com' : 'api.in.exotel.com';

  if (!sid || !apiKey || !apiToken || !from) {
    return { ok: false, error: 'exotel-not-configured' };
  }

  const auth = Buffer.from(`${apiKey}:${apiToken}`).toString('base64');
  const body = new URLSearchParams({
    From: from,
    To: phone,
    Body: `${code} is your Engageo verification code. Valid for 5 minutes. Do not share with anyone.`,
  });
  if (process.env.EXOTEL_DLT_ENTITY_ID) body.set('DltEntityId', process.env.EXOTEL_DLT_ENTITY_ID);
  if (process.env.EXOTEL_DLT_TEMPLATE_ID) body.set('DltTemplateId', process.env.EXOTEL_DLT_TEMPLATE_ID);

  try {
    const res = await fetch(`https://${host}/v1/Accounts/${sid}/Sms/send`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('[otp/send] Exotel SMS error:', res.status, text);
      return { ok: false, error: 'sms-provider-failed' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[otp/send] Exotel SMS exception:', err);
    return { ok: false, error: 'sms-provider-failed' };
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
  setOtp(data.phone, code, data);

  const sms = await sendExotelSms(data.phone, code);

  if (!sms.ok && sms.error !== 'exotel-not-configured') {
    return NextResponse.json(
      { error: 'Could not send OTP right now. Try again in a minute.' },
      { status: 502 },
    );
  }

  const devMock = sms.error === 'exotel-not-configured';
  if (devMock) {
    console.log(`[otp/send] DEV MOCK — OTP for ${data.phone}: ${code}`);
  }

  return NextResponse.json({
    ok: true,
    phone: data.phone,
    ...(devMock && process.env.NODE_ENV !== 'production' ? { devOtp: code } : {}),
  });
}
