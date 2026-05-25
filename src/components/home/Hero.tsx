'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { CTA } from '@/lib/constants';

/* ──────────────────────────────────────────────────────────────
   Ledger data — 3 phases of the recovery story
   ────────────────────────────────────────────────────────────── */

type Call = {
  id: number;
  time: string;
  name: string;
  procedure: string;
  value: number;
  secs?: number;
  action?: string;
};

const BLEED_CALLS: readonly Call[] = [
  { id: 1, time: '09:12', name: 'Priya S.',  procedure: 'Dental Implant',    value: 28000 },
  { id: 2, time: '10:34', name: 'Rahul K.',  procedure: 'IVF Consultation',  value: 85000 },
  { id: 3, time: '11:07', name: 'Anjali M.', procedure: 'Laser Vision',      value: 22000 },
];

const RECOVERY_CALLS: readonly Call[] = [
  { id: 4, time: '12:45', name: 'Vikram D.', procedure: 'Rhinoplasty',       value: 120000, secs: 6 },
  { id: 5, time: '14:18', name: 'Sonal R.',  procedure: 'Mouth Rehab',       value: 65000,  secs: 8 },
  { id: 6, time: '15:44', name: 'Meera T.',  procedure: 'IVF Consultation',  value: 85000,  secs: 7 },
];

const WHATSAPP_EVENTS: readonly Call[] = [
  { id: 7, time: '12:46', name: 'Vikram D.', procedure: 'Booking Confirmed', value: 0, action: 'SENT' },
  { id: 8, time: '14:19', name: 'Sonal R.',  procedure: 'Booking Confirmed', value: 0, action: 'SENT' },
  { id: 9, time: '15:45', name: 'Meera T.',  procedure: 'Booking Confirmed', value: 0, action: 'SENT' },
];

type Phase = 1 | 2 | 3;

/* ──────────────────────────────────────────────────────────────
   Typewriter — types, pauses, deletes, repeats
   ────────────────────────────────────────────────────────────── */

const HERO_WORDS: readonly string[] = [
  '\u20B93L every month.',
  '70% of missed calls.',
  'patients to rivals.',
] as const;

// Longest phrase — drives phantom spacer height/width
const LONGEST_WORD = '70% of missed calls.';

type TypePhase = 'typing' | 'pause' | 'deleting';

