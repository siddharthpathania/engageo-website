'use client';

import { useState } from 'react';
import { COUNTRIES, dialFor, flagEmoji } from '@/lib/countries';
import { cn } from '@/lib/utils';

type PhoneFieldProps = {
  label: string;
  /** id prefix so multiple instances (form + popup) don't collide. */
  idPrefix: string;
  error?: string;
  hint?: string;
  /** Emits the combined value, e.g. "+919876543210", or "" when empty. */
  onChange: (value: string) => void;
  onBlur?: () => void;
  /** Default selected country (ISO-3166 alpha-2). */
  defaultIso?: string;
};

/**
 * International phone input: a scrollable country picker (flag + dial code)
 * plus a local-number field. The user never types the country code — the
 * component combines the selected dial code with the digits and emits E.164.
 */
export function PhoneField({
  label,
  idPrefix,
  error,
  hint,
  onChange,
  onBlur,
  defaultIso = 'IN',
}: PhoneFieldProps): JSX.Element {
  const [iso, setIso] = useState(defaultIso);
  const [number, setNumber] = useState('');

  const inputId = `${idPrefix}-phone`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  function emit(nextIso: string, nextNumber: string): void {
    const digits = nextNumber.replace(/\D/g, '');
    onChange(digits ? `${dialFor(nextIso)}${digits}` : '');
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-[11px] font-semibold uppercase tracking-widest text-obsidian"
      >
        {label}
      </label>

      <div
        className={cn(
          'mt-1.5 flex items-stretch overflow-hidden rounded-xl border bg-surface transition focus-within:ring-2 focus-within:ring-primary-500/30',
          error ? 'border-error-400 focus-within:border-error-500' : 'border-neutral-300 focus-within:border-primary-500',
        )}
      >
        <select
          aria-label="Country code"
          value={iso}
          onChange={(e) => {
            setIso(e.target.value);
            emit(e.target.value, number);
          }}
          onBlur={onBlur}
          className="max-w-[8.5rem] shrink-0 cursor-pointer border-r border-neutral-200 bg-surface px-2.5 py-2.5 text-[14px] text-obsidian focus:outline-none"
        >
          {COUNTRIES.map((c) => (
            <option key={c.iso2} value={c.iso2}>
              {flagEmoji(c.iso2)}  {c.dial}  {c.name}
            </option>
          ))}
        </select>

        <input
          id={inputId}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={number}
          required
          aria-required="true"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          onChange={(e) => {
            setNumber(e.target.value);
            emit(iso, e.target.value);
          }}
          onBlur={onBlur}
          placeholder="98765 43210"
          className="w-full bg-surface px-3.5 py-2.5 text-[14px] text-obsidian placeholder:text-subtle focus:outline-none"
        />
      </div>

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
