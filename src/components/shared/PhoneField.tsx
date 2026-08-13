'use client';

import { Check, ChevronDown, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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

type Rect = { top: number; left: number; width: number };

/**
 * International phone input: a compact country trigger (flag + dial code) that
 * opens a searchable dropdown, plus a local-number field. The user never types
 * the country code — the component combines the selected dial code with the
 * digits and emits E.164. The dropdown is portalled to <body> and positioned
 * with fixed coords so it's never clipped by a scrollable modal.
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
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [rect, setRect] = useState<Rect | null>(null);

  const boxRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const inputId = `${idPrefix}-phone`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  // COUNTRIES is a non-empty constant, so [0] (India) is a safe fallback.
  const selected = COUNTRIES.find((c) => c.iso2 === iso) ?? COUNTRIES[0]!;

  function emit(nextIso: string, nextNumber: string): void {
    const digits = nextNumber.replace(/\D/g, '');
    onChange(digits ? `${dialFor(nextIso)}${digits}` : '');
  }

  function openMenu(): void {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setRect({ top: r.bottom + 6, left: r.left, width: r.width });
    setQuery('');
    setOpen(true);
  }

  function choose(nextIso: string): void {
    setIso(nextIso);
    emit(nextIso, number);
    setOpen(false);
    onBlur?.();
  }

  // Close on outside click, Escape, scroll, or resize (fixed positioning goes
  // stale on scroll, so closing is the clean behaviour).
  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    function onDown(e: MouseEvent): void {
      const t = e.target as Node;
      if (boxRef.current?.contains(t)) return;
      if ((t as HTMLElement).closest?.('[data-phone-menu]')) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') setOpen(false);
    }
    function onReflow(): void {
      setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onReflow, true);
    window.addEventListener('resize', onReflow);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onReflow, true);
      window.removeEventListener('resize', onReflow);
    };
  }, [open]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? COUNTRIES.filter(
        (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q.replace(/[^\d+]/g, '')),
      )
    : COUNTRIES;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-[11px] font-semibold uppercase tracking-widest text-obsidian"
      >
        {label}
      </label>

      <div
        ref={boxRef}
        className={cn(
          'mt-1.5 flex items-stretch rounded-xl border bg-surface transition focus-within:ring-2 focus-within:ring-primary-500/30',
          error
            ? 'border-error-400 focus-within:border-error-500'
            : 'border-neutral-300 focus-within:border-primary-500',
        )}
      >
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country code: ${selected.name} ${selected.dial}`}
          onClick={() => (open ? setOpen(false) : openMenu())}
          className="flex shrink-0 items-center gap-1.5 rounded-l-xl px-3 py-2.5 text-[14px] text-obsidian transition-colors hover:bg-neutral-50 focus:outline-none"
        >
          <span className="text-[16px] leading-none" aria-hidden="true">
            {flagEmoji(selected.iso2)}
          </span>
          <span className="font-medium tabular-nums">{selected.dial}</span>
          <ChevronDown
            size={14}
            strokeWidth={2}
            aria-hidden="true"
            className={cn('text-subtle transition-transform', open && 'rotate-180')}
          />
        </button>

        <span aria-hidden="true" className="my-2 w-px shrink-0 bg-neutral-200" />

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
          className="w-full rounded-r-xl bg-transparent px-3.5 py-2.5 text-[14px] text-obsidian placeholder:text-subtle focus:outline-none"
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

      {open && rect
        ? createPortal(
            <div
              data-phone-menu
              style={{ position: 'fixed', top: rect.top, left: rect.left, width: Math.max(rect.width, 264) }}
              className="z-[200] overflow-hidden rounded-xl border border-neutral-200 bg-surface shadow-2xl"
            >
              <div className="flex items-center gap-2 border-b border-neutral-200 px-3 py-2">
                <Search size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-subtle" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search country or code"
                  className="w-full bg-transparent text-[13px] text-obsidian placeholder:text-subtle focus:outline-none"
                />
              </div>
              <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
                {filtered.map((c) => {
                  const isSel = c.iso2 === iso;
                  return (
                    <li key={c.iso2}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isSel}
                        onClick={() => choose(c.iso2)}
                        className={cn(
                          'flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13.5px] transition-colors hover:bg-primary-50',
                          isSel ? 'bg-primary-50/60 text-primary-700' : 'text-obsidian',
                        )}
                      >
                        <span className="text-[16px] leading-none" aria-hidden="true">
                          {flagEmoji(c.iso2)}
                        </span>
                        <span className="flex-1 truncate">{c.name}</span>
                        <span className="tabular-nums text-subtle">{c.dial}</span>
                        {isSel ? (
                          <Check size={14} strokeWidth={2.5} aria-hidden="true" className="shrink-0 text-primary-600" />
                        ) : null}
                      </button>
                    </li>
                  );
                })}
                {filtered.length === 0 ? (
                  <li className="px-3 py-4 text-center text-[12.5px] text-subtle">No match.</li>
                ) : null}
              </ul>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
