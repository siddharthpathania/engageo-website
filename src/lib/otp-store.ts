/**
 * OTP + attribution storage, backed by Upstash Redis.
 *
 * Two record types live here:
 *
 *   engageo:otp:{phone}            JSON {code, payload}       TTL 5 min
 *   engageo:otp:attempts:{phone}   integer (INCR)              TTL 5 min
 *   engageo:attr:{external_id}     JSON AttributionPayload    TTL 7 days
 *
 * The attempts counter is a separate key so verify can use atomic INCR
 * instead of read-modify-write — race-safe under parallel brute-force.
 *
 * Attribution lives 7 days (matches Meta's click-attribution window) so the
 * Cal.com Schedule webhook can still resolve fbc/fbp/external_id when a
 * prospect books from a follow-up message days after the demo call.
 *
 * Dev fallback: if UPSTASH_* env vars are unset AND we're not in a Vercel
 * preview/production environment, the store falls back to an in-process Map
 * so `npm run dev` works without provisioning Upstash. In Vercel preview or
 * production we hard-fail at module load — the whole point of this PR is to
 * stop silent in-memory state in serverless.
 */

import { Redis } from '@upstash/redis';

const OTP_TTL_SECONDS = 5 * 60;
const ATTR_TTL_SECONDS = 7 * 24 * 60 * 60;
const MAX_ATTEMPTS = 5;

const OTP_KEY = (phone: string): string => `engageo:otp:${phone}`;
const ATTEMPTS_KEY = (phone: string): string => `engageo:otp:attempts:${phone}`;
const ATTR_KEY = (externalId: string): string => `engageo:attr:${externalId}`;

export type LeadPayload = {
  name: string;
  clinic: string;
  email: string;
  phone: string;
  state: string;
  country: string;
};

export type AttributionPayload = {
  externalId: string;
  fbc?: string;
  fbp?: string;
  ip?: string;
  userAgent?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage?: string;
  referrer?: string;
  capturedAt: number;
};

type StoredOtp = { code: string; payload: LeadPayload };

export type VerifyResult =
  | { ok: true; payload: LeadPayload }
  | { ok: false; reason: 'not-found' | 'expired' | 'too-many-attempts' | 'wrong-code' };

/* ──────────────────────────────────────────────────────────────
   Environment + driver selection
   ────────────────────────────────────────────────────────────── */

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const vercelEnv = process.env.VERCEL_ENV; // 'production' | 'preview' | 'development' | undefined
const isHostedEnv = vercelEnv === 'production' || vercelEnv === 'preview';
const isProdNodeEnv = process.env.NODE_ENV === 'production';
const hasUpstash = Boolean(upstashUrl && upstashToken);

if (!hasUpstash && (isHostedEnv || isProdNodeEnv)) {
  throw new Error(
    '[otp-store] UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required ' +
      "in production and preview. The in-memory fallback only runs in local dev — refusing " +
      'to start to avoid silent data loss across serverless invocations.',
  );
}

let redis: Redis | null = null;
if (hasUpstash) {
  redis = new Redis({ url: upstashUrl!, token: upstashToken! });
} else {
  // eslint-disable-next-line no-console
  console.warn(
    '[otp-store] No Upstash credentials detected — using in-memory fallback. This is ' +
      'fine for local dev only; production/preview will hard-fail at boot.',
  );
}

/* ──────────────────────────────────────────────────────────────
   In-memory fallback (dev only)
   ────────────────────────────────────────────────────────────── */

type MemoryEntry<T> = { value: T; expiresAt: number };

const globalMem = globalThis as unknown as {
  __engageoStringStore?: Map<string, MemoryEntry<string>>;
  __engageoNumberStore?: Map<string, MemoryEntry<number>>;
};

const memString =
  globalMem.__engageoStringStore ?? new Map<string, MemoryEntry<string>>();
const memNumber =
  globalMem.__engageoNumberStore ?? new Map<string, MemoryEntry<number>>();
globalMem.__engageoStringStore = memString;
globalMem.__engageoNumberStore = memNumber;

function memSetString(key: string, value: string, ttlSeconds: number): void {
  memString.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}
function memGetString(key: string): string | null {
  const entry = memString.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memString.delete(key);
    return null;
  }
  return entry.value;
}
function memDeleteString(key: string): void {
  memString.delete(key);
}
function memIncr(key: string, ttlSeconds: number): number {
  const entry = memNumber.get(key);
  if (!entry || Date.now() > entry.expiresAt) {
    memNumber.set(key, { value: 1, expiresAt: Date.now() + ttlSeconds * 1000 });
    return 1;
  }
  entry.value += 1;
  return entry.value;
}
function memDeleteNumber(key: string): void {
  memNumber.delete(key);
}

