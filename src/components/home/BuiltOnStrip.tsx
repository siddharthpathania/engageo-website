'use client';

import Image from 'next/image';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { type MouseEvent } from 'react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

/**
 * "Built on" strip — sits directly below the Hero and credits the
 * voice-AI provider (Sarvam) that powers Engageo's multilingual call layer.
 *
 * DIRECTION — "Live Voice Line": the co-brand card reads as a live call
 * line, not a static logo. A calm, center-weighted brand-blue equalizer
 * breathes perpetually beneath the wordmark (pure-CSS, already mid-cycle on
 * first paint), a single slow sonar ring pings the partnership "on" every
 * few seconds, a cursor-tracked spotlight lights the mark on hover, and a
 * small listening dot pulses below. Light + sound motifs move — the wordmark
 * itself never does. Premium, on-theme (Sarvam = voice AI / 12 languages),
 * and 60fps (transform/opacity only).
 *
 * This is a 'use client' file because the spotlight, sonar ring and the
 * reduced-motion guards rely on framer-motion hooks. The perpetual waveform
 * stays pure CSS (one shared @keyframes `voicePulse` in globals.css) so it
 * costs nothing on the main thread and is auto-frozen under
 * prefers-reduced-motion by the global kill-switch.
 *
 * Extensible: add Meta WhatsApp / AWS Mumbai by appending to PARTNERS — each
 * entry renders its own animated card.
 */

type Partner = {
  readonly id: string;
  readonly name: string;
  readonly href: string;
  /** Path under /public to a black wordmark SVG (stays on the light surface). */
  readonly wordmark: string;
  /** Native intrinsic size of the wordmark SVG. */
  readonly wordmarkWidth: number;
  readonly wordmarkHeight: number;
  /** Mono caption shown beneath the card. */
  readonly role: string;
};

const PARTNERS: readonly Partner[] = [
  {
    id: 'sarvam',
    name: 'Sarvam',
    href: 'https://www.sarvam.ai',
    wordmark: '/partners/sarvam-wordmark.svg',
    wordmarkWidth: 202,
    wordmarkHeight: 32,
    role: 'Voice AI partner',
  },
] as const;

