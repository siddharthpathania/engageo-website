/**
 * Durable lead store — the website's own system of record for verified leads.
 *
 * Every OTP-verified lead is written here (awaited) BEFORE any external delivery
 * (email / Google Sheet / Funnel Agent). Those external writes are best-effort
 * and can be dropped when a Vercel function freezes on return; this store cannot,
 * because the write is awaited inside the request. So no lead is ever lost, and
 * the full list can always be pulled back from the site itself — no third-party
 * service or connector required.
 *
 * Backed by the same Upstash Redis this app already uses for OTP (see
 * otp-store.ts). Falls back to an in-memory list for local single-process dev.
 */
import { Redis } from '@upstash/redis';
import type { LeadPayload } from './otp-store';

const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

/** Redis list holding one JSON-encoded lead per element, oldest first. */
const LEADS_KEY = 'engageo:leads';

export type StoredLead = LeadPayload & {
  /** Exotel call SID, if a demo call was placed. */
  callSid: string;
  source: string;
  /** ISO-8601 timestamp of verification. */
  verifiedAt: string;
};

// In-memory fallback for local single-process dev only. Anchored on globalThis
// so it survives Next.js dev-mode route recompilation.
const globalStore = globalThis as unknown as { __engageoLeads?: StoredLead[] };
const memory = globalStore.__engageoLeads ?? [];
globalStore.__engageoLeads = memory;

/** Append a verified lead. Awaited by the caller so it cannot be lost. */
export async function saveLead(lead: StoredLead): Promise<void> {
  if (redis) {
    await redis.rpush(LEADS_KEY, JSON.stringify(lead));
  } else {
    memory.push(lead);
  }
}

/** Read every stored lead, oldest first. */
export async function getLeads(): Promise<StoredLead[]> {
  if (!redis) return [...memory];
  const raw = (await redis.lrange(LEADS_KEY, 0, -1)) as unknown[];
  // Upstash may return elements already JSON-parsed, or as raw strings —
  // handle both so a client-version change can't corrupt the export.
  return raw.map((r) => (typeof r === 'string' ? (JSON.parse(r) as StoredLead) : (r as StoredLead)));
}

/** Total number of stored leads. */
export async function countLeads(): Promise<number> {
  if (!redis) return memory.length;
  return redis.llen(LEADS_KEY);
}
