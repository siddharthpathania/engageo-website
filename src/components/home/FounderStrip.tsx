import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

type Founder = {
  name: string;
  role: string;
  oneLiner: string;
  initials: string;
  accent: string;
  photo?: string;
};

const FOUNDERS: readonly Founder[] = [
  {
    name: 'Siddharth Pathania',
    role: 'CEO',
    oneLiner: 'Product architect. Designed the recovery system from first principles.',
    initials: 'SP',
    accent: 'from-primary-400 to-primary-600',
    photo: '/team/siddharth.jpg',
  },
  {
    name: 'Atul Hooda',
    role: 'CTO',
    oneLiner: 'ML engineer. Built the intelligence behind every recovered call.',
    initials: 'AH',
    accent: 'from-accent-400 to-accent-600',
    photo: '/team/atul.jpg',
  },
  {
    name: 'Tanmay Mehta',
    role: 'COO',
    oneLiner: 'Operations lead. Published researcher on hybrid AI-automation in healthcare.',
    initials: 'TM',
    accent: 'from-premium-400 to-premium-600',
    photo: '/team/tanmay.jpg',
  },
];

export function FounderStrip(): JSX.Element {
  return (
    <SectionWrapper id="founders" ariaLabel="The founding team" className="bg-sand/40">
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-label justify-center">The founders</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
          Built by operators,{' '}
          <span className="serif-hero">not outsiders.</span>
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-subtle md:text-base">
          Three founders who watched Indian clinics lose crores to
          unanswered phones — and decided to fix it.
        </p>
      </div>

      <ul className="mt-14 grid gap-5 md:mt-18 md:grid-cols-3 lg:gap-6">
        {FOUNDERS.map((founder) => (
          <li
            key={founder.name}
            className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-surface p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover"
          >
            {/* Avatar */}
            {founder.photo ? (
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-neutral-100 shadow-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={founder.photo}
                  alt={founder.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <span
                aria-hidden="true"
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${founder.accent} font-display text-lg font-semibold text-surface shadow-subtle`}
              >
                {founder.initials}
              </span>
            )}

            <div className="min-w-0">
              <h3 className="font-display text-base font-semibold leading-tight tracking-tight text-obsidian">
                {founder.name}
              </h3>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                {founder.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-subtle">
                {founder.oneLiner}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <Link
          href="/about"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-obsidian transition-colors hover:text-primary-600"
        >
          Read our full story
          <ChevronRight
            size={14}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </SectionWrapper>
  );
}
