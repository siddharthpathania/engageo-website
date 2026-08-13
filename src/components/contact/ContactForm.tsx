'use client';

import { Check, ChevronRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';

type FormState = {
  name: string;
  email: string;
  phone: string;
  clinic: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL: FormState = {
  name: '',
  email: '',
  phone: '',
  clinic: '',
  message: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+]?[\d\s\-()]{8,16}$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.phone.trim()) {
    errors.phone = 'Phone is required — we may call to confirm.';
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.';
  }
  if (!values.clinic.trim() || values.clinic.trim().length < 2) {
    errors.clinic = 'Which clinic is this for?';
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'A few more words so we can help (10+ chars).';
  }
  return errors;
}

export function ContactForm(): JSX.Element {
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<SubmitState>('idle');

  function setField<K extends keyof FormState>(key: K, value: FormState[K]): void {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      setErrors(validate({ ...values, [key]: value }));
    }
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
      email: true,
      phone: true,
      clinic: true,
      message: true,
    });
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Request failed');
      }

      setStatus('success');
      setValues(INITIAL);
      setTouched({});
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-success-200 bg-success-50 p-8 text-center md:p-10">
        <span
          aria-hidden="true"
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-500 text-surface"
        >
          <Check size={24} strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-[22px] font-semibold tracking-tight text-obsidian md:text-2xl">
          Message received.
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-subtle md:text-[15px]">
          We reply within 4 working hours, Mon–Sat, 10:00–19:00 IST. Usually
          much faster. Check your inbox for a confirmation.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-obsidian underline-offset-4 hover:text-primary-600 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Full name"
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

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          error={touched.phone ? errors.phone : undefined}
          onChange={(v) => setField('phone', v)}
          onBlur={() => handleBlur('phone')}
          placeholder="+91 98765 43210"
        />
        <Field
          label="Clinic name"
          name="clinic"
          type="text"
          autoComplete="organization"
          value={values.clinic}
          error={touched.clinic ? errors.clinic : undefined}
          onChange={(v) => setField('clinic', v)}
          onBlur={() => handleBlur('clinic')}
          placeholder="Krishnan Dermatology, Bengaluru"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-[12px] font-semibold uppercase tracking-widest text-obsidian"
        >
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-required="true"
          value={values.message}
          onChange={(e) => setField('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          placeholder="A few words about your clinic size, current missed-call problem, and what you want to solve."
          aria-invalid={Boolean(touched.message && errors.message)}
          aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
          className={cn(
            'mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-[14px] leading-relaxed text-obsidian placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary-500/30',
            touched.message && errors.message
              ? 'border-error-400 focus:border-error-500'
              : 'border-neutral-300 focus:border-primary-500',
          )}
        />
        {touched.message && errors.message ? (
          <p id="message-error" className="mt-1.5 text-[12px] font-medium text-error-600">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === 'error' ? (
        <div className="rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-[13px] text-error-700">
          Something went wrong sending your message. Try again, or email us
          directly.
        </div>
      ) : null}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-subtle">
          We reply within 4 working hours. Your details never leave Engageo.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-full bg-obsidian px-6 py-3 text-[13px] font-semibold text-surface transition-all hover:bg-obsidian/90 disabled:cursor-not-allowed disabled:opacity-60',
            status === 'submitting' && 'animate-pulse',
          )}
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
          {status === 'submitting' ? null : (
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>
    </form>
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

function Field({
  label,
  name,
  type,
  value,
  error,
  autoComplete,
  placeholder,
  onChange,
  onBlur,
}: FieldProps): JSX.Element {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[12px] font-semibold uppercase tracking-widest text-obsidian"
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
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-[14px] text-obsidian placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary-500/30',
          error
            ? 'border-error-400 focus:border-error-500'
            : 'border-neutral-300 focus:border-primary-500',
        )}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-[12px] font-medium text-error-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
