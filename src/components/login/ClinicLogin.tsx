'use client';

import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { resolveClinic } from '@/config/clinics';

export function ClinicLogin() {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clinic = resolveClinic(code);
    if (!clinic) {
      setError("We couldn't find a clinic with that code. Please check it and try again.");
      return;
    }
    setError(null);
    // Hand off to the clinic's own dashboard, where they log in.
    window.location.href = clinic.dashboardUrl;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="clinic-code"
          className="mb-1.5 block text-sm font-medium text-obsidian"
        >
          Clinic code
        </label>
        <input
          id="clinic-code"
          type="text"
          autoFocus
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (error) setError(null);
          }}
          placeholder="e.g. saishradha"
          aria-invalid={!!error}
          aria-describedby={error ? 'clinic-code-error' : undefined}
          className="w-full rounded-2xl border border-neutral-200 bg-surface px-4 py-3.5 text-[15px] text-obsidian outline-none transition focus:border-obsidian"
        />
        {error && (
          <p id="clinic-code-error" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-1.5 rounded-full bg-obsidian px-4 py-3.5 text-[15px] font-medium text-surface shadow-subtle transition hover:opacity-90"
      >
        Continue to dashboard
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </button>
    </form>
  );
}
