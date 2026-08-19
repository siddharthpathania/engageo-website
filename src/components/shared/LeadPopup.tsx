'use client';

import { Check, RefreshCw, ShieldCheck, X } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState, type FormEvent } from 'react';
import { OtpInput } from '@/components/shared/OtpInput';
import { PhoneField } from '@/components/shared/PhoneField';
import { cn } from '@/lib/utils';

const SESSION_KEY = 'engageo:lead-popup-shown';
const SHOW_DELAY_MS = 3000;
const RESEND_COOLDOWN_S = 30;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+]?[\d\s\-()]{8,16}$/;

type FormState = {
  name: string;
  clinic: string;
  phone: string;
  email: string;
  state: string;
  country: string;
  // Marketing consent, separate from the verification message they consented to
  // by asking for a code. Defaults to false: a pre-ticked box is not consent
  // under the DPDP Act or Meta's policy, and Meta can penalise the number's
  // quality rating for it.
  whatsapp_opt_in: boolean;
};
type FormErrors = Partial<Record<keyof FormState, string>>;
type Step = 'details' | 'otp' | 'success';
type Status = 'idle' | 'submitting' | 'error';

const INITIAL: FormState = {
  name: '',
  clinic: '',
  phone: '',
  email: '',
  state: '',
  country: 'India',
  whatsapp_opt_in: false,
};

function normalisePhoneClient(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return digits;
  if (digits.length === 10) return `+91${digits}`;
  if (digits.startsWith('91') && digits.length === 12) return `+${digits}`;
  return digits.startsWith('0') ? `+91${digits.slice(1)}` : `+${digits}`;
}

function validate(v: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!v.name.trim() || v.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!v.clinic.trim() || v.clinic.trim().length < 2) errors.clinic = 'Please enter your clinic or hospital name.';
  if (!v.phone.trim()) errors.phone = 'Phone is required.';
  else if (!PHONE_REGEX.test(v.phone.trim())) errors.phone = 'Enter a valid phone number.';
  if (!v.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_REGEX.test(v.email.trim())) errors.email = 'Enter a valid email.';
  if (!v.state.trim() || v.state.trim().length < 2) errors.state = 'Please enter your state.';
  if (!v.country.trim() || v.country.trim().length < 2) errors.country = 'Please enter your country.';
  return errors;
}

