/**
 * ─── Engageo — legal document config ─────────────────────────────
 * SINGLE SOURCE OF TRUTH for facts shared across the Privacy Policy,
 * Terms of Service, and Security pages. Edit a value here once and it
 * updates on all three pages.
 *
 * Each fillable field is one of two kinds:
 *
 *   REQUIRED — facts only Engageo can supply and that MUST be filled before
 *   publish. While empty, the public page shows a visible [PLACEHOLDER: …]
 *   marker (so it can't ship unnoticed) and a dev-time console warning lists
 *   it. See `getUnfilledRequiredFields()`.
 *
 *   FALLBACK — values a lawyer will tighten later, but where neutral prose
 *   reads fine in the meantime. While empty, the page renders that neutral
 *   prose with NO visible marker. All `terms.*` fields are FALLBACK.
 *
 * Do NOT invent vendor names, a grievance officer, or retention numbers —
 * replace each REQUIRED value with the confirmed fact.
 *
 * `company.legalName` is sourced from the site constants so it has one home.
 * The registered street address is intentionally NOT stored or rendered here.
 * ────────────────────────────────────────────────────────────────
 */
import { COMPANY } from '@/lib/constants';

export type LegalConfig = {
  /** Human-readable last-updated date shown on every legal page. */
  lastUpdated: string;
  company: {
    legalName: string;
    /** Internal contact route (relative path). */
    contactUrl: string;
  };
  /** DPDP Act 2023 grievance officer. REQUIRED. */
  grievanceOfficer: {
    name: string;
    email: string;
  };
  /** Third-party providers data flows through. */
  subProcessors: {
    messaging: string;
    calendar: string;
    /** Voice / LLM / STT-TTS vendors. REQUIRED — empty until confirmed. */
    voiceAi: string[];
    /** Hosting / database / analytics providers. REQUIRED — empty until confirmed. */
    hosting: string[];
  };
  /** Data-retention periods. REQUIRED. */
  retention: {
    callAudio: string;
    transcripts: string;
    general: string;
  };
  /**
   * Commercial terms. All FALLBACK — a lawyer will set these; until then each
   * renders neutral prose (see the per-field fallback in the Terms page).
   */
  terms: {
    feeTerms: string;
    curePeriod: string;
    exportWindow: string;
    /** Uptime / support commitment. Empty → the SLA sentence is omitted. */
    sla: string;
    liabilityCap: string;
    indemnityScope: string;
    jurisdiction: string;
    dpa: string;
  };
};

export const LEGAL: LegalConfig = {
  // Update whenever any of the three documents materially changes.
  lastUpdated: '14 August 2026',

  company: {
    legalName: COMPANY.legalName,
    contactUrl: '/contact',
  },

  // ─── REQUIRED ──────────────────────────────────────────────────
  grievanceOfficer: {
    name: 'TODO: grievance officer name',
    email: 'TODO: grievance officer email',
  },

  subProcessors: {
    messaging: 'Meta / WhatsApp Business API',
    calendar: 'Google Calendar',
    voiceAi: [], // TODO: voice / LLM / speech-to-text / text-to-speech vendors
    hosting: [], // TODO: cloud hosting / database / analytics providers
  },

  retention: {
    callAudio: 'TODO: call-audio retention period',
    transcripts: 'TODO: transcript retention period',
    general: 'TODO: general data retention period',
  },

  // ─── FALLBACK (neutral prose renders until counsel fills these) ──
  terms: {
    feeTerms: '',
    curePeriod: '',
    exportWindow: '',
    sla: '',
    liabilityCap: '',
    indemnityScope: '',
    jurisdiction: '',
    dpa: '',
  },
};

/** True when a config string is unfilled (empty or a `TODO:` value). */
export function isTodo(value: string): boolean {
  return !value || value.trimStart().toUpperCase().startsWith('TODO');
}

/**
 * REQUIRED fields that must be filled before publishing. Returns the dotted
 * paths still unfilled — drives both the visible page markers and the dev
 * completeness warning below.
 */
export function getUnfilledRequiredFields(): string[] {
  const missing: string[] = [];
  if (isTodo(LEGAL.grievanceOfficer.name)) missing.push('grievanceOfficer.name');
  if (isTodo(LEGAL.grievanceOfficer.email)) missing.push('grievanceOfficer.email');
  if (LEGAL.subProcessors.voiceAi.length === 0) missing.push('subProcessors.voiceAi');
  if (LEGAL.subProcessors.hosting.length === 0) missing.push('subProcessors.hosting');
  if (isTodo(LEGAL.retention.callAudio)) missing.push('retention.callAudio');
  if (isTodo(LEGAL.retention.transcripts)) missing.push('retention.transcripts');
  if (isTodo(LEGAL.retention.general)) missing.push('retention.general');
  return missing;
}

// Dev-only completeness check. Runs server-side when the config is first
// imported (dev server + non-production builds); silent in production.
if (process.env.NODE_ENV !== 'production') {
  const missing = getUnfilledRequiredFields();
  if (missing.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      `\n[legal config] ${missing.length} REQUIRED field(s) must be filled in ` +
        `src/config/legal.ts before publishing:\n` +
        missing.map((f) => `  • ${f}`).join('\n') +
        '\n',
    );
  }
}
