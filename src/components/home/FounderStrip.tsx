import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { FOUNDERS } from '@/lib/founders';

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
          Two founders who watched Indian clinics lose crores to
          unanswered phones — and decided to fix it.
        </p>
      </div>

      <ul className="mx-auto mt-14 grid max-w-2xl gap-5 md:mt-18 md:grid-cols-2 lg:gap-6">
        {FOUNDERS.map((founder) => (
          <li
            key={founder.slug}
            className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-surface p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover"
          >
            {/* Avatar */}
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-neutral-100 shadow-subtle">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={founder.photo}
                alt={founder.photoAlt}
                width={56}
                height={56}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="min-w-0">
              <h3 className="font-display text-base font-semibold leading-tight tracking-tight text-obsidian">
                <Link
                  href={`/about/${founder.slug}`}
                  className="transition-colors hover:text-primary-600"
                >
                  {founder.name}
                </Link>
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
