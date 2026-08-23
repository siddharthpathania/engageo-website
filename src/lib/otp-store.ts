/**
 * OTP storage with TTL.
 *
 * IMPORTANT: on Vercel, `/api/otp/send` and `/api/otp/verify` run as separate
 * serverless functions with separate memory — an in-memory Map written by one
 * is never visible to the other, so verification would always fail in
 * production. This uses Upstash Redis (a shared REST-backed store) when
 * configured, and only falls back to an in-memory Map for local single-process
 * dev.
 *
 * Provision: create an Upstash Redis database (e.g. Vercel → Storage → Upstash,
 * one click) and set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN. The
 * Vercel KV env names (KV_REST_API_URL / KV_REST_API_TOKEN) are also accepted.
 */
import { randomInt } from 'crypto';
import { Redis } from '@upstash/redis';

const OTP_TTL_S = 5 * 60; // 5 minutes
const MAX_ATTEMPTS = 5;

export type LeadPayload = {
  name: string;
  clinic: string;
  email: string;
  phone: string;
  state: string;
  country: string;
  /**
   * Whether the user ticked the WhatsApp marketing opt-in on the lead form.
   * Set ONLY by that checkbox — never by completing OTP verification. Stored
   * with the pending challenge so the funnel receives the value the user
   * actually saw when they ticked.
   */
  whatsappOptIn: boolean;
};

type OtpRecord = {
  code: string;
  expiresAt: number;
  attempts: number;
  payload: LeadPayload;
};

// ─── Backend selection ───────────────────────────────────────────
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

if (!redis && process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console.warn(
    '[otp-store] No Redis configured — OTP verification WILL FAIL across ' +
      'serverless instances. Set UPSTASH_REDIS_REST_URL and ' +
      'UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL / KV_REST_API_TOKEN).',
  );
}

// In-memory fallback for local single-process dev only. Anchored on globalThis
// so it survives Next.js dev-mode route recompilation.
const globalStore = globalThis as unknown as { __engageoOtpStore?: Map<string, OtpRecord> };
const memory = globalStore.__engageoOtpStore ?? new Map<string, OtpRecord>();
globalStore.__engageoOtpStore = memory;

function key(phone: string): string {
  return `otp:${phone}`;
}

async function readRecord(phone: string): Promise<OtpRecord | null> {
  if (redis) return (await redis.get<OtpRecord>(key(phone))) ?? null;
  return memory.get(phone) ?? null;
}

async function writeRecord(phone: string, record: OtpRecord, ttlS: number): Promise<void> {
  if (redis) {
    await redis.set(key(phone), record, { ex: Math.max(1, ttlS) });
  } else {
    memory.set(phone, record);
  }
}

async function deleteRecord(phone: string): Promise<void> {
  if (redis) await redis.del(key(phone));
  else memory.delete(phone);
}

export async function setOtp(phone: string, code: string, payload: LeadPayload): Promise<void> {
  await writeRecord(
    phone,
    { code, expiresAt: Date.now() + OTP_TTL_S * 1000, attempts: 0, payload },
    OTP_TTL_S,
  );
}

type VerifyResult =
  | { ok: true; payload: LeadPayload }
  | { ok: false; reason: 'not-found' | 'expired' | 'too-many-attempts' | 'wrong-code' };

export async function verifyOtp(phone: string, code: string): Promise<VerifyResult> {
  const record = await readRecord(phone);
  if (!record) return { ok: false, reason: 'not-found' };

  if (Date.now() > record.expiresAt) {
    await deleteRecord(phone);
    return { ok: false, reason: 'expired' };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    await deleteRecord(phone);
    return { ok: false, reason: 'too-many-attempts' };
  }

  if (record.code !== code) {
    const remainingTtlS = Math.ceil((record.expiresAt - Date.now()) / 1000);
    await writeRecord(phone, { ...record, attempts: record.attempts + 1 }, remainingTtlS);
    return { ok: false, reason: 'wrong-code' };
  }

  await deleteRecord(phone);
  return { ok: true, payload: record.payload };
}

/** Cryptographically-secure 6-digit code. */
export function generateOtp(): string {
  return String(randomInt(100000, 1000000));
}
