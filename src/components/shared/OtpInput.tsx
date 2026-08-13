'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

export type OtpInputProps = {
  value: string;
  hasError: boolean;
  firstBoxRef: React.RefObject<HTMLInputElement>;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
  /** id of the visible label for aria-labelledby. */
  labelledById?: string;
  /** id of the error message for aria-describedby (when hasError). */
  describedById?: string;
  length?: number;
};

/**
 * Accessible 6-box one-time-code input, shared by the experience form and the
 * lead popup. Supports paste, arrow keys, backspace-to-previous, and
 * autoComplete="one-time-code" on the first box.
 */
export function OtpInput({
  value,
  hasError,
  firstBoxRef,
  onChange,
  onComplete,
  labelledById,
  describedById,
  length = 6,
}: OtpInputProps): JSX.Element {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  function focusBox(index: number): void {
    const clamped = Math.max(0, Math.min(length - 1, index));
    refs.current[clamped]?.focus();
    refs.current[clamped]?.select();
  }

  function setDigit(index: number, raw: string): void {
    const digit = raw.replace(/\D/g, '').slice(-1);
    const next = digits.slice();
    next[index] = digit;
    const joined = next.join('').slice(0, length);
    onChange(joined);
    if (digit && index < length - 1) focusBox(index + 1);
    if (joined.length === length && !joined.includes('')) onComplete(joined);
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = digits.slice();
        next[index] = '';
        onChange(next.join(''));
      } else if (index > 0) {
        const next = digits.slice();
        next[index - 1] = '';
        onChange(next.join(''));
        focusBox(index - 1);
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      focusBox(index - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      focusBox(index + 1);
      e.preventDefault();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>): void {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted);
    if (pasted.length === length) {
      onComplete(pasted);
      focusBox(length - 1);
    } else {
      focusBox(pasted.length);
    }
  }

  return (
    <div
      role="group"
      aria-labelledby={labelledById}
      aria-describedby={hasError ? describedById : undefined}
      className="mt-2 flex justify-between gap-1.5 sm:gap-2.5"
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
            if (index === 0) {
              (firstBoxRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
            }
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          aria-label={`Digit ${index + 1} of ${length}`}
          value={digit}
          onChange={(e) => setDigit(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.currentTarget.select()}
          className={cn(
            'h-12 w-full rounded-xl border bg-surface text-center font-mono text-[20px] font-semibold text-obsidian transition focus:outline-none focus:ring-2 focus:ring-primary-500/30 sm:h-14 sm:text-[24px]',
            hasError
              ? 'border-error-400 focus:border-error-500'
              : digit
                ? 'border-primary-400 focus:border-primary-500'
                : 'border-neutral-300 focus:border-primary-500',
          )}
        />
      ))}
    </div>
  );
}
