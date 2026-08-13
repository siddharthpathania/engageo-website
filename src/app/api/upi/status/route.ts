import { NextRequest, NextResponse } from "next/server";
import { authorized, decentroCreds, decentroBase } from "@/lib/decentroProxy";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Read a transaction's real state, from Mumbai. This is the AUTHORITY the
// payment callback consults before marking anything paid — so it has to work
// from a blocked region too, not just link creation.
export async function GET(req: NextRequest) {
  if (!authorized(req.headers.get("x-proxy-secret"))) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const referenceId = req.nextUrl.searchParams.get("reference_id");
  if (!referenceId) return NextResponse.json({ error: "reference_id required" }, { status: 400 });

  try {
    const c = decentroCreds();
    const res = await fetch(
      `${decentroBase()}/v3/payments/transaction/status?reference_id=${encodeURIComponent(referenceId)}`,
      { headers: { client_id: c.client_id, client_secret: c.client_secret }, cache: "no-store" }
    );
    const text = await res.text();
    let json: any = null;
    try { json = JSON.parse(text); } catch { /* HTML */ }
    return NextResponse.json(
      { ok: res.ok && json?.api_status === "SUCCESS", upstream_status: res.status, data: json ?? text.slice(0, 300) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "proxy error" }, { status: 422 });
  }
}