/* ──────────────────────────────────────────────────────────────
   OTP operations
   ────────────────────────────────────────────────────────────── */

export async function setOtp(
  phone: string,
  code: string,
  payload: LeadPayload,
): Promise<void> {
  const stored: StoredOtp = { code, payload };
  const json = JSON.stringify(stored);
  if (redis) {
    await Promise.all([
      redis.set(OTP_KEY(phone), json, { ex: OTP_TTL_SECONDS }),
      redis.set(ATTEMPTS_KEY(phone), 0, { ex: OTP_TTL_SECONDS }),
    ]);
    return;
  }
  memSetString(OTP_KEY(phone), json, OTP_TTL_SECONDS);
  memNumber.set(ATTEMPTS_KEY(phone), {
    value: 0,
    expiresAt: Date.now() + OTP_TTL_SECONDS * 1000,
  });
}

export async function verifyOtp(phone: string, code: string): Promise<VerifyResult> {
  const stored = await readOtp(phone);
  if (!stored) return { ok: false, reason: 'not-found' };

  const attempts = await incrAttempts(phone);
  if (attempts > MAX_ATTEMPTS) {
    await deleteOtp(phone);
    return { ok: false, reason: 'too-many-attempts' };
  }

  if (stored.code !== code) {
    return { ok: false, reason: 'wrong-code' };
  }

  // Single-use: consume the OTP. If the DEL races with a parallel verify of
  // the same correct code, only one caller "wins" — the other sees not-found.
  const consumed = await consumeOtp(phone);
  if (!consumed) return { ok: false, reason: 'not-found' };
  return { ok: true, payload: stored.payload };
}

async function readOtp(phone: string): Promise<StoredOtp | null> {
  if (redis) {
    const raw = await redis.get<StoredOtp | string>(OTP_KEY(phone));
    if (!raw) return null;
    return typeof raw === 'string' ? (JSON.parse(raw) as StoredOtp) : raw;
  }
  const raw = memGetString(OTP_KEY(phone));
  return raw ? (JSON.parse(raw) as StoredOtp) : null;
}

async function incrAttempts(phone: string): Promise<number> {
  if (redis) {
    return await redis.incr(ATTEMPTS_KEY(phone));
  }
  return memIncr(ATTEMPTS_KEY(phone), OTP_TTL_SECONDS);
}

async function consumeOtp(phone: string): Promise<boolean> {
  if (redis) {
    const removed = await redis.del(OTP_KEY(phone));
    await redis.del(ATTEMPTS_KEY(phone));
    return removed === 1;
  }
  const existed = memString.has(OTP_KEY(phone));
  memDeleteString(OTP_KEY(phone));
  memDeleteNumber(ATTEMPTS_KEY(phone));
  return existed;
}

async function deleteOtp(phone: string): Promise<void> {
  if (redis) {
    await Promise.all([redis.del(OTP_KEY(phone)), redis.del(ATTEMPTS_KEY(phone))]);
    return;
  }
  memDeleteString(OTP_KEY(phone));
  memDeleteNumber(ATTEMPTS_KEY(phone));
}

/* ──────────────────────────────────────────────────────────────
   Attribution operations
   Read by every server-side CAPI event in PR2. Keyed by external_id so
   async webhooks (Exotel StatusCallback, Cal.com booking) can stitch
   back to the original browser session via the verified phone alone.
   ────────────────────────────────────────────────────────────── */

export async function setAttribution(
  externalId: string,
  payload: AttributionPayload,
): Promise<void> {
  const json = JSON.stringify(payload);
  if (redis) {
    await redis.set(ATTR_KEY(externalId), json, { ex: ATTR_TTL_SECONDS });
    return;
  }
  memSetString(ATTR_KEY(externalId), json, ATTR_TTL_SECONDS);
}

export async function getAttribution(
  externalId: string,
): Promise<AttributionPayload | null> {
  if (redis) {
    const raw = await redis.get<AttributionPayload | string>(ATTR_KEY(externalId));
    if (!raw) return null;
    return typeof raw === 'string' ? (JSON.parse(raw) as AttributionPayload) : raw;
  }
  const raw = memGetString(ATTR_KEY(externalId));
  return raw ? (JSON.parse(raw) as AttributionPayload) : null;
}

/* ──────────────────────────────────────────────────────────────
   OTP code generation (no I/O)
   ────────────────────────────────────────────────────────────── */

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/** Used by callers (rate limiter, route) to know if we have real Redis. */
export function isUpstashAvailable(): boolean {
  return redis !== null;
}
