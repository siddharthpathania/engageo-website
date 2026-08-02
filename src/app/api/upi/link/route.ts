import { NextRequest, NextResponse } from "next/server";
import { authorized, decentroCreds, decentroBase, decentroMode } from "@/lib/decentroProxy";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Create a UPI payment link, from Mumbai. See src/lib/decentroProxy.ts for why
// this lives on this site at all. Shared-secret guarded — never an open relay.
export async function POST(req: NextRequest) {
  if (!authorized(req.headers.get("x-proxy-secret"))) {
    // Deliberately terse: an attacker learns nothing about whether the secret
    // is unset, wrong, or the route even does anything useful.
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }

  const amount = Number(body?.amount);
  const purpose = String(body?.purpose ?? "").trim();
  const referenceId = String(body?.reference_id ?? "").trim();

  // Validate HERE too, not only in the caller. This route is reachable on its
  // own and must not depend on someone else having checked first.
  if (!Number.isFinite(amount) || amount < 5 || amount > 100000) {
    return NextResponse.json({ error: "amount must be between 5 and 100000 (Decentro's documented range)" }, { status: 400 });
  }
  if (purpose.length < 5 || purpose.length > 50) {
    return NextResponse.json({ error: "purpose must be 5-50 chars" }, { status: 400 });
  }
  if (referenceId.length < 5 || referenceId.length > 50) {
    return NextResponse.json({ error: "reference_id must be 5-50 chars" }, { status: 400 });
  }

  try {
    const c = decentroCreds();
    const res = await fetch(`${decentroBase()}/v3/payments/upi/link`, {
      method: "POST",
      headers: { "Content-Type": "application/json", client_id: c.client_id, client_secret: c.client_secret },
      body: JSON.stringify({
        reference_id: referenceId,
        consumer_urn: c.consumer_urn,
        amount,
        purpose_message: purpose,
        expiry_time: Math.min(Math.max(1, Math.round(Number(body?.expiry_minutes) || 1440)), 1440),
        generate_psp_uri: body?.psp !== false,
      }),
      cache: "no-store",
    });

    const text = await res.text();
    let json: any = null;
    try { json = JSON.parse(text); } catch { /* Decentro sent HTML */ }

    if (!res.ok || !json || json.api_status !== "SUCCESS") {
      // Pass Decentro's own words through, and use 422 rather than a 5xx —
      // a CDN in front of the CALLER will replace 5xx with its own HTML page
      // and the real reason never arrives. That cost three rounds of debugging.
      return NextResponse.json(
        { error: json ? (json.message || json.response_key) : text.slice(0, 300), upstream_status: res.status },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        decentro_txn_id: json.decentro_txn_id ?? null,
        upi_uris: json.data?.upi_uris ?? {},
        transaction_status: json.data?.transaction_status ?? null,
        mode: decentroMode(),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "proxy error" }, { status: 422 });
  }
}
