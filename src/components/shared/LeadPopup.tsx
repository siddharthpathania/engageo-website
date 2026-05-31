'use client';

import { Check, X } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';

const SESSION_KEY = 'engageo:lead-popup-shown';
const SHOW_DELAY_MS = 3000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FormState = {
  name: string;
  clinic: string;
  email: string;
  state: string;
  country: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL: FormState = {
  name: '',
  clinic: '',
  email: '',
  state: '',
  country: '',
};

function validate(v: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!v.name.trim() || v.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!v.clinic.trim() || v.clinic.trim().length < 2) errors.clinic = 'Please enter your clinic or hospital name.';
  if (!v.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_REGEX.test(v.email.trim())) errors.email = 'Enter a valid email.';
  if (!v.state.trim() || v.state.trim().length < 2) errors.state = 'Please enter your state.';
  if (!v.country.trim() || v.country.trim().length < 2) errors.country = 'Please enter your country.';
  return errors;
}

export function LeadPopup(): JSX.Element | null {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const firstFieldRef = useRef<HTMLInputElement>(null);

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

  function setField<K extends keyof FormState>(key: K, value: FormState[K]): void {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) setErrors(validate({ ...values, [key]: value }));
  }

  function handleBlur(key: keyof FormState): void {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      clinic: true,
      email: true,
      state: true,
      country: true,
    });
    if (Object.keys(nextErrors).length > 0) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
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

        {status === 'success' ? (
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
              Thanks — we&rsquo;ll be in touch.
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-subtle">
              Our team will reach out within 4 working hours to walk you through
              how Engageo recovers missed calls for clinics like yours.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-obsidian px-5 py-2.5 text-[13px] font-semibold text-surface transition hover:bg-obsidian/90"
            >
              Close
            </button>
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
              Leave your details and we&rsquo;ll send a short demo plus pricing
              for your clinic.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
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

              {status === 'error' ? (
                <div className="rounded-xl border border-error-200 bg-error-50 px-3 py-2 text-[12px] text-error-700">
                  Something went wrong. Try again, or email us directly.
                </div>
              ) : null}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={cn(
                  'inline-flex w-full items-center justify-center gap-2 rounded-full bg-obsidian px-6 py-3 text-[13px] font-semibold text-surface transition hover:bg-obsidian/90 disabled:cursor-not-allowed disabled:opacity-60',
                  status === 'submitting' && 'animate-pulse',
                )}
              >
                {status === 'submitting' ? 'Sending…' : 'Get the demo'}
              </button>

              <p className="text-center text-[11px] text-subtle">
                We reply within 4 working hours. Your details never leave Engageo.
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
  onChange: (value: string) => void;
  onBlur: () => void;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, name, type, value, error, autoComplete, placeholder, onChange, onBlur },
  ref,
) {
  const id = `lead-${name}`;
  const errorId = `${id}-error`;
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
        aria-describedby={error ? errorId : undefined}
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
      ) : null}
    </div>
  );
});
