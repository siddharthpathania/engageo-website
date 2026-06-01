/**
 * ─── Engageo — legal document config ─────────────────────────────
 * SINGLE SOURCE OF TRUTH for facts shared across the Privacy Policy,
 * Terms of Service, and Security pages. Edit a value here once and it
 * updates on all three pages.
 *
 * DRAFT — values marked `TODO:` (and empty arrays) are facts only Engageo
 * can supply. They render on-page as a visible [PLACEHOLDER: …] marker until
 * filled. Do NOT invent vendor names, a grievance officer, or retention
 * numbers — replace each TODO with the confirmed value.
 *
 * `company.legalName` and `company.address` are composed from the existing
 * site constants (src/lib/constants.ts) so the registered address still has
 * exactly one home.
 * ────────────────────────────────────────────────────────────────
 */
import { COMPANY, CONTACT } from '@/lib/constants';

export type LegalConfig = {
  /** Human-readable last-updated date shown on every legal page. */
  lastUpdated: string;
  company: {
    legalName: string;
    /** One-line registered address. */
    address: string;
    /** Internal contact route (relative path). */
    contactUrl: string;
  };
  /** DPDP Act 2023 grievance officer. */
  grievanceOfficer: {
    name: string;
    email: string;
  };
  /** Third-party providers data flows through. */
  subProcessors: {
    messaging: string;
    calendar: string;
    /** Voice / LLM / STT-TTS vendors. Empty until confirmed. */
    voiceAi: string[];
    /** Hosting / database / analytics providers. Empty until confirmed. */
    hosting: string[];
  };
  /** Data-retention periods. */
  retention: {
    callAudio: string;
    transcripts: string;
    general: string;
  };
};

export const LEGAL: LegalConfig = {
  // Update whenever any of the three documents materially changes.
  lastUpdated: '2 June 2026',

  company: {
    legalName: COMPANY.legalName,
    address: `${CONTACT.address.line2}, ${CONTACT.address.city}, ${CONTACT.address.state} ${CONTACT.address.postalCode}, India`,
    contactUrl: '/contact',
  },

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
};

/** True when a config string is an unfilled `TODO:` value. */
export function isTodo(value: string): boolean {
  return !value || value.trimStart().toUpperCase().startsWith('TODO');
}