function TypewriterText({ words }: { words: readonly string[] }): JSX.Element {
  const [text, setText] = useState(words[0] ?? '');
  const [phase, setPhase] = useState<TypePhase>('pause');
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIdx % words.length] ?? '';
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (text.length < currentWord.length) {
        timer = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), 90);
      } else {
        timer = setTimeout(() => setPhase('pause'), 3000);
      }
    } else if (phase === 'pause') {
      timer = setTimeout(() => setPhase('deleting'), 200);
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), 50);
      } else {
        const next = (wordIdx + 1) % words.length;
        timer = setTimeout(() => {
          setWordIdx(next);
          setPhase('typing');
        }, 50);
      }
    }

    return () => clearTimeout(timer);
  }, [text, phase, wordIdx, words]);

  return (
    <span className="relative block whitespace-normal md:whitespace-nowrap">
      {/* Phantom spacer — reserves width of the longest phrase */}
      <span className="invisible select-none" aria-hidden="true">
        {LONGEST_WORD}
      </span>
      <span className="absolute left-0 top-0">
        {text}
        <span
          aria-hidden="true"
          className="ml-1 inline-block bg-primary-500 align-[-0.08em]"
          style={{
            width: '3px',
            height: '0.85em',
            animation: 'caret-blink 1s step-end infinite',
          }}
        />
      </span>
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────
   Single ledger row
   ────────────────────────────────────────────────────────────── */

function LedgerRow({ call, phase }: { call: Call; phase: Phase }): JSX.Element {
  const isRecovery = phase === 2;
  const isWhatsapp = phase === 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
      className="flex items-center rounded-2xl px-4 py-3 transition-colors duration-150 hover:bg-canvas"
    >
      <span className="w-11 shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">
        {call.time}
      </span>

      <div className="min-w-0 flex-1 px-3">
        <p className="truncate font-sans text-[12px] font-semibold text-obsidian">
          {call.name}
        </p>
        <p className="mt-0.5 truncate font-mono text-[9px] text-muted-foreground">
          {call.procedure}
        </p>
      </div>

      {isRecovery && call.secs ? (
        <span
          className="mr-3 shrink-0 border border-primary-500/30 bg-transparent px-1.5 py-[1px] font-mono text-[9px] font-semibold uppercase tracking-widest text-primary-500"
        >
          {call.secs}S
        </span>
      ) : null}

      {isWhatsapp ? (
        <span className="shrink-0 rounded border border-success-600/20 bg-success-600/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-success-600">
          ✓ {call.action}
        </span>
      ) : (
        <span
          className="shrink-0 font-mono text-[12px] font-bold tabular-nums"
          style={{ color: isRecovery ? '#3D5AFE' : '#DC2626' }}
        >
          {isRecovery ? '+' : '−'}₹{call.value.toLocaleString('en-IN')}
        </span>
      )}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Live Dashboard — cycles through Bleed → Activation → Recover → WhatsApp
   ────────────────────────────────────────────────────────────── */

function LiveDashboard(): JSX.Element {
  const [phase, setPhase] = useState<Phase>(1);
  const [activating, setActivating] = useState(false);
  const [visibleCalls, setVisibleCalls] = useState<Call[]>([]);
  const [total, setTotal] = useState(0);
  const [incoming, setIncoming] = useState<Call | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clear = (): void => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };

    function runPhase(calls: readonly Call[], nextFn: () => void): void {
      let i = 0;
      const step = (): void => {
        if (i >= calls.length) {
          timerRef.current = setTimeout(nextFn, 800);
          return;
        }
        const call = calls[i]!;
        setIncoming(call);
        timerRef.current = setTimeout(() => {
          setIncoming(null);
          setVisibleCalls((prev) => [call, ...prev]);
          setTotal((prev) => prev + (call.value || 0));
          i += 1;
          timerRef.current = setTimeout(step, 1000);
        }, 1500);
      };
      timerRef.current = setTimeout(step, 700);
    }

    function startPhase1(): void {
      setPhase(1);
      setVisibleCalls([]);
      setTotal(0);
      setIncoming(null);
      runPhase(BLEED_CALLS, () => {
        setActivating(true);
        timerRef.current = setTimeout(() => {
          setActivating(false);
          setVisibleCalls([]);
          setTotal(0);
          setIncoming(null);
          startPhase2();
        }, 1500);
      });
    }

    function startPhase2(): void {
      setPhase(2);
      runPhase(RECOVERY_CALLS, () => {
        timerRef.current = setTimeout(() => {
          setVisibleCalls([]);
          setIncoming(null);
          startPhase3();
        }, 1200);
      });
    }

    function startPhase3(): void {
      setPhase(3);
      runPhase(WHATSAPP_EVENTS, () => {
        timerRef.current = setTimeout(startPhase1, 3000);
      });
    }

    startPhase1();
    return clear;
  }, []);

  const isRecovery = phase === 2;
  const isWhatsapp = phase === 3;
  const accentColor = isWhatsapp ? '#059669' : isRecovery ? '#3D5AFE' : '#DC2626';

  /* ── Activation screen (between phase 1 → 2) ── */
  if (activating) {
    return (
      <div
        className="flex w-full items-center justify-center overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: '2px solid #0F0D0B',
          boxShadow: '12px 12px 0px 0px #3D5AFE',
          minHeight: '22.5rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-5 px-10 text-center"
        >
          <div className="relative">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: 'rgba(61,90,254,0.07)' }}
            >
              <Zap
                size={24}
                strokeWidth={1.75}
                color="#3D5AFE"
                aria-hidden="true"
              />
            </div>
            <div
              className="absolute inset-0 animate-ping rounded-full opacity-20"
              style={{ background: '#3D5AFE' }}
            />
          </div>
          <div>
            <p
              className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{ color: '#3D5AFE' }}
            >
              Engageo Activating
            </p>
            <p className="font-sans text-sm font-semibold text-obsidian">
              Taking control of your calls
            </p>
            <p className="mt-1.5 font-mono text-[9px] text-muted-foreground">
              Every future call answered in &lt; 8 seconds
            </p>
          </div>
          <div
            className="mt-1 h-[2px] w-40 overflow-hidden rounded-full"
            style={{ background: '#F2F0EB' }}
          >
            <motion.div
              style={{ background: '#3D5AFE', height: '100%' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`phase-${phase}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="flex h-full w-full flex-col rounded-xl"
        style={{
          background: '#FFFFFF',
          overflow: 'hidden',
          border: '2px solid #0F0D0B',
          boxShadow: isWhatsapp
            ? '12px 12px 0px 0px #059669'
            : isRecovery
              ? '12px 12px 0px 0px #3D5AFE'
              : '12px 12px 0px 0px #DC2626',
          transition: 'box-shadow 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
          minHeight: '22.5rem',
        }}
      >
        {/* Top colour tag */}
        <div
          style={{
            height: 3,
            background: accentColor,
            opacity: 0.9,
            borderRadius: '28px 28px 0 0',
          }}
        />

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 pb-3.5 pt-4"
          style={{
            background: isWhatsapp
              ? 'rgba(5,150,105,0.03)'
              : isRecovery
                ? 'rgba(61,90,254,0.03)'
                : 'rgba(220,38,38,0.025)',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: accentColor }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: accentColor }}
              />
            </span>
            <span
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: accentColor }}
            >
              {isWhatsapp
                ? 'Booking Confirmed'
                : isRecovery
                  ? 'Engageo Active'
                  : 'Without Engageo'}
            </span>
          </div>
          <span
            className="border px-2 py-[2px] font-mono text-[9px] font-bold uppercase tracking-[0.15em]"
            style={{
              color: accentColor,
              borderColor: isWhatsapp
                ? 'rgba(5,150,105,0.3)'
                : isRecovery
                  ? 'rgba(61,90,254,0.3)'
                  : 'rgba(220,38,38,0.3)',
              background: 'transparent',
            }}
          >
            {isWhatsapp ? 'ACTIVE' : isRecovery ? 'LIVE' : 'TODAY'}
          </span>
        </div>

        {/* Incoming flash */}
        <div
          className="mx-4 overflow-hidden transition-all duration-300"
          style={{
            maxHeight: incoming ? 56 : 0,
            opacity: incoming ? 1 : 0,
            marginTop: incoming ? 10 : 0,
          }}
        >
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-2.5"
            style={{
              background: isWhatsapp
                ? 'rgba(5,150,105,0.06)'
                : isRecovery
                  ? 'rgba(61,90,254,0.06)'
                  : 'rgba(220,38,38,0.05)',
            }}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: accentColor }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: accentColor }}
              />
            </span>
            <span className="flex-1 truncate font-sans text-[11px] font-medium text-obsidian">
              {isWhatsapp
                ? 'Confirming'
                : isRecovery
                  ? 'Intercepting'
                  : 'Incoming'}
              : <strong>{incoming?.name}</strong> · {incoming?.procedure}
            </span>
            {!isWhatsapp ? (
              <span
                className="shrink-0 font-mono text-[11px] font-bold"
                style={{ color: accentColor }}
              >
                ₹{incoming?.value?.toLocaleString('en-IN')}
              </span>
            ) : null}
          </div>
        </div>

        {/* Column headers */}
        <div className="flex items-center px-4 pb-2 pt-5">
          <span className="w-11 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
            Time
          </span>
          <span className="flex-1 px-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
            Patient
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
            {isWhatsapp ? 'Status' : 'Amount'}
          </span>
        </div>

        <div className="mx-4" style={{ height: 1, background: '#F2F0EB' }} />

        {/* Call rows */}
        <div className="px-2 pb-2 pt-1" style={{ minHeight: '8.125rem' }}>
          {visibleCalls.length === 0 && !incoming ? (
            <div className="flex h-28 items-center justify-center">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                {isWhatsapp
                  ? 'Sending confirmations\u2026'
                  : isRecovery
                    ? 'Ready to intercept\u2026'
                    : 'Monitoring calls\u2026'}
              </p>
            </div>
          ) : null}
          {[...visibleCalls].reverse().map((call) => (
            <LedgerRow key={call.id} call={call} phase={phase} />
          ))}
        </div>

        {/* Footer total */}
        <div
          className="mx-4 mb-4 mt-auto flex items-center justify-between rounded-2xl px-5 py-4"
          style={{ background: '#F7F5F2' }}
        >
          <div>
            <p className="mb-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              {isRecovery || isWhatsapp ? 'Revenue Secured' : 'Revenue Lost'}
            </p>
            <p
              className="font-mono text-[9px]"
              style={{
                color:
                  isRecovery || isWhatsapp
                    ? 'rgba(61,90,254,0.65)'
                    : 'rgba(220,38,38,0.45)',
              }}
            >
              {isRecovery || isWhatsapp
                ? 'Recovered by Engageo.'
                : "And it's not even noon yet."}
            </p>
          </div>
          <motion.p
            key={total}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25 }}
            className="font-mono font-bold tabular-nums"
            style={{
              fontSize: '1.375rem',
              color: isRecovery || isWhatsapp ? '#3D5AFE' : '#DC2626',
              letterSpacing: '-0.02em',
            }}
          >
            {isRecovery || isWhatsapp ? '+' : '−'}₹
            {total.toLocaleString('en-IN')}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────
   Metrics
   ────────────────────────────────────────────────────────────── */

type Metric = {
  label: string;
  prefix?: string;
  value: number;
  suffix?: string;
};

const METRICS: readonly Metric[] = [
  { label: 'AVG RECOVERY',       prefix: '\u20B9', value: 24, suffix: 'K' },
  { label: 'RESPONSE TIME',      prefix: '<',      value: 15, suffix: 's' },
  { label: 'BOOKING RATE',                          value: 34, suffix: '%' },
  { label: 'CLINICS LIVE',                          value: 47, suffix: '+' },
] as const;

/* ──────────────────────────────────────────────────────────────
   Headline word-stagger variants — "Your / clinic / is / losing"
   ────────────────────────────────────────────────────────────── */

const headlineContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const headlineWordVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ──────────────────────────────────────────────────────────────
   Hero — orchestrator
   ────────────────────────────────────────────────────────────── */

export function Hero(): JSX.Element {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  /* Scroll-linked parallax — background drifts slower than scroll;
     copy fades + lifts on the way out for a cinematic exit. */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgShape1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const bgShape2Y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.4, 0]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[85vh] flex-col items-center justify-between gap-12 overflow-hidden px-5 pb-16 pt-24 md:gap-16 md:px-12 md:pb-20 md:pt-32 lg:flex-row lg:px-20 lg:min-h-[92vh]"
    >
      {/* Floating background shapes — scroll-linked parallax + idle drift */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-6rem] top-24 h-64 w-64 rounded-full bg-primary-500/[0.06] blur-3xl"
        style={shouldReduceMotion ? undefined : { y: bgShape1Y }}
        animate={
          shouldReduceMotion ? undefined : { x: [0, 12, 0] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-4rem] top-[60%] h-72 w-72 rounded-full bg-accent-400/[0.05] blur-3xl"
        style={shouldReduceMotion ? undefined : { y: bgShape2Y }}
        animate={
          shouldReduceMotion ? undefined : { x: [0, -14, 0] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Copy — fades + lifts as you scroll past hero */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-2xl space-y-8 md:space-y-10 lg:mx-0"
        style={shouldReduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className="space-y-8">
          <motion.div
            className="section-label mb-6 text-xs md:text-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            ● Missed Call Recovery — Live in 47 Indian Clinics
          </motion.div>

          <h1 className="text-left tracking-tighter">
            <motion.div
              className="mb-2 w-full font-sans text-[2.5rem] font-bold leading-[1.05] text-obsidian md:text-6xl lg:text-[5rem]"
              variants={headlineContainerVariants}
              initial="hidden"
              animate="visible"
              aria-label="Your clinic is losing"
            >
              <motion.span variants={headlineWordVariants} className="inline-block" aria-hidden="true">
                Your
              </motion.span>{' '}
              <motion.span variants={headlineWordVariants} className="inline-block" aria-hidden="true">
                clinic
              </motion.span>{' '}
              <motion.span variants={headlineWordVariants} className="inline-block" aria-hidden="true">
                is
              </motion.span>
              <br className="hidden md:block" />{' '}
              <motion.span
                variants={headlineWordVariants}
                className="-ml-[0.05em] inline-block tracking-tight"
                aria-hidden="true"
              >
                losing
              </motion.span>
            </motion.div>
            <motion.span
              className="block break-words whitespace-normal font-sans font-bold tracking-tight text-primary-500 md:whitespace-nowrap"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.75rem)',
                lineHeight: 1.1,
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <TypewriterText words={HERO_WORDS} />
            </motion.span>
          </h1>

          <motion.p
            className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-subtle md:max-w-md md:text-base"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            Built for Indian clinics and hospitals. When your front desk
            can&rsquo;t pick up, the call forwards automatically — our AI
            voice + WhatsApp recovery system greets the patient in their
            own language, answers their questions, and books the
            appointment before they think to call a rival. You don&rsquo;t
            even know a call was missed.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={CTA.audit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-center gap-2 border-2 border-obsidian bg-primary-500 px-5 py-3.5 text-[13px] font-bold tracking-wide text-surface transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] active:scale-[0.98] md:px-8 md:py-4 md:text-[13px]"
            style={{ boxShadow: '4px 4px 0px 0px #0F0D0B' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0px 0px 0px 0px #0F0D0B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '4px 4px 0px 0px #0F0D0B';
            }}
          >
            <span className="whitespace-nowrap">
              See What You&rsquo;re Losing — Free Audit
            </span>
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <a
            href="#roi-calculator"
            className="flex flex-1 items-center justify-center whitespace-nowrap border-2 border-obsidian bg-surface px-5 py-3.5 text-[13px] font-bold tracking-wide text-obsidian transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] md:px-7 md:py-4 md:text-[13px]"
            style={{ boxShadow: '4px 4px 0px 0px #0F0D0B' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0px 0px 0px 0px #0F0D0B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '4px 4px 0px 0px #0F0D0B';
            }}
          >
            Calculate Your Loss →
          </a>
        </motion.div>

        {/* Metric pills — animated counters */}
        <motion.div
          className="grid grid-cols-2 gap-3 pt-1 md:flex md:flex-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="flex items-center justify-center gap-3 border-2 border-obsidian/15 bg-surface px-4 py-2 md:flex-auto md:px-5 md:py-2.5"
              style={{ boxShadow: '3px 3px 0px 0px rgba(15,13,11,0.08)' }}
            >
              <span className="whitespace-nowrap font-sans text-sm font-bold tracking-tight text-obsidian md:text-base">
                <AnimatedCounter
                  value={m.value}
                  duration={1.4}
                  delay={1.2 + i * 0.08}
                  prefix={m.prefix}
                  suffix={m.suffix}
                />
              </span>
              <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-muted-foreground md:text-[10px]">
                {m.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Live Dashboard */}
      <motion.div
        className="relative w-full max-w-lg lg:max-w-xl lg:scale-[1.15] lg:origin-center"
        initial={{ opacity: 0, scale: 0.94, y: 20, rotateY: -8, rotateX: 3 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateY: -3, rotateX: 1 }}
        whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-to-tr from-primary-500/[0.06] via-transparent to-accent-400/[0.04] blur-3xl"
        />
        <div className="relative">
          <LiveDashboard />
        </div>
      </motion.div>
    </section>
  );
}
