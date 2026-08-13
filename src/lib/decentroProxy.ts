// ═══════════════════════════════════════════════════════════════════════════
// THE DECENTRO BOUNDARY — and the reason it lives on THIS site.
//
// Decentro accepts API calls from Indian IPs only. Our dashboard runs on Railway
// in Singapore, so every call from it is refused at their edge with a raw nginx
// 403 before reaching the API. This project already deploys to bom1 (Mumbai) —
// see vercel.json "regions" — so it is the one piece of our infrastructure
// Decentro will talk to.
//
// TWO DELIBERATE CHOICES:
//
// 1. THE CREDENTIALS LIVE HERE, NOT IN THE CALLER. The dashboard asks for
//    "a link for ₹500, reference X" and never holds a Decentro secret. One
//    place to rotate, one place to leak from, and the dashboard's env stays
//    clean.
//
// 2. THIS IS NOT A GENERIC FORWARDER. It exposes exactly two operations —
//    create a link, read a status. A route that proxies an arbitrary URL, on a
//    public marketing site, is an open relay: anyone who finds it could mint
//    payment links against our merchant account. The allow-list IS the design.
//
// Every call must carry x-proxy-secret matching PAYMENTS_PROXY_SECRET. Without
// it the route refuses, because "only our dashboard knows the URL" is not
// access control.
// ═══════════════════════════════════════════════════════════════════════════

const BASES: Record<string, string> = {
  staging: "https://staging.api.decentro.tech",
  production: "https://api.decentro.tech",
};

function env(name: string): string {
  const v = process.env[name];
  return v == null ? "" : String(v).trim().replace(/^["']|["']$/g, "");
}

/** Constant-time-ish compare so the secret can't be probed by timing. */
export function authorized(header: string | null): boolean {
  const expected = env("PAYMENTS_PROXY_SECRET");
  // No secret configured means the route is OFF, never open. A missing env var
  // must fail closed — the alternative is a public payment-link generator.
  if (!expected) return false;
  const got = String(header ?? "");
  if (got.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= got.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

export function decentroCreds() {
  const pair = env("DECENTRO_PAIR") || "1";
  const idKey = pair === "2" ? "Decentro_Client_ID_2" : "Decentro_Client_ID_1";
  const secKey = pair === "2" ? "Decentro_Client_Secret_2" : "Decentro_Client_Secret";
  const client_id = env(idKey);
  const client_secret = env(secKey);
  const consumer_urn = env("Master_Consumer_URN");
  const missing: string[] = [];
  if (!client_id) missing.push(idKey);
  if (!client_secret) missing.push(secKey);
  if (!consumer_urn) missing.push("Master_Consumer_URN");
  if (missing.length) throw new Error(`Decentro env missing on the proxy: ${missing.join(", ")}`);
  return { client_id, client_secret, consumer_urn };
}

export function decentroBase(): string {
  const mode = (env("DECENTRO_ENV") || "staging").toLowerCase();
  const b = BASES[mode];
  // Refuse to guess: a typo'd value silently resolving to production is how
  // real money moves by accident.
  if (!b) throw new Error(`DECENTRO_ENV must be "staging" or "production", got "${mode}"`);
  return b;
}

export function decentroMode(): string {
  return (env("DECENTRO_ENV") || "staging").toLowerCase();
}