export function BuiltOnStrip(): JSX.Element {
  return (
    <SectionWrapper id="built-on" ariaLabel="Built on" className="py-10 md:py-14">
      <div className="mx-auto grid max-w-5xl items-center gap-8 border-y border-neutral-200 py-10 md:grid-cols-[1.1fr_1fr] md:gap-12 md:py-12">
        {/* Copy */}
        <div className="text-center md:text-left">
          <span className="section-label justify-center md:justify-start">
            Built on
          </span>
          <h2 className="mt-4 font-display text-[22px] font-semibold leading-tight tracking-tight text-obsidian md:text-[26px] lg:text-[28px]">
            India&rsquo;s best voice AI,{' '}
            <span className="serif-hero">powering every call.</span>
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-subtle md:text-[14.5px]">
            The voice intelligence and speech-to-text that lets Engageo handle
            12 Indian languages in real time is powered by{' '}
            <a
              href="https://www.sarvam.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-obsidian underline decoration-primary-300 decoration-2 underline-offset-[3px] transition-colors hover:text-primary-700 hover:decoration-primary-500"
            >
              Sarvam
            </a>
            &nbsp;&mdash; India&rsquo;s foundation-model lab for Indic AI.
          </p>
        </div>

        {/* Partner card(s) — animated voice line. Append to PARTNERS to add more. */}
        <div className="flex flex-col items-center gap-3 md:items-end">
          {PARTNERS.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Voice equalizer — on-theme "this is the voice AI" motif.

   Center-weighted bell envelope (deterministic Math.sin → identical SSR/CSR
   markup, no hydration mismatch). Each bar consumes its own `--amp` CSS var so
   middle bars swell more than the edges — reads as a calm "someone is speaking"
   wave, not a club VU meter. Negative animation-delay means the row is already
   mid-cycle on first paint (no startup pop), and a small per-bar duration
   variance makes the wave appear to travel across the row.

   Perpetual breathing is pure CSS (transform: scaleY only, transform-origin
   center) so it runs on the compositor and is auto-frozen under
   prefers-reduced-motion by the global kill-switch in globals.css — leaving a
   tasteful static silhouette of the envelope rather than a flat row.
   ────────────────────────────────────────────────────────────────────────── */

const WAVE_BARS = 21;

/** Center-weighted amplitude envelope in 0..1 (tall middle, tapered edges). */
const waveEnvelope = (i: number): number =>
  0.35 + 0.65 * Math.sin((i / (WAVE_BARS - 1)) * Math.PI);

function VoiceEqualizer({ reduced }: { reduced: boolean }): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="force-gpu mask-fade-x pointer-events-none flex h-7 items-end justify-center gap-[3px]"
    >
      {Array.from({ length: WAVE_BARS }).map((_, i) => {
        const amp = waveEnvelope(i);
        return (
          <span
            key={i}
            className="w-[2px] rounded-full bg-gradient-to-t from-primary-500 to-primary-300"
            style={
              reduced
                ? {
                    // Static silhouette frozen at the envelope mid-height.
                    height: '100%',
                    transformOrigin: 'center',
                    transform: `scaleY(${(0.42 + 0.5 * amp).toFixed(3)})`,
                  }
                : {
                    height: '100%',
                    transformOrigin: 'center',
                    // Per-bar amplitude consumed by @keyframes voicePulse.
                    ['--amp' as string]: amp.toFixed(3),
                    // Negative delay → already mid-cycle on first paint.
                    animation: `voicePulse ${(1.1 + (i % 5) * 0.12).toFixed(2)}s var(--ease-in-out-soft) ${(-(i * 0.09)).toFixed(2)}s infinite`,
                  }
            }
          />
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Partner card — calm equalizer + slow sonar ring + cursor-tracked spotlight.

   - Spotlight: useMotionValue + useMotionTemplate, so cursor moves update a
     background-image directly with ZERO React re-renders (BuildUI pattern).
   - Sonar ring: a single framer element, one ring in flight at a time, so it
     reads as a slow heartbeat ("signal live"), never a busy radar.
   - The wordmark geometry is never animated — only light and sound around it.
   - Fully gated behind useReducedMotion with a composed static fallback.
   ────────────────────────────────────────────────────────────────────────── */

function PartnerCard({ partner }: { partner: Partner }): JSX.Element {
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);

  // Cursor-tracked spotlight — driven by motion values (no re-render per move).
  // Parked far off-card at rest so it never flashes before first hover.
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(61,90,254,0.14), rgba(232,85,42,0.04) 48%, transparent 74%)`;

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>): void => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };

  const handleMouseLeave = (): void => {
    if (reduced) return;
    mouseX.set(-400);
    mouseY.set(-400);
  };

  return (
    <div className="flex flex-col items-center gap-3 md:items-end">
      <a
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${partner.name} AI — opens in a new tab`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex w-full max-w-[280px] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-neutral-200 bg-surface px-8 py-7 shadow-subtle transition-[transform,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover md:px-10 md:py-8"
      >
        {/* Cursor-tracked spotlight — fades in only on hover. */}
        {!reduced && (
          <motion.span
            aria-hidden="true"
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* Static two-tone idle glow (also the reduced-motion accent). */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary-500/[0.04] via-transparent to-accent-400/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Sonar ring — one slow ping in flight, "the line is live". */}
        {!reduced && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <motion.span
              className="block h-20 w-20 rounded-full border border-primary-400/30"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [0.7, 1.9], opacity: [0.45, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: 'easeOut' }}
            />
          </span>
        )}

        {/* Wordmark (light surface keeps the black asset legible) + equalizer. */}
        <span className="relative z-10 flex flex-col items-center gap-3.5">
          <Image
            src={partner.wordmark}
            alt={partner.name}
            width={partner.wordmarkWidth}
            height={partner.wordmarkHeight}
            className={`h-auto w-[150px] transition-opacity duration-300 md:w-[170px] ${
              reduced ? 'opacity-90' : 'opacity-80 group-hover:opacity-100'
            }`}
            priority={false}
          />
          <div className="w-[150px] md:w-[170px]">
            <VoiceEqualizer reduced={reduced} />
          </div>
        </span>
      </a>

      {/* Mono caption + listening dot (reuses the Hero's live-dot idiom). */}
      <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle">
        <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
          {!reduced && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-60" />
          )}
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-500" />
        </span>
        {partner.role}
      </span>
    </div>
  );
}
