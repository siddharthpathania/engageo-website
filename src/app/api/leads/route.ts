import { NextResponse, type NextRequest } from 'next/server';
import { getLeads } from '@/lib/lead-store';

/**
 * Protected export of every verified lead from the website's own store.
 *
 *   GET /api/leads?token=YOUR_SECRET            → JSON { count, leads }
 *   GET /api/leads?token=YOUR_SECRET&format=csv → downloadable CSV
 *
 * Set LEADS_EXPORT_TOKEN to a long random secret. The token can be passed as
 * the `token` query param or an `x-export-token` header. No token configured
 * → the endpoint is disabled (503), so leads can never be read anonymously.
 */
export const dynamic = 'force-dynamic';

const COLUMNS = [
  'verifiedAt',
  'name',
  'clinic',
  'phone',
  'email',
  'state',
  'country',
  'callSid',
  'source',
] as const;

function csvCell(value: unknown): string {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(request: NextRequest): Promise<Response> {
  const secret = process.env.LEADS_EXPORT_TOKEN;
  if (!secret) {
    return NextResponse.json(
      { error: 'Lead export is not configured. Set LEADS_EXPORT_TOKEN.' },
      { status: 503 },
    );
  }

  const provided =
    request.nextUrl.searchParams.get('token') || request.headers.get('x-export-token');
  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const leads = await getLeads();

  if (request.nextUrl.searchParams.get('format') === 'csv') {
    const lines = [
      COLUMNS.join(','),
      ...leads.map((lead) =>
        COLUMNS.map((col) => csvCell((lead as Record<string, unknown>)[col])).join(','),
      ),
    ];
    return new Response(lines.join('\n'), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="engageo-leads.csv"',
        'Cache-Control': 'no-store',
      },
    });
  }

  return NextResponse.json(
    { count: leads.length, leads },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
