'use client';

import { ArrowRight, Check, Phone, RefreshCw, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { OtpInput } from '@/components/shared/OtpInput';
import { PhoneField } from '@/components/shared/PhoneField';
import { cn } from '@/lib/utils';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+]?[\d\s\-()]{8,16}$/;
const RESEND_COOLDOWN_S = 30;

// Frontend-only mock for the OTP flow. When true, the form skips /api/otp/* and
// runs entirely in browser state — useful for previewing the UX before the
// WhatsApp Cloud API is wired up. Now false: the form calls the real OTP API,
// which delivers the code over WhatsApp (and returns a dev code locally when
// WhatsApp env vars aren't set).
const FRONTEND_ONLY_MOCK = false;

function generateMockOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function normalisePhoneClient(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return digits;
  if (digits.length === 10) return `+91${digits}`;
  if (digits.startsWith('91') && digits.length === 12) return `+${digits}`;
  return digits.startsWith('0') ? `+91${digits.slice(1)}` : `+${digits}`;
}

type Details = {
  name: string;
  clinic: string;
  phone: string;
  email: string;
  state: string;
  country: string;
};

type DetailsErrors = Partial<Record<keyof Details, string>>;

const INITIAL_DETAILS: Details = {
  name: '',
  clinic: '',
  phone: '',
  email: '',
  state: '',
  country: 'India',
};

