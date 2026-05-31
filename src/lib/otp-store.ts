/**
 * OTP storage with TTL. In-memory Map — fine for single-instance dev and
 * low-traffic prod. For high-traffic Vercel deployments, swap with
 * Upstash Redis (the read/write surface here mirrors what Redis would do).
 */

const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

type Record = {
  code: string;
  expiresAt: number;
  attempts: number;
  payload: LeadPayload;
};

export type LeadPayload = {
  name: string;
  clinic: string;
  email: string;
  phone: string;
  state: string;
  country: string;
};

// Survive Next.js dev-mode route recompilation by anchoring the Map on globalThis.
// In production, module evaluation happens once at build time so this is identical
// to a module-level `new Map()`. In dev, route handlers compile lazily and would
// otherwise each get their own Map.
const globalStore = globalThis as unknown as { __engageoOtpStore?: Map<string, Record> };
const store = globalStore.__engageoOtpStore ?? new Map<string, Record>();
globalStore.__engageoOtpStore = store;

export function setOtp(phone: string, code: string, payload: LeadPayload): void {
  store.set(phone, {
    code,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
    payload,
  });
}

type VerifyResult =
  | { ok: true; payload: LeadPayload }
  | { ok: false; reason: 'not-found' | 'expired' | 'too-many-attempts' | 'wrong-code' };

export function verifyOtp(phone: string, code: string): VerifyResult {
  const record = store.get(phone);
  if (!record) return { ok: false, reason: 'not-found' };

  if (Date.now() > record.expiresAt) {
    store.delete(phone);
    return { ok: false, reason: 'expired' };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    store.delete(phone);
    return { ok: false, reason: 'too-many-attempts' };
  }

  if (record.code !== code) {
    record.attempts += 1;
    return { ok: false, reason: 'wrong-code' };
  }

  store.delete(phone);
  return { ok: true, payload: record.payload };
}

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}
