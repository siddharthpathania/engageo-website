import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// Vercel deploys this project to bom1 (Mumbai) — see vercel.json "regions".
// That is the entire point of this route: reach Decentro from an INDIAN
// datacentre and see whether they answer.
export const runtime = "nodejs";

// ═══════════════════════════════════════════════════════════════════════════
// CAN AN INDIAN DATACENTRE REACH DECENTRO?  (temporary diagnostic)
//
// Decentro refuses our Railway server (Singapore) with a raw nginx
//     <html><head><title>403 Forbidden</title>…
// while the identical request from an Indian residential connection is
// accepted. Two explanations fit, and they lead to opposite decisions:
//
//   A. GEO — they only accept Indian IPs.
//      → routing through Mumbai fixes it. Worth building a proxy.
//   B. DATACENTRE — they refuse cloud/hosting ranges regardless of country.
//      → a Mumbai server is ALSO a datacentre. A proxy changes nothing and
//        building one wastes a day.
//
// This settles it before anything is built, which is the whole idea.
//
// NO CREDENTIALS ARE USED OR NEEDED. An empty POST is enough to tell the two
// apart, because the answers differ at different layers:
//     400  → the request REACHED Decentro's API and was validated (A: geo)
//     403 + HTML nginx page → blocked at their edge, never reached the API (B)
// Sending no secrets also means this route is safe to expose and safe to leave
// in a public marketing site until it is deleted.
//
// DELETE THIS ROUTE once the question is answered. It exists to make one
// decision, not to become part of the product.
// ═══════════════════════════════════════════════════════════════════════════

const TARGETS = [
  "https://staging.api.decentro.tech/v3/payments/upi/link",
  "https://api.decentro.tech/v3/payments/upi/link",
];

export async function GET() {
  const results = [];

  for (const url of TARGETS) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}", // deliberately empty — no credentials, no side effects
        cache: "no-store",
      });
      const text = (await res.text()).slice(0, 200);
      const blockedAtEdge = res.status === 403 && text.trimStart().startsWith("<");
      results.push({
        url,
        status: res.status,
        reached_api: !blockedAtEdge && res.status !== 403,
        verdict: blockedAtEdge
          ? "BLOCKED AT EDGE — datacentre IPs refused, a Mumbai proxy will NOT help"
          : "REACHED THE API — the block is geographic, a Mumbai proxy WILL help",
        body_starts: text,
      });
    } catch (err) {
      results.push({
        url,
        status: null,
        reached_api: false,
        verdict: "network error",
        body_starts: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // Report where this function actually ran, so a mis-set region is visible
  // rather than silently invalidating the whole test.
  let egressIp: string | null = null;
  try {
    const r = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
    egressIp = (await r.json())?.ip ?? null;
  } catch { /* non-fatal */ }

  return NextResponse.json(
    {
      ran_in_region: process.env.VERCEL_REGION ?? "(unknown — not on Vercel?)",
      egress_ip: egressIp,
      results,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