function validateDetails(v: Details): DetailsErrors {
  const errors: DetailsErrors = {};
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

type Step = 'details' | 'otp' | 'done';
type Status = 'idle' | 'submitting' | 'error';

export function ExperienceForm(): JSX.Element {
  const [step, setStep] = useState<Step>('details');

  const [details, setDetails] = useState<Details>(INITIAL_DETAILS);
  const [detailsErrors, setDetailsErrors] = useState<DetailsErrors>({});
  const [detailsTouched, setDetailsTouched] = useState<Partial<Record<keyof Details, boolean>>>({});
  const [detailsStatus, setDetailsStatus] = useState<Status>('idle');
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const [normalisedPhone, setNormalisedPhone] = useState('');
  const [devOtp, setDevOtp] = useState<string | null>(null);

  const [code, setCode] = useState('');
  const [otpStatus, setOtpStatus] = useState<Status>('idle');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(RESEND_COOLDOWN_S);
  const firstOtpBoxRef = useRef<HTMLInputElement>(null);

  const [doneMessage, setDoneMessage] = useState<string>('');
  const [callQueued, setCallQueued] = useState(false);

  useEffect(() => {
    if (step !== 'otp') return;
    firstOtpBoxRef.current?.focus();
    const id = setInterval(() => {
      setResendIn((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [step]);

  function setDetailField<K extends keyof Details>(key: K, value: Details[K]): void {
    setDetails((prev) => ({ ...prev, [key]: value }));
    if (detailsTouched[key]) setDetailsErrors(validateDetails({ ...details, [key]: value }));
  }

  function handleDetailsBlur(key: keyof Details): void {
    setDetailsTouched((prev) => ({ ...prev, [key]: true }));
    setDetailsErrors(validateDetails(details));
  }

  async function submitDetails(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const errs = validateDetails(details);
    setDetailsErrors(errs);
    setDetailsTouched({
      name: true,
      clinic: true,
      phone: true,
      email: true,
      state: true,
      country: true,
    });
    if (Object.keys(errs).length > 0) return;
    setDetailsStatus('submitting');
    setDetailsError(null);

    if (FRONTEND_ONLY_MOCK) {
      // Simulate a network round-trip so the submitting state is visible.
      await new Promise((r) => setTimeout(r, 600));
      const mockCode = generateMockOtp();
      setNormalisedPhone(normalisePhoneClient(details.phone));
      setDevOtp(mockCode);
      setStep('otp');
      setOtpStatus('idle');
      setOtpError(null);
      setCode('');
      setResendIn(RESEND_COOLDOWN_S);
      setDetailsStatus('idle');
      return;
    }

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        phone?: string;
        devOtp?: string;
        error?: string;
      };
      if (!res.ok || !body.ok) {
        setDetailsStatus('error');
        setDetailsError(body.error ?? 'Could not send the OTP. Try again.');
        return;
      }
      setNormalisedPhone(body.phone ?? details.phone);
      setDevOtp(body.devOtp ?? null);
      setStep('otp');
      setOtpStatus('idle');
      setOtpError(null);
      setCode('');
      setResendIn(RESEND_COOLDOWN_S);
      setDetailsStatus('idle');
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

    if (FRONTEND_ONLY_MOCK) {
      await new Promise((r) => setTimeout(r, 500));
      if (code !== devOtp) {
        setOtpStatus('error');
        setOtpError('Incorrect code. Check the message and try again.');
        return;
      }
      setDoneMessage(
        "You're verified. Once we wire up the call backend, our AI receptionist will ring this number in under 30 seconds.",
      );
      setCallQueued(false);
      setStep('done');
      return;
    }

    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: normalisedPhone, code }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        callQueued?: boolean;
        message?: string;
        error?: string;
        reason?: string;
      };
      if (!res.ok || !body.ok) {
        setOtpStatus('error');
        setOtpError(body.error ?? 'Verification failed. Try again.');
        return;
      }
      setDoneMessage(body.message ?? "You're verified.");
      setCallQueued(Boolean(body.callQueued));
      setStep('done');
    } catch {
      setOtpStatus('error');
      setOtpError('Network error. Check your connection and retry.');
    }
  }

  async function resendOtp(): Promise<void> {
    if (resendIn > 0) return;
    setOtpError(null);
    setCode('');

    if (FRONTEND_ONLY_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      setDevOtp(generateMockOtp());
      setResendIn(RESEND_COOLDOWN_S);
      return;
    }

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
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

  if (step === 'done') {
    return (
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-success-200 bg-success-50 p-8 text-center md:p-10">
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-500 text-surface"
        >
          {callQueued ? (
            <Phone size={26} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Check size={26} strokeWidth={2} aria-hidden="true" />
          )}
        </span>
        <h2 className="mt-5 font-display text-[24px] font-semibold tracking-tight text-obsidian md:text-[28px]">
          {callQueued ? 'Your phone is ringing.' : "You're verified."}
        </h2>
        <p className="mt-3 text-[14.5px] leading-relaxed text-subtle md:text-[15.5px]">
          {doneMessage}
        </p>
        {callQueued ? (
          <p className="mt-5 text-[12.5px] leading-relaxed text-subtle">
            Pick up to hear our AI receptionist as a patient would. Speak naturally —
            ask about implant pricing, IVF consultation, or anything your clinic gets
            on a busy Monday morning. Hang up whenever you&rsquo;ve heard enough.
          </p>
        ) : null}
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-3xl border border-neutral-200 bg-surface p-7 md:p-10">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
            >
              <ShieldCheck size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-600">
                Step 2 of 2
              </p>
              <h2 className="font-display text-[22px] font-semibold tracking-tight text-obsidian md:text-[26px]">
                Enter the 6-digit code
              </h2>
            </div>
          </div>
          <p className="mt-4 text-[13.5px] leading-relaxed text-subtle md:text-[14.5px]">
            We sent a WhatsApp code to <strong className="text-obsidian">{normalisedPhone}</strong>.
            It expires in 5 minutes.{' '}
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
              <strong>Preview mode:</strong> WhatsApp isn&rsquo;t wired up yet, so we generated your code for you:{' '}
              <span className="font-mono text-[14px] font-bold tracking-widest">{devOtp}</span>
            </div>
          ) : null}

          <form onSubmit={submitOtp} noValidate className="mt-6 space-y-4">
            <div>
              <span
                id="otp-label"
                className="block text-[11px] font-semibold uppercase tracking-widest text-obsidian"
              >
                Verification code
              </span>
              <OtpInput
                firstBoxRef={firstOtpBoxRef}
                value={code}
                hasError={Boolean(otpError)}
                labelledById="otp-label"
                describedById="otp-error"
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
                <p id="otp-error" className="mt-2 text-center text-[12px] font-medium text-error-600">
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
              {otpStatus === 'submitting' ? 'Verifying…' : 'Verify and start demo'}
              {otpStatus === 'submitting' ? null : (
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              )}
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
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="rounded-3xl border border-neutral-200 bg-surface p-7 md:p-10">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
          >
            <Phone size={20} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-600">
              Step 1 of 2
            </p>
            <h2 className="font-display text-[22px] font-semibold tracking-tight text-obsidian md:text-[26px]">
              Your details
            </h2>
          </div>
        </div>
        <p className="mt-4 text-[13.5px] leading-relaxed text-subtle md:text-[14.5px]">
          We&rsquo;ll send a 6-digit code to your WhatsApp to verify your number, then our
          AI calls you back so you can experience the demo live.
        </p>

        <form onSubmit={submitDetails} noValidate className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailField
              label="Name"
              name="name"
              type="text"
              autoComplete="name"
              value={details.name}
              error={detailsTouched.name ? detailsErrors.name : undefined}
              onChange={(v) => setDetailField('name', v)}
              onBlur={() => handleDetailsBlur('name')}
              placeholder="Dr. Priya Krishnan"
            />
            <DetailField
              label="Clinic / Hospital"
              name="clinic"
              type="text"
              autoComplete="organization"
              value={details.clinic}
              error={detailsTouched.clinic ? detailsErrors.clinic : undefined}
              onChange={(v) => setDetailField('clinic', v)}
              onBlur={() => handleDetailsBlur('clinic')}
              placeholder="Krishnan Dermatology"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <PhoneField
              label="Phone"
              idPrefix="exp"
              error={detailsTouched.phone ? detailsErrors.phone : undefined}
              onChange={(v) => setDetailField('phone', v)}
              onBlur={() => handleDetailsBlur('phone')}
              hint="We send the code to this number on WhatsApp."
            />
            <DetailField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={details.email}
              error={detailsTouched.email ? detailsErrors.email : undefined}
              onChange={(v) => setDetailField('email', v)}
              onBlur={() => handleDetailsBlur('email')}
              placeholder="priya@clinic.com"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailField
              label="State"
              name="state"
              type="text"
              autoComplete="address-level1"
              value={details.state}
              error={detailsTouched.state ? detailsErrors.state : undefined}
              onChange={(v) => setDetailField('state', v)}
              onBlur={() => handleDetailsBlur('state')}
              placeholder="Karnataka"
            />
            <DetailField
              label="Country"
              name="country"
              type="text"
              autoComplete="country-name"
              value={details.country}
              error={detailsTouched.country ? detailsErrors.country : undefined}
              onChange={(v) => setDetailField('country', v)}
              onBlur={() => handleDetailsBlur('country')}
              placeholder="India"
            />
          </div>

          {detailsError ? (
            <div className="rounded-xl border border-error-200 bg-error-50 px-3 py-2 text-[12.5px] text-error-700">
              {detailsError}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={detailsStatus === 'submitting'}
            className={cn(
              'inline-flex w-full items-center justify-center gap-2 rounded-full bg-obsidian px-6 py-3 text-[13px] font-semibold text-surface transition hover:bg-obsidian/90 disabled:cursor-not-allowed disabled:opacity-60',
              detailsStatus === 'submitting' && 'animate-pulse',
            )}
          >
            {detailsStatus === 'submitting' ? 'Sending OTP…' : 'Send me an OTP'}
            {detailsStatus === 'submitting' ? null : (
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            )}
          </button>

          <p className="text-center text-[11px] text-subtle">
            By continuing you agree to receive a verification message on WhatsApp and a
            demo call from Engageo. Your details never leave our system.
          </p>
        </form>
      </div>
    </div>
  );
}

type DetailFieldProps = {
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

function DetailField({
  label,
  name,
  type,
  value,
  error,
  autoComplete,
  placeholder,
  hint,
  onChange,
  onBlur,
}: DetailFieldProps): JSX.Element {
  const id = `exp-${name}`;
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
}