export function LeadPopup(): JSX.Element | null {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('details');

  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [detailsStatus, setDetailsStatus] = useState<Status>('idle');
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const [normalisedPhone, setNormalisedPhone] = useState('');
  const [devOtp, setDevOtp] = useState<string | null>(null);

  const [code, setCode] = useState('');
  const [otpStatus, setOtpStatus] = useState<Status>('idle');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(RESEND_COOLDOWN_S);

  const firstFieldRef = useRef<HTMLInputElement>(null);
  const firstOtpBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === '1') return;
    } catch {
      // sessionStorage unavailable (privacy mode) — fall through and show once.
    }
    const timer = window.setTimeout(() => {
      setOpen(true);
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // ignore
      }
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus();
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (step !== 'otp') return;
    firstOtpBoxRef.current?.focus();
    const id = window.setInterval(() => {
      setResendIn((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [step]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]): void {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) setErrors(validate({ ...values, [key]: value }));
  }

  function handleBlur(key: keyof FormState): void {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(values));
  }

  async function submitDetails(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, clinic: true, phone: true, email: true, state: true, country: true });
    if (Object.keys(nextErrors).length > 0) return;
    setDetailsStatus('submitting');
    setDetailsError(null);
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        phone?: string;
        devOtp?: string;
        error?: string;
      };
      if (!res.ok || !body.ok) {
        setDetailsStatus('error');
        setDetailsError(body.error ?? 'Could not send the code. Try again.');
        return;
      }
      setNormalisedPhone(body.phone ?? normalisePhoneClient(values.phone));
      setDevOtp(body.devOtp ?? null);
      setCode('');
      setOtpStatus('idle');
      setOtpError(null);
      setResendIn(RESEND_COOLDOWN_S);
      setDetailsStatus('idle');
      setStep('otp');
    } catch {
      setDetailsStatus('error');
      setDetailsError('Network error. Check your connection and retry.');
    }
  }

  async function submitOtp(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setOtpError('Enter the 6-digit code from your WhatsApp.');
      return;
    }
    setOtpStatus('submitting');
    setOtpError(null);
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: normalisedPhone, code }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) {
        setOtpStatus('error');
        setOtpError(body.error ?? 'Verification failed. Try again.');
        return;
      }
      setStep('success');
    } catch {
      setOtpStatus('error');
      setOtpError('Network error. Check your connection and retry.');
    }
  }

  async function resendOtp(): Promise<void> {
    if (resendIn > 0) return;
    setOtpError(null);
    setCode('');
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        devOtp?: string;
        error?: string;
      };
      if (!res.ok || !body.ok) {
        setOtpError(body.error ?? 'Could not resend. Try again in a minute.');
        return;
      }
      setDevOtp(body.devOtp ?? null);
      setResendIn(RESEND_COOLDOWN_S);
    } catch {
      setOtpError('Network error. Check your connection and retry.');
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close popup"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm"
      />
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-neutral-200 bg-surface shadow-2xl">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-subtle transition hover:bg-neutral-100 hover:text-obsidian"
        >
          <X size={18} strokeWidth={2} aria-hidden="true" />
        </button>

        {step === 'success' ? (
          <div className="px-6 py-10 text-center md:px-8">
            <span
              aria-hidden="true"
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-500 text-surface"
            >
              <Check size={24} strokeWidth={2} aria-hidden="true" />
            </span>
            <h3
              id="lead-popup-title"
              className="mt-5 font-display text-xl font-semibold tracking-tight text-obsidian md:text-2xl"
            >
              You&rsquo;re verified — we&rsquo;ll be in touch.
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-subtle">
              Thanks for confirming your number. Our team will reach out within 4
              working hours to walk you through how Engageo recovers missed calls
              for clinics like yours.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-obsidian px-5 py-2.5 text-[13px] font-semibold text-surface transition hover:bg-obsidian/90"
            >
              Close
            </button>
          </div>
        ) : step === 'otp' ? (
          <div className="px-6 py-7 md:px-8 md:py-8">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
              >
                <ShieldCheck size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3
                id="lead-popup-title"
                className="font-display text-xl font-semibold tracking-tight text-obsidian md:text-2xl"
              >
                Enter the 6-digit code
              </h3>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-subtle md:text-[14px]">
              We sent a WhatsApp code to{' '}
              <strong className="text-obsidian">{normalisedPhone}</strong>. It
              expires in 5 minutes.{' '}
              <button
                type="button"
                onClick={() => setStep('details')}
                className="font-semibold text-primary-700 underline-offset-2 hover:underline"
              >
                Change number
              </button>
            </p>

            {devOtp ? (
              <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2.5 text-[12.5px] text-amber-900">
                <strong>Preview mode:</strong> WhatsApp isn&rsquo;t wired up yet, so
                here&rsquo;s your code:{' '}
                <span className="font-mono text-[14px] font-bold tracking-widest">{devOtp}</span>
              </div>
            ) : null}

            <form onSubmit={submitOtp} noValidate className="mt-5 space-y-4">
              <div>
                <span
                  id="lead-otp-label"
                  className="block text-[11px] font-semibold uppercase tracking-widest text-obsidian"
                >
                  Verification code
                </span>
                <OtpInput
                  firstBoxRef={firstOtpBoxRef}
                  value={code}
                  hasError={Boolean(otpError)}
                  labelledById="lead-otp-label"
                  describedById="lead-otp-error"
                  onChange={(next) => {
                    setOtpError(null);
                    setCode(next);
                  }}
                  onComplete={(filled) => {
                    setOtpError(null);
                    setCode(filled);
                  }}
                />
                {otpError ? (
                  <p id="lead-otp-error" className="mt-2 text-center text-[12px] font-medium text-error-600">
                    {otpError}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={otpStatus === 'submitting' || code.length !== 6}
                className={cn(
                  'inline-flex w-full items-center justify-center gap-2 rounded-full bg-obsidian px-6 py-3 text-[13px] font-semibold text-surface transition hover:bg-obsidian/90 disabled:cursor-not-allowed disabled:opacity-60',
                  otpStatus === 'submitting' && 'animate-pulse',
                )}
              >
                {otpStatus === 'submitting' ? 'Verifying…' : 'Verify my number'}
              </button>

              <div className="flex items-center justify-center gap-2 text-[12.5px] text-subtle">
                <RefreshCw size={12} strokeWidth={2} aria-hidden="true" />
                {resendIn > 0 ? (
                  <span>
                    Didn&rsquo;t receive it? Resend in <strong>{resendIn}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                  >
                    Resend code
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="px-6 py-7 md:px-8 md:py-8">
            <h3
              id="lead-popup-title"
              className="font-display text-xl font-semibold tracking-tight text-obsidian md:text-2xl"
            >
              See how Engageo answers every missed call
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-subtle md:text-[14px]">
              Leave your details and we&rsquo;ll verify your number on WhatsApp,
              then send a short demo plus pricing for your clinic.
            </p>

            <form onSubmit={submitDetails} noValidate className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  ref={firstFieldRef}
                  label="Name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  error={touched.name ? errors.name : undefined}
                  onChange={(v) => setField('name', v)}
                  onBlur={() => handleBlur('name')}
                  placeholder="Dr. Priya Krishnan"
                />
                <Field
                  label="Clinic / Hospital"
                  name="clinic"
                  type="text"
                  autoComplete="organization"
                  value={values.clinic}
                  error={touched.clinic ? errors.clinic : undefined}
                  onChange={(v) => setField('clinic', v)}
                  onBlur={() => handleBlur('clinic')}
                  placeholder="Krishnan Dermatology"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <PhoneField
                  label="Phone"
                  idPrefix="lead"
                  error={touched.phone ? errors.phone : undefined}
                  onChange={(v) => setField('phone', v)}
                  onBlur={() => handleBlur('phone')}
                  hint="We send the code to this number on WhatsApp."
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  error={touched.email ? errors.email : undefined}
                  onChange={(v) => setField('email', v)}
                  onBlur={() => handleBlur('email')}
                  placeholder="priya@clinic.com"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="State"
                  name="state"
                  type="text"
                  autoComplete="address-level1"
                  value={values.state}
                  error={touched.state ? errors.state : undefined}
                  onChange={(v) => setField('state', v)}
                  onBlur={() => handleBlur('state')}
                  placeholder="Karnataka"
                />
                <Field
                  label="Country"
                  name="country"
                  type="text"
                  autoComplete="country-name"
                  value={values.country}
                  error={touched.country ? errors.country : undefined}
                  onChange={(v) => setField('country', v)}
                  onBlur={() => handleBlur('country')}
                  placeholder="India"
                />
              </div>

              {detailsStatus === 'error' ? (
                <div className="rounded-xl border border-error-200 bg-error-50 px-3 py-2 text-[12px] text-error-700">
                  {detailsError ?? 'Something went wrong. Try again, or email us directly.'}
                </div>
              ) : null}

              <label className="flex cursor-pointer items-start gap-2.5 text-[12px] leading-snug text-subtle">
                <input
                  type="checkbox"
                  checked={values.whatsapp_opt_in}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, whatsapp_opt_in: e.target.checked }))
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-obsidian"
                />
                <span>
                  Send me clinic growth tips and Engageo updates on WhatsApp. You can
                  reply STOP at any time.
                </span>
              </label>

              <button
                type="submit"
                disabled={detailsStatus === 'submitting'}
                className={cn(
                  'inline-flex w-full items-center justify-center gap-2 rounded-full bg-obsidian px-6 py-3 text-[13px] font-semibold text-surface transition hover:bg-obsidian/90 disabled:cursor-not-allowed disabled:opacity-60',
                  detailsStatus === 'submitting' && 'animate-pulse',
                )}
              >
                {detailsStatus === 'submitting' ? 'Sending code…' : 'Send me a WhatsApp code'}
              </button>

              <p className="text-center text-[11px] text-subtle">
                By continuing you agree to receive a verification message on
                WhatsApp from Engageo. Your details never leave our system.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  error: string | undefined;
  autoComplete?: string;
  placeholder?: string;
  hint?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, name, type, value, error, autoComplete, placeholder, hint, onChange, onBlur },
  ref,
) {
  const id = `lead-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold uppercase tracking-widest text-obsidian"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        required
        aria-required="true"
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={cn(
          'mt-1.5 w-full rounded-xl border bg-surface px-3.5 py-2.5 text-[14px] text-obsidian placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary-500/30',
          error
            ? 'border-error-400 focus:border-error-500'
            : 'border-neutral-300 focus:border-primary-500',
        )}
      />
      {error ? (
        <p id={errorId} className="mt-1 text-[11px] font-medium text-error-600">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1 text-[11px] text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
