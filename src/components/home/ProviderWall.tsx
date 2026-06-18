'use client';

import { useReducedMotion } from 'framer-motion';
import { PhoneForwarded } from 'lucide-react';

/**
 * Provider compatibility wall — two monochrome marquee rows scrolling in
 * opposite directions, crediting every Indian telephony stack Engageo works
 * with. Real brand marks (Airtel, Jio, Vi, Tata) are rendered as monochrome
 * silhouettes via CSS mask so they unify with the wordmark-only providers;
 * the whole wall is one ink, and each chip lifts + darkens on hover. The row
 * pauses while hovered. Under prefers-reduced-motion it degrades to a static
 * wrapped grid (no scroll).
 *
 * Pure CSS marquee (animate-marquee → @keyframes marquee, translateX 0→-50%)
 * so the perpetual scroll runs on the compositor. Chips use margin-right (not
 * flex gap) so the duplicated track loops seamlessly at exactly -50%.
 */

type Provider = {
  readonly name: string;
  readonly type: string;
  /** Path under /public to a monochrome (currentColor) brand mark, if one exists. */
  readonly logo?: string;
  /** Use a generic forwarding glyph instead of an initial (for the catch-all card). */
  readonly generic?: boolean;
};

const ROW_A: readonly Provider[] = [
  { name: 'Exotel', type: 'Cloud telephony' },
  { name: 'Knowlarity', type: 'Cloud telephony' },
  { name: 'Ozonetel', type: 'Cloud telephony' },
  { name: 'MyOperator', type: 'IVR + telephony' },
  { name: 'Airtel', type: 'Landline / mobile', logo: '/logos/providers/airtel.svg' },
  { name: 'Jio', type: 'Mobile / VoIP', logo: '/logos/providers/jio.svg' },
];

const ROW_B: readonly Provider[] = [
  { name: 'Vi (Vodafone Idea)', type: 'Mobile', logo: '/logos/providers/vi.svg' },
  { name: 'BSNL / MTNL', type: 'Landline' },
  { name: 'Tata Tele', type: 'Enterprise telephony', logo: '/logos/providers/tata-tele.svg' },
  { name: 'Twilio India', type: 'Programmable voice' },
  { name: 'Plivo', type: 'Programmable voice' },
  { name: 'Your existing setup', type: 'Any forwarding-capable line', generic: true },
];

const ALL_PROVIDERS: readonly Provider[] = [...ROW_A, ...ROW_B];

function ProviderGlyph({ provider }: { provider: Provider }): JSX.Element {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-obsidian/45 transition-colors duration-300 group-hover/chip:border-primary-200 group-hover/chip:text-obsidian">
      {provider.logo ? (
        <span
          aria-hidden="true"
          className="h-[18px] w-[18px] bg-current"
          style={{
            WebkitMaskImage: `url(${provider.logo})`,
            maskImage: `url(${provider.logo})`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
        />
      ) : provider.generic ? (
        <PhoneForwarded size={15} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <span className="font-display text-[13px] font-bold leading-none">
          {provider.name.charAt(0)}
        </span>
      )}
    </span>
  );
}

function ProviderChip({ provider }: { provider: Provider }): JSX.Element {
  return (
    <div className="group/chip mr-3 flex shrink-0 items-center gap-3 rounded-2xl border border-neutral-200 bg-surface px-4 py-2.5 shadow-subtle transition-[transform,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card-hover">
      <ProviderGlyph provider={provider} />
      <div className="text-left">
        <p className="font-display text-[13.5px] font-semibold leading-tight text-obsidian/70 transition-colors duration-300 group-hover/chip:text-obsidian">
          {provider.name}
        </p>
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-subtle">
          {provider.type}
        </p>
      </div>
    </div>
  );
}

function MarqueeRow({
  providers,
  reverse,
  durationSeconds,
}: {
  providers: readonly Provider[];
  reverse?: boolean;
  durationSeconds: number;
}): JSX.Element {
  return (
    <div className="group/row mask-fade-x relative overflow-hidden py-1">
      <div
        className="flex w-max animate-marquee group-hover/row:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animationDuration: `${durationSeconds}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {[...providers, ...providers].map((provider, i) => (
          <ProviderChip key={`${provider.name}-${i}`} provider={provider} />
        ))}
      </div>
    </div>
  );
}

export function ProviderWall(): JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    // Static, centered wrapped grid — no scroll, all chips visible at rest.
    return (
      <div className="mt-14 flex flex-wrap items-center justify-center gap-3 md:mt-18">
        {ALL_PROVIDERS.map((provider) => (
          <ProviderChip key={provider.name} provider={provider} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-14 flex flex-col gap-3 md:mt-18">
      <MarqueeRow providers={ROW_A} durationSeconds={40} />
      <MarqueeRow providers={ROW_B} durationSeconds={46} reverse />
    </div>
  );
}
