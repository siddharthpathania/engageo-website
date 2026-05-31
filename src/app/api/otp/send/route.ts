import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextResponse, type NextRequest } from 'next/server';
import {
  externalIdFor,
  normalisePhoneE164,
  phoneForExotel,
} from '@/lib/meta-identity';
import {
  generateOtp,
  isUpstashAvailable,
  setAttribution,
  setOtp,
  type AttributionPayload,
  type LeadPayload,
} from '@/lib/otp-store';

const RATE_LIMIT_PER_IP = Number(process.env.OTP_RATE_LIMIT_IP) || 10;
const RATE_LIMIT_PER_PHONE = Number(process.env.OTP_RATE_LIMIT_PHONE) || 3;

/* ──────────────────────────────────────────────────────────────
   Rate limiters — Upstash sliding-window when available; otherwise
   an in-process Map (dev only — production hard-fails in otp-store
   if Upstash isn't configured, so we never reach the fallback in
   prod/preview).
   ────────────────────────────────────────────────────────────── */

let ipLimiter: Ratelimit | null = null;
let phoneLimiter: Ratelimit | null = null;

if (isUpstashAvailable()) {
  const redis = Redis.fromEnv();
  ipLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_PER_IP, '1 h'),
    analytics: true,
    prefix: 'engageo:ratelimit:otp:ip',
  });
  phoneLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_PER_PHONE, '1 h'),
    analytics: true,
    prefix: 'engageo:ratelimit:otp:phone',
  });
}

/* Dev-only fallback — same window math, single-process Map. */
const WINDOW_MS = 60 * 60 * 1000;
const memIpMap = new Map<string, number[]>();
const memPhoneMap = new Map<string, number[]>();

function memCheckLimit(map: Map<string, number[]>, key: string, max: number): boolean {
  const now = Date.now();
  const timestamps = (map.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= max) return true;
  timestamps.push(now);
  map.set(key, timestamps);
  return false;
}

async function isRateLimited(
  kind: 'ip' | 'phone',
  identifier: string,
): Promise<boolean> {
  const limiter = kind === 'ip' ? ipLimiter : phoneLimiter;
  if (limiter) {
    const { success } = await limiter.limit(identifier);
    return !success;
  }
  const map = kind === 'ip' ? memIpMap : memPhoneMap;
  const max = kind === 'ip' ? RATE_LIMIT_PER_IP : RATE_LIMIT_PER_PHONE;
  return memCheckLimit(map, identifier, max);
}

/* ──────────────────────────────────────────────────────────────
   Validation
   ────────────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ValidatedBody = {
  lead: LeadPayload;
  attribution: Omit<AttributionPayload, 'externalId' | 'capturedAt' | 'ip' | 'userAgent' | 'fbc' | 'fbp'>;
};

function validateBody(
  body: unknown,
): { ok: true; data: ValidatedBody } | { ok: false; error: string } {
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

  const phone = phoneForExotel(phoneRaw);
  if (!phone) return { ok: false, error: 'Valid Indian mobile number is required.' };

  if (!state || state.length < 2) return { ok: false, error: 'State is required.' };

  const trimOpt = (v: unknown): string | undefined => {
    const s = String(v ?? '').trim();
    return s ? s : undefined;
  };

  return {
    ok: true,
    data: {
      lead: { name, clinic, email, phone, state, country },
      attribution: {
        utmSource: trimOpt(b.utmSource),
        utmMedium: trimOpt(b.utmMedium),
        utmCampaign: trimOpt(b.utmCampaign),
        utmContent: trimOpt(b.utmContent),
        utmTerm: trimOpt(b.utmTerm),
        landingPage: trimOpt(b.landingPage),
        referrer: trimOpt(b.referrer),
      },
    },
  };
}

/* ──────────────────────────────────────────────────────────────
   Exotel SMS
   ────────────────────────────────────────────────────────────── */

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

/* ──────────────────────────────────────────────────────────────
   POST /api/otp/send
   ────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (await isRateLimited('ip', ip)) {
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

  const { lead, attribution } = result.data;

  // Phone is the rate-limit key — use the normalised digits-only form so
  // "+91 98765 43210" and "9876543210" can't bypass each other.
  const normalisedPhone = normalisePhoneE164(lead.phone) ?? lead.phone;
  if (await isRateLimited('phone', normalisedPhone)) {
    return NextResponse.json(
      { error: 'Too many OTP requests for this phone. Try again later.' },
      { status: 429 },
    );
  }

  const code = generateOtp();
  await setOtp(lead.phone, code, lead);

  // Capture attribution keyed by external_id so async webhooks (Exotel
  // StatusCallback → DemoCompleted, Cal.com booking → Schedule) can stitch
  // back to the browser session in PR2. Browser cookies fbc/fbp are set by
  // the Pixel — empty here until PR2 ships the Pixel.
  //
  // Best-effort: a tracking write failure never breaks the user-facing OTP
  // flow. Worst case we lose attribution for one lead; locking them out of
  // the demo because Redis hiccupped on a side write would be worse.
  const externalId = externalIdFor(lead.phone);
  if (externalId) {
    const fbc = request.cookies.get('_fbc')?.value;
    const fbp = request.cookies.get('_fbp')?.value;
    const userAgent = request.headers.get('user-agent') ?? undefined;

    const attr: AttributionPayload = {
      externalId,
      fbc,
      fbp,
      ip: ip === 'unknown' ? undefined : ip,
      userAgent,
      ...attribution,
      capturedAt: Date.now(),
    };
    try {
      await setAttribution(externalId, attr);
    } catch (err) {
      console.error('[otp/send] Attribution write failed (continuing):', err);
    }
  }

  const sms = await sendExotelSms(lead.phone, code);

  if (!sms.ok && sms.error !== 'exotel-not-configured') {
    return NextResponse.json(
      { error: 'Could not send OTP right now. Try again in a minute.' },
      { status: 502 },
    );
  }

  const devMock = sms.error === 'exotel-not-configured';
  if (devMock) {
    console.log(`[otp/send] DEV MOCK — OTP for ${lead.phone}: ${code}`);
  }

  return NextResponse.json({
    ok: true,
    phone: lead.phone,
    externalId,
    ...(devMock && process.env.NODE_ENV !== 'production' ? { devOtp: code } : {}),
  });
}
