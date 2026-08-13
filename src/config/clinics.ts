/**
 * ─── Engageo — clinic directory ──────────────────────────────────
 * Maps each clinic's short login CODE to its dashboard URL.
 *
 * The website's /login page takes a code and redirects the clinic to its own
 * (siloed) dashboard, where the actual password login happens. The website is
 * just a signpost — no credentials live here.
 *
 * To onboard a clinic: add one line to CLINICS with its code + dashboard URL.
 * Codes are matched case-insensitively and trimmed.
 */

export type Clinic = {
  /** short login code the clinic types, e.g. "saishradha" */
  code: string;
  /** human name (not shown publicly — for our reference) */
  name: string;
  /** the clinic's own dashboard URL to redirect to */
  dashboardUrl: string;
};

export const CLINICS: readonly Clinic[] = [
  {
    code: 'saishradha',
    name: 'Sai Shradha Health Care Centre',
    dashboardUrl: 'https://admin.engageoagency.com',
  },
  // Add new clinics here as you onboard them, e.g.:
  // { code: 'clinicb', name: 'Clinic B', dashboardUrl: 'https://clinicb.admin.engageoagency.com' },
];

/** Resolve a typed clinic code to its clinic (case-insensitive, trimmed). */
export function resolveClinic(input: string): Clinic | null {
  const code = (input || '').trim().toLowerCase();
  if (!code) return null;
  return CLINICS.find((c) => c.code.toLowerCase() === code) ?? null;
}
