/**
 * Identity helpers shared by every CAPI/attribution touch point.
 *
 * Single source of truth for phone normalisation, SHA-256 hashing, and the
 * `external_id` that stitches Lead → CompleteRegistration → DemoCompleted →
 * Schedule together for Meta. If two call sites compute these differently the
 * cross-event match silently fails — keep this file as the only place these
 * functions exist.
 */

import { createHash } from 'crypto';

/**
 * Normalise an Indian phone number to the no-`+` E.164 form Meta wants:
 * "919876543210". Returns `null` if the input cannot be coerced to a valid
 * Indian mobile (mobile digit must be 6–9 — landlines/garbage rejected).
 *
 * Examples:
 *   "9876543210"          → "919876543210"
 *   "+91 98765 43210"     → "919876543210"
 *   "09876543210"         → "919876543210"
 *   "00919876543210"      → "919876543210"
 *   "919876543210"        → "919876543210"
 *   "1234567890"          → null  (digit after country code is not 6–9)
 */
export function normalisePhoneE164(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');

  if (digits.startsWith('00')) digits = digits.slice(2);

  if (digits.length === 10) {
    digits = `91${digits}`;
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = `91${digits.slice(1)}`;
  } else if (digits.length === 12 && digits.startsWith('91')) {
    // already correct
  } else {
    return null;
  }

  // Indian mobile numbers begin with 6, 7, 8, or 9 after the country code.
  const mobileLeadingDigit = digits[2];
  if (!mobileLeadingDigit || !/[6-9]/.test(mobileLeadingDigit)) return null;

  return digits;
}

/** Convenience: same as normalisePhoneE164 but prepended with `+` for SMS/voice APIs. */
export function phoneForExotel(raw: string): string | null {
  const normalised = normalisePhoneE164(raw);
  return normalised ? `+${normalised}` : null;
}

/**
 * Hash a string with SHA-256 after Meta's normalisation rules: lowercase + trim.
 * Returns lowercase hex (Meta accepts hex; documentation also allows the
 * underlying bytes but hex is the recommended wire format).
 */
export function hashSha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

/**
 * Derive the cross-event `external_id` from a phone number. Returns `null` if
 * the phone can't be normalised — caller decides whether to reject the
 * request or proceed without attribution.
 */
export function externalIdFor(rawPhone: string): string | null {
  const normalised = normalisePhoneE164(rawPhone);
  if (!normalised) return null;
  return hashSha256(normalised);
}
